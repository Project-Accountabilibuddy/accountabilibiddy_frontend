import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";

type FormInputProps = {
  title: string;
  description?: string;
  responseText: string;
  setResponseText: (responseText: string) => void;
  continueAction: () => void;
};

const StyledFormInput = styled.div`
  display: flex;
  flex-direction: column;

  .heading-1 {
    color: ${({ theme }) => theme.colors.primary};
  }

  .heading-2 {
    color: ${({ theme }) => theme.colors.lightGrey};
  }

  button {
    margin-top: 120px;
  }

  textarea {
    height: 50px;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.background};
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    resize: none;
  }
`;

const FormInput = ({
  title,
  description,
  responseText,
  setResponseText,
  continueAction,
}: FormInputProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref?.current) {
      ref?.current?.focus();
    }
  }, []);

  return (
    <StyledFormInput>
      <h1 className="heading-1">{title}</h1>
      {description && <h3 className="heading-2">{description}</h3>}
      <textarea
        ref={ref}
        name="text"
        rows={14}
        cols={10}
        wrap="soft"
        value={responseText}
        onChange={(e) => setResponseText(e.target.value)}
      />
      <Button variant="outlined" onClick={continueAction}>
        Continue Journey
      </Button>
    </StyledFormInput>
  );
};

export default FormInput;

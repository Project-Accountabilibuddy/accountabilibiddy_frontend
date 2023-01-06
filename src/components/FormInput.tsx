import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";

type FormInputProps = {
  title: string;
  description?: string;
  responseText: string;
  responseGroup?: string[];
  setResponseText?: (responseText: string) => void;
  continueAction: () => void;
};

const StyledFormInput = styled.div`
  display: flex;
  flex-direction: column;

  .heading-1,
  .heading-2 {
    margin-bottom: 24px;
  }

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
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.background};
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    resize: none;
    margin-bottom: 24px;
    padding: 8px;
    border-radius: 4px;
  }

  .single_row_textarea {
    background-color: ${({ theme }) => theme.colors.lightGrey};
  }
`;

const FormInput = ({
  title,
  description,
  responseText,
  setResponseText,
  continueAction,
  responseGroup,
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
        onChange={
          setResponseText ? (e) => setResponseText(e.target.value) : () => {}
        }
        disabled={Boolean(responseGroup)}
      />
      {responseGroup?.map((response, index) => {
        return (
          <textarea
            className="single_row_textarea"
            ref={ref}
            name="text"
            rows={1}
            // value={response}
            // onChange={() => {}}
          />
        );
      })}
      <Button
        disabled={responseText.length === 0}
        variant="outlined"
        onClick={continueAction}
      >
        Continue Journey
      </Button>
    </StyledFormInput>
  );
};

export default FormInput;

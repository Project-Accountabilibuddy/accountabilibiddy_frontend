import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";

type FormInputProps = {
  title: string;
  description?: string;
  responseText: string;
  responseGroup?: string[];
  setResponseText?: (responseText: string) => void;
  setShortResponseText?: (responseText: string, index: number) => void;
  continueAction: () => void;
  updateShortFormnumberOfResponses?: (ASDF: "ADD" | "REMOVE") => void;
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
    resize: none;
    margin-bottom: 24px;
    padding: 8px;
    border-radius: 4px;
  }

  .respones_group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .single_row_textarea {
      background-color: ${({ theme }) => theme.colors.lightGrey};
      height: auto;
    }

    .response_group_buttons {
      display: flex;
      justify-content: space-between;
    }
  }
`;

const FormInput = ({
  title,
  description,
  responseText,
  setResponseText = () => {},
  setShortResponseText = () => {},
  continueAction,
  updateShortFormnumberOfResponses = () => {},
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
        onChange={(e) => setResponseText(e.target.value)}
        disabled={Boolean(responseGroup)}
      />
      {responseGroup && (
        <div className="respones_group">
          {responseGroup?.map((response, index) => {
            return (
              <textarea
                key={index}
                className="single_row_textarea"
                ref={ref}
                name="text"
                rows={1}
                value={response}
                onChange={(e) => setShortResponseText(e.target.value, index)}
              />
            );
          })}
          <div className="response_group_buttons">
            <Button
              disabled={responseGroup.length < 2}
              variant="outlined"
              onClick={() => updateShortFormnumberOfResponses("REMOVE")}
            >
              Remove Reason
            </Button>
            <Button
              disabled={responseGroup.length > 4}
              variant="outlined"
              onClick={() => updateShortFormnumberOfResponses("ADD")}
            >
              Add Reason
            </Button>
          </div>
        </div>
      )}
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

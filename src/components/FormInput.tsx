import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const StyledFormInput = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  padding: 0 200px;
  height: 100%;

  .heading-1 {
    color: ${({ theme }) => theme.colors.primary};
  }

  .heading-2 {
    color: ${({ theme }) => theme.colors.lightGrey};
  }

  .body-1 {
    color: ${({ theme }) => theme.colors.lightGrey};
  }
`;

const FormInput = ({ title, description, responseText, setResponseText }) => {
  const navigate = useNavigate();

  return (
    <StyledFormInput>
      <h1 className="heading-1">{title}</h1>
      <h3 className="heading-2">{description}</h3>
      <h3 className="body-1">
        Just because it will take time does not mean you have to do it all in a
        single setting I recommend taking breaks in between questions to keep
        your brain from melting
      </h3>
      <Button variant="outlined" onClick={() => navigate("/landing")}>
        Continue Journey
      </Button>
    </StyledFormInput>
  );
};

export default FormInput;

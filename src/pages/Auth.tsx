import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Auth } from "aws-amplify";
import { Route, Routes, useNavigate } from "react-router-dom";

const StyledAuthentication = styled.div`
  display: flex;
  flex-direction: column;

  .text_field {
    padding-top: 12px;
    input {
      color: white;
    }
  }
`;

const Authentication = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const [code, setCode] = useState("");

  const navigate = useNavigate();

  const handleSignUpUser = async () => {
    try {
      const { user } = await Auth.signUp({
        username: userEmail,
        password,
        attributes: { email: userEmail },
        autoSignIn: { enabled: true },
      });
      console.log(user);
      navigate("/");
    } catch (error) {
      console.log("error signing up:", error);
    }
  };

  const handleConfirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(userEmail, code);
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  };

  return (
    <StyledAuthentication>
      <h1>AWS Auth</h1>
      <h6>S3 ~ Lambda ~ API Gateway ~ DynamoDB ~ Cloud Watch ~ Cloud Front</h6>
      <TextField
        className="text_field"
        variant="outlined"
        label="Email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <TextField
        className="text_field"
        variant="outlined"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleSignUpUser}>Sign Up</Button>

      <TextField
        className="text_field"
        variant="outlined"
        label="Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <Button onClick={handleConfirmSignUp}>Verify Code</Button>
    </StyledAuthentication>
  );
};

export default Authentication;

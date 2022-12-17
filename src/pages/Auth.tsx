import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Auth } from "aws-amplify";

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

  const [userEmailConfirmSignUp, setUserEmailConfirmSignUp] = useState("");
  const [code, setCode] = useState("");

  const [userEmailSignIn, setUserEmailSignIn] = useState("");
  const [passwordSignIn, setPasswordSignIn] = useState("");

  const handleSignUpUser = async () => {
    try {
      const { user } = await Auth.signUp({
        username: userEmail,
        password,
        attributes: { email: userEmail },
        autoSignIn: { enabled: true },
      });
      console.log(user);
    } catch (error) {
      console.log("error signing up:", error);
    }
  };

  const handleConfirmSignUpUser = async () => {
    try {
      await Auth.confirmSignUp(userEmailConfirmSignUp, code);
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  };

  const handleSignInUser = async () => {
    try {
      await Auth.signIn(userEmailSignIn, passwordSignIn);
    } catch (error) {
      console.log("error signing in", error);
    }
  };

  return (
    <StyledAuthentication>
      <h1>AWS Auth</h1>
      <h6>S3 ~ Lambda ~ API Gateway ~ DynamoDB ~ Cloud Watch ~ Cloud Front</h6>
      <h2>Sign Up</h2>
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
      <h2>Confirm Sign Up</h2>
      <TextField
        className="text_field"
        variant="outlined"
        label="Email"
        value={userEmailConfirmSignUp}
        onChange={(e) => setUserEmailConfirmSignUp(e.target.value)}
      />
      <TextField
        className="text_field"
        variant="outlined"
        label="Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <Button onClick={handleConfirmSignUpUser}>Verify Code</Button>
      <h2>Sign In</h2>
      <TextField
        className="text_field"
        variant="outlined"
        label="Email"
        value={userEmailSignIn}
        onChange={(e) => setUserEmailSignIn(e.target.value)}
      />
      <TextField
        className="text_field"
        variant="outlined"
        label="Password"
        value={passwordSignIn}
        onChange={(e) => setPasswordSignIn(e.target.value)}
      />
      <Button onClick={handleSignInUser}>Sign In</Button>
    </StyledAuthentication>
  );
};

export default Authentication;

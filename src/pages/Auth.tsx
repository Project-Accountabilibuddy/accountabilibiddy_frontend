import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const StyledAuth = styled.div``;

const Auth = () => {
  return (
    <StyledAuth>
      <h1>AWS Auth</h1>
      <h6>S3 ~ Lambda ~ API Gateway ~ DynamoDB ~ Cloud Watch ~ Cloud Front</h6>
    </StyledAuth>
  );
};

export default Auth;

import React, { useState } from "react";
import logo from "./logo.svg";
import Button from "@mui/material/Button";
import axios from "axios";

import "./App.css";

const App = () => {
  const [everything, setEverything] = useState("");

  const handleGetEverything = () => {
    axios
      .get("https://euzdgtnwai.execute-api.us-east-1.amazonaws.com/items")
      .then((res) => {
        console.log(res?.data?.Items);
        setEverything(JSON.stringify(res?.data?.Items));
      })
      .catch((err) => console.log({ err }));
  };

  // TODO: BUILD OUT SHORT AND SWEET CRUD APP HERE
  // API GATEWAY ~ LAMBDA ~ DYNAMODB
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button onClick={handleGetEverything} variant="contained">
          GET everyting!
        </Button>
        <h4>{everything}</h4>
      </header>
    </div>
  );
};

export default App;

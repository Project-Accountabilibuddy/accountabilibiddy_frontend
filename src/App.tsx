import React, { useState } from "react";
import logo from "./logo.svg";
import Button from "@mui/material/Button";
import axios from "axios";

import "./App.css";

const App = () => {
  const [everything, setEverything] = useState("");

  const handleGetEverything = () => {
    axios
      .get("https://euzdgtnwai.execute-api.us-east-1.amazonaws.com/items", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      })
      .then((res) => {
        console.log({ res });
        setEverything(JSON.stringify(res));
      })
      .catch((err) => console.log({ err }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button onClick={handleGetEverything} variant="contained">
          GET everyting!
        </Button>
        <h1>{everything}</h1>
      </header>
    </div>
  );
};

export default App;

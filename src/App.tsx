import React, { useEffect } from "react";

import { Route, Routes } from "react-router-dom";
import { Auth } from "aws-amplify";

import CrudPage from "./pages/Crud";
import AuthPage from "./pages/Auth";
import "./App.css";

const App = () => {
  Auth.currentAuthenticatedUser({
    bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  })
    .then((user) => console.log(user))
    .catch((err) => console.log(err));

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<CrudPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </header>
    </div>
  );
};

export default App;

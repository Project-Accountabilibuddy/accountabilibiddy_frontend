import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Auth, Hub } from "aws-amplify";
import CircularProgress from "@mui/material/CircularProgress";
import isEmpty from "lodash/isEmpty";

import CrudPage from "./pages/Crud";
import AuthPage from "./pages/Auth";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  Hub.listen("auth", (data) => {
    console.log("auth payload: ", data.payload.event);
    switch (data.payload.event) {
      case "signIn":
        console.log("user signed in");
        navigate("/");
        break;
      case "signUp":
        console.log("user signed up");
        break;
      case "signOut":
        console.log("user signed out");
        navigate("/auth");
        break;
      case "signIn_failure":
        console.log("user sign in failed");
        break;
      case "configured":
        console.log("the Auth module is configured");
    }
  });

  useEffect(() => {
    setLoading(true);
    Auth.currentAuthenticatedUser({ bypassCache: true })
      .then((user) => {
        setUser(user);
      })
      .catch((err) => {
        console.log({ err });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      navigate("/auth");
    }
  }, [navigate, user]);

  return (
    <div className="App">
      <header className="App-header">
        {loading && <CircularProgress />}
        {!loading && (
          <Routes>
            <Route path="/" element={<CrudPage />} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        )}
      </header>
    </div>
  );
};

export default App;

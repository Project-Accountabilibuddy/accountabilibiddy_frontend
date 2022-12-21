import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Auth, Hub } from "aws-amplify";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";

import GlobalTheme from "./global/GlobalTheme";

import CrudPage from "./pages/Crud";
import AuthPage from "./pages/Auth";

const StyledApp = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryLight};
  width: 100vw;
  height: 100vh;
  padding: 48px;
`;

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
      case "confirmSignUp":
        console.log("user confirmed account");
        navigate("/");
        break;
      case "signOut":
        console.log("user signed out");
        navigate("/auth");
        break;
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
      <GlobalTheme>
        <StyledApp>
          {loading && <CircularProgress />}
          {!loading && (
            <Routes>
              <Route path="/" element={<CrudPage />} />
              <Route path="/auth" element={<AuthPage />} />
            </Routes>
          )}
        </StyledApp>
      </GlobalTheme>
    </div>
  );
};

export default App;

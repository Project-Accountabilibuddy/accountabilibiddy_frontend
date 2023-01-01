import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Auth, Hub } from "aws-amplify";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";

import GlobalTheme from "./global/GlobalTheme";
import GlobalTypography from "./global/GlobalTypography";

import LandingPage from "./pages/Landing";
import ProjectSetUpPage from "./pages/ProjectSetup";
import ProjectPage from "./pages/Project";
import AuthPage from "./pages/Auth";

const StyledApp = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  height: 100vh;
  width: 100vw;
`;

const StyledGlobalLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const App = () => {
  const [user, setUser] = useState("SHIT");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  Hub.listen("auth", (data) => {
    // console.log("auth payload: ", data.payload.event);
    // switch (data.payload.event) {
    //   case "signIn":
    //     navigate("/my-project");
    //     break;
    //   case "confirmSignUp":
    //     navigate("/project-setup");
    //     break;
    //   case "signOut":
    //     navigate("/");
    //     break;
    // }
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

  console.log("user: ", user);

  useEffect(() => {
    if (user !== "SHIT") {
      navigate("/my-project");
    } else {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <GlobalTheme>
      <GlobalTypography>
        <StyledApp>
          {loading && (
            <StyledGlobalLoading>
              <CircularProgress />
            </StyledGlobalLoading>
          )}
          {!loading && (
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/my-project" element={<ProjectPage />} />
              <Route path="/project-setup" element={<ProjectSetUpPage />} />
              <Route path="/auth/*" element={<AuthPage />} />
            </Routes>
          )}
        </StyledApp>
      </GlobalTypography>
    </GlobalTheme>
  );
};

export default App;

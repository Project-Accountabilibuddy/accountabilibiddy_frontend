import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
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
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const main = async () => {
      try {
        console.log("User is signed in");

        await Auth.currentAuthenticatedUser();

        // DIRECT USER INTO AUTHED ROUTES IF SIGNED IN
        if (pathname === "/" || pathname === "/auth") {
          navigate("/my-project");
        }
      } catch {
        console.log("User is not signed in");

        // KICK USER OUT OF AUTHED ROUTES IF NOT SIGNED IN
        if (pathname === "/my-project" || pathname === "/project-setup") {
          navigate("/");
        }
      }
    };

    main();
  }, [navigate, pathname]);

  useEffect(() => {
    setLoading(true);
    Auth.currentAuthenticatedUser({ bypassCache: true })
      .then((user) => {
        setUser(user);
      })
      .catch((err) => {
        // console.log({ err });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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

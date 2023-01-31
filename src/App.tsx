import React, { useEffect } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import CircularProgress from '@mui/material/CircularProgress'
import styled from 'styled-components'

import GlobalTheme from './global/GlobalTheme'
import GlobalTypography from './global/GlobalTypography'
import useBackEndMethods from './hooks/useBackEndMethods'
import useGlobalState from './global/GlobalSate'
import { ROUTES } from './global/Constants'
import BackGroundImage from './test_background.jpeg'
import LogoBig from './icons/LogoBig'

import LandingPage from './pages/Landing'
import AuthPage from './pages/Auth'
import ProjectSetUpPage from './pages/ProjectSetup'
import ProjectPage from './pages/Project'

const StyledApp = styled.div`
  background-image: url(${BackGroundImage});
  background-size: auto 100%;
  animation: animatedBackground 300s linear infinite;

  @keyframes animatedBackground {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 100% 0;
    }
  }

  :before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
  }

  .content {
    color: var(--color-white);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;

    .logo {
      width: 100%;
      position: absolute;
      top: 80px;
    }
  }
`

const StyledGlobalLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const App = (): JSX.Element => {
  const { handleGetProjects } = useBackEndMethods()
  const { globalLoading, setGlobalLoading, setUserName } = useGlobalState()

  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(() => {
        // DIRECT USER INTO AUTHED ROUTES IF SIGNED IN
        if (pathname === '/' || pathname === ROUTES.AUTH) {
          navigate(ROUTES.PROJECT)
        }
      })
      .catch(() => {
        // KICK USER OUT OF AUTHED ROUTES IF NOT SIGNED IN
        if (pathname === ROUTES.PROJECT) {
          navigate('/')
        }
      })
  }, [navigate, pathname])

  // CHECKS IF USER IS SIGNED IN AND SETS USER STATE
  useEffect(() => {
    setGlobalLoading(true)
    Auth.currentAuthenticatedUser({ bypassCache: true })
      .then((res) => {
        setUserName(res.attributes.email)
        handleGetProjects(() => {
          setGlobalLoading(false)
        })
      })
      .catch((err) => {
        console.log({ err })
        setGlobalLoading(false)
      })
  }, [])

  const onProjectPage = pathname === ROUTES.PROJECT

  return (
    <GlobalTheme>
      <GlobalTypography>
        <StyledApp>
          <div className="content">
            {!onProjectPage && <LogoBig className="logo" />}
            {globalLoading && (
              <StyledGlobalLoading>
                <CircularProgress />
              </StyledGlobalLoading>
            )}
            {!globalLoading && (
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route
                  path={`${ROUTES.PROJECT_SETUP}/*`}
                  element={<ProjectSetUpPage />}
                />
                <Route path={`${ROUTES.AUTH}/*`} element={<AuthPage />} />
                <Route path={`${ROUTES.PROJECT}`} element={<ProjectPage />} />
              </Routes>
            )}
          </div>
        </StyledApp>
      </GlobalTypography>
    </GlobalTheme>
  )
}

export default App

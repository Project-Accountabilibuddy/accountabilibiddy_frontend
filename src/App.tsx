import React, { useEffect } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import CircularProgress from '@mui/material/CircularProgress'
import styled from 'styled-components'

import GlobalTheme from './global/GlobalTheme'
import GlobalTypography from './global/GlobalTypography'
import useBackEndMethods from './hooks/useBackEndMethods'
import useGlobalState from './global/GlobalSate'
import { ROUTES, SETUP_PROJECT_SCREENS } from './global/Constants'

import LandingPage from './pages/Landing'
import AuthPage from './pages/Auth'
import ProjectSetUpPage from './pages/ProjectSetup'
import ProjectPage from './pages/Project'

const StyledApp = styled.div`
  background-color: var(--color-background);
  height: 100vh;
  width: 100vw;
`

const StyledGlobalLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const App = (): JSX.Element => {
  const { handleGetProjects } = useBackEndMethods()
  const { globalLoading, setGlobalLoading } = useGlobalState()

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
      .then(() => {
        handleGetProjects(
          () => {
            setGlobalLoading(false)
          },
          () => {
            navigate(
              `${ROUTES.PROJECT_SETUP}/${SETUP_PROJECT_SCREENS.PROJECT_NAME}`
            )
          }
        )
      })
      .catch((err) => {
        console.log({ err })
        setGlobalLoading(false)
      })
  }, [])

  return (
    <GlobalTheme>
      <GlobalTypography>
        <StyledApp>
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
        </StyledApp>
      </GlobalTypography>
    </GlobalTheme>
  )
}

export default App

import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import CircularProgress from '@mui/material/CircularProgress'
import styled from 'styled-components'

import GlobalTheme from './global/GlobalTheme'
import GlobalTypography from './global/GlobalTypography'
import useBackEndMethods from './hooks/useBackEndMethods'

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
  const [loading, setLoading] = useState(false)

  const { handleGetProjects } = useBackEndMethods()

  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(() => {
        // DIRECT USER INTO AUTHED ROUTES IF SIGNED IN
        if (pathname === '/' || pathname === '/auth') {
          navigate('/my-project')
        }
      })
      .catch(() => {
        // KICK USER OUT OF AUTHED ROUTES IF NOT SIGNED IN
        if (pathname === '/my-project') {
          navigate('/')
        }
      })
  }, [navigate, pathname])

  // CHECKS IF USER IS SIGNED IN AND SETS USER STATE
  useEffect(() => {
    setLoading(true)
    Auth.currentAuthenticatedUser({ bypassCache: true })
      .then(() => {
        handleGetProjects(() => {
          setLoading(false)
        })
      })
      .catch((err) => {
        console.log({ err })
        setLoading(false)
      })
  }, [])

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
              <Route path="/project-setup/*" element={<ProjectSetUpPage />} />
              <Route path="/auth/*" element={<AuthPage />} />
            </Routes>
          )}
        </StyledApp>
      </GlobalTypography>
    </GlobalTheme>
  )
}

export default App

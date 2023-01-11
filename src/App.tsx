import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import CircularProgress from '@mui/material/CircularProgress'
import styled from 'styled-components'

import GlobalTheme from './global/GlobalTheme'
import GlobalTypography from './global/GlobalTypography'
import useBackEndMethods from './hooks/useBackEndMethods'
import useGlobalState from './global/GlobalSate'

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
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { handleGetProject } = useBackEndMethods()
  const { setUserID } = useGlobalState()

  useEffect(() => {
    const navigateBasedOnUserAuthStatus = async (): Promise<any> => {
      setLoading(true)
      try {
        await Auth.currentAuthenticatedUser()
        console.log('User is signed in')
        // DIRECT USER INTO AUTHED ROUTES IF SIGNED IN
        if (pathname === '/' || pathname === '/auth') {
          navigate('/my-project')
        }
        setLoading(false)
      } catch {
        console.log('User is not signed in')
        // KICK USER OUT OF AUTHED ROUTES IF NOT SIGNED IN
        if (pathname === '/my-project') {
          navigate('/')
        }
        setLoading(false)
      }
    }

    navigateBasedOnUserAuthStatus()
      .then(() => {
        console.log('Navigated based on user auth status')
      })
      .catch((err) => {
        console.log(err)
      })
  }, [navigate, pathname])

  // CHECKS IF USER IS SIGNED IN AND SETS USER STATE
  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true })
      .then((user) => {
        const userSubID = user?.attributes?.sub
        console.log({ userSubID })
        setUserID(userSubID)
        handleGetProject(userSubID)
        setUser(user)
      })
      .catch((err) => {
        console.log({ err })
      })
  }, [pathname])

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
  )
}

export default App

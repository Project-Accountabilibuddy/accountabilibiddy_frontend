import React, { useEffect, lazy, Suspense } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import CircularProgress from '@mui/material/CircularProgress'
import styled from 'styled-components'

import GlobalTheme from './global/GlobalTheme'
import GlobalTypography from './global/GlobalTypography'
import useBackEndMethods from './hooks/useBackEndMethods'
import useGlobalState from './global/GlobalSate'
import { ROUTES } from './global/Constants'

import LogoBig from './icons/LogoBig'
import { MountainforegroundImage, SunBackgroundImage } from './images'

const LandingPage = lazy(async () => await import('./pages/Landing'))
const ProjectSetUpPage = lazy(async () => await import('./pages/ProjectSetup'))
const ProjectPage = lazy(async () => await import('./pages/Project'))
const AuthPage = lazy(async () => await import('./pages/Auth'))
const NotFoundPage = lazy(async () => await import('./pages/NotFound'))

const StyledApp = styled.div`
  background-image: url(${SunBackgroundImage});
  background-size: auto 100%;
  background-position: center;
  background-color: var(--color-background);

  .foreground {
    background-image: url(${MountainforegroundImage});
    background-size: auto 100%;
    animation: animatedBackground 200s linear infinite;

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
        top: 40px;
      }
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
    const autoNavigateUserBasedOnAuth = async (): Promise<any> => {
      try {
        await Auth.currentAuthenticatedUser()
        // DIRECT USER INTO AUTHED ROUTES IF SIGNED IN
        if (pathname === ROUTES.LANDING || pathname === ROUTES.AUTH) {
          navigate(ROUTES.PROJECT)
        }
      } catch (err) {
        // KICK USER OUT OF AUTHED ROUTES IF NOT SIGNED IN
        if (pathname === ROUTES.PROJECT) {
          navigate(ROUTES.LANDING)
        }
      }
    }

    autoNavigateUserBasedOnAuth().finally(() => {
      console.log('autoNavigateUserBasedOnAuth finished')
    })
  }, [navigate, pathname])

  useEffect(() => {
    const getUserAndProjectState = async (): Promise<any> => {
      try {
        setGlobalLoading(true)
        const response = await Auth.currentAuthenticatedUser({
          bypassCache: true
        })
        setUserName(response.attributes.email)
        await handleGetProjects(() => {
          setGlobalLoading(false)
        })
      } catch (err) {
        console.log({ err })
        setGlobalLoading(false)
      }
    }

    getUserAndProjectState().finally(() => {
      console.log('getUserAndProjectState finished')
    })
  }, [])

  const showLogo = pathname === ROUTES.LANDING || pathname === ROUTES.AUTH

  return (
    <GlobalTheme>
      <GlobalTypography>
        <StyledApp>
          <div className="foreground">
            <div className="content">
              {showLogo && <LogoBig className="logo" />}
              {globalLoading && (
                <StyledGlobalLoading>
                  <CircularProgress />
                </StyledGlobalLoading>
              )}
              {!globalLoading && (
                <Suspense>
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route
                      path={`${ROUTES.PROJECT_SETUP}/*`}
                      element={<ProjectSetUpPage />}
                    />
                    <Route path={`${ROUTES.AUTH}/*`} element={<AuthPage />} />
                    <Route
                      path={`${ROUTES.PROJECT}`}
                      element={<ProjectPage />}
                    />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              )}
            </div>
          </div>
        </StyledApp>
      </GlobalTypography>
    </GlobalTheme>
  )
}

export default App

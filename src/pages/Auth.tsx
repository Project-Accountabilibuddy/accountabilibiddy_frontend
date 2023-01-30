import React, { useState } from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Auth } from 'aws-amplify'
import { useNavigate } from 'react-router-dom'

import useBackEndMethods from '../hooks/useBackEndMethods'
import useGlobalState from '../global/GlobalSate'
import { SETUP_PROJECT_SCREENS, ROUTES } from '../global/Constants'

const StyledAuthentication = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;

  padding: 0 20%;
  height: 100vw;
  width: 100vh;

  .heading-1 {
    color: var(--color-primary);
    margin-bottom: 24px;
  }

  .heading-2 {
    color: var(--color-light-grey);
    margin-bottom: 24px;
  }

  .text_field {
    padding-top: 12px;
    input {
      color: white;
    }
  }

  button {
    margin-top: 24px;
  }
`

const Authentication = (): JSX.Element => {
  const [authFormInView, setAuthFormInView] = useState('SIGN_UP')

  const [userEmail, setUserEmail] = useState('')
  const [password, setPassword] = useState('')

  const [code, setCode] = useState('')

  const { handleGetProjects } = useBackEndMethods()
  const { setGlobalLoading } = useGlobalState()

  const navigate = useNavigate()

  const handleSignUpUser = async (): Promise<any> => {
    try {
      await Auth.signUp({
        username: userEmail,
        password,
        attributes: { email: userEmail },
        autoSignIn: { enabled: true }
      }).then(() => {
        setAuthFormInView('CONFIRM_EMAIL')
      })
    } catch (error) {
      console.log('error signing up:', error)
    }
  }

  const handleConfirmSignUpUser = async (): Promise<any> => {
    await Auth.confirmSignUp(userEmail, code)
      .then((res) => {
        console.log('NEW USER RES', res)
        navigate(
          `${ROUTES.PROJECT_SETUP}/${SETUP_PROJECT_SCREENS.PROJECT_NAME}`
        )
      })
      .catch((err) => {
        console.log('error confirming sign up', err)
      })
  }

  const handleSignInUser = async (): Promise<any> => {
    setGlobalLoading(true)
    try {
      await Auth.signIn(userEmail, password).then(() => {
        navigate(ROUTES.PROJECT)

        handleGetProjects(() => {
          setGlobalLoading(false)
        })
      })
    } catch (error) {
      console.log('error signing in', error)
      setGlobalLoading(false)
    }
  }

  return (
    <StyledAuthentication>
      <h1 className="heading-1">Accountabilibuddy</h1>
      {authFormInView === 'SIGN_UP' && (
        <>
          <h3 className="heading-2">
            Let's get you set up before your ass is kicked
          </h3>
          <TextField
            className="text_field"
            variant="outlined"
            label="Email"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value)
            }}
          />
          <TextField
            className="text_field"
            variant="outlined"
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          <Button
            onClick={() => {
              void handleSignUpUser()
            }}
          >
            Sign Up
          </Button>
          <Button
            onClick={() => {
              setAuthFormInView('SIGN_IN')
            }}
          >
            I have an account
          </Button>
        </>
      )}
      {authFormInView === 'CONFIRM_EMAIL' && (
        <>
          <h3 className="heading-2">Confirm Sign Up</h3>
          <TextField
            className="text_field"
            variant="outlined"
            label="Code"
            value={code}
            onChange={(e) => {
              setCode(e.target.value)
            }}
          />
          <Button
            onClick={() => {
              void handleConfirmSignUpUser()
            }}
          >
            Verify Code
          </Button>
        </>
      )}
      {authFormInView === 'SIGN_IN' && (
        <>
          <h3 className="heading-2">Let's get back to work</h3>
          <TextField
            className="text_field"
            variant="outlined"
            label="Email"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value)
            }}
          />
          <TextField
            className="text_field"
            variant="outlined"
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          <Button
            onClick={() => {
              void handleSignInUser()
            }}
          >
            Sign In
          </Button>
          <Button
            onClick={() => {
              setAuthFormInView('SIGN_UP')
            }}
          >
            I don't have an account
          </Button>
        </>
      )}
    </StyledAuthentication>
  )
}

export default Authentication

import React, { useState, useEffect, useReducer } from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField'
import MaterialUIButton from '@mui/material/Button'
import { Auth } from 'aws-amplify'
import { useNavigate } from 'react-router-dom'
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth'
import GoogleIcon from '@mui/icons-material/Google'
import FacebookIcon from '@mui/icons-material/Facebook'
import VisibilityIcon from '@mui/icons-material/Visibility'
import InputAdornment from '@mui/material/InputAdornment'

import useBackEndMethods from '../hooks/useBackEndMethods'
import useGlobalState from '../global/GlobalSate'
import { SUB_ROUTES, ROUTES } from '../global/Constants'
import Button from '../components/Button'

type AuthOptions = 'SIGN_UP' | 'SIGN_IN' | 'CONFIRM_EMAIL'

const StyledAuthentication = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20%;

  .heading-1 {
    margin-bottom: 24px;
    width: 400px;
  }

  .subheading_text {
    margin-bottom: 24px;
    color: var(--color-light-grey);
  }

  .text_field {
    margin-bottom: 24px;
    width: 400px;

    .visibility_icon:hover {
      cursor: pointer;
    }
  }

  .or_group {
    width: 400px;
    display: flex;
    align-items: center;
    margin-bottom: 24px;

    .caption {
      margin: 0 8px;
      color: var(--color-white);
    }

    .or_line {
      border-bottom: 1px solid var(--color-white);
      width: 100%;
    }
  }

  .auth_options {
    .auth_option {
      display: flex;
      align-items: center;
      justify-content: center;

      button {
        position: relative;

        svg {
          position: absolute;
          left: 8px;
          margin-right: 8px;
        }
      }
    }
  }

  .error_text {
    color: var(--color-red);
    margin-bottom: 24px;
  }

  button {
    margin-bottom: 24px;
    width: 400px;
    color: var(--color-primary);
  }
`

const IntialState = {
  authFormInView: 'SIGN_UP',
  userEmail: '',
  password: '',
  code: '',
  errorText: '',
  showPassword: false
}

type State = typeof IntialState

type Action = {
  type: 'changePasswordVisibility'
}

type ActionWithPayload = {
  type: 'updateAuthFormInView'
  payload: AuthOptions
}

const reducer = (state: State, action: Action | ActionWithPayload): State => {
  if (action.type === 'updateAuthFormInView') {
    return {
      ...state,
      authFormInView: action.payload
    }
  }

  if (action.type === 'changePasswordVisibility') {
    return {
      ...state,
      showPassword: !state.showPassword
    }
  }

  return state
}

const Authentication = (): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, IntialState)

  const [userEmail, setUserEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')

  const [errorText, setErrorText] = useState('')

  const { handleGetProjects } = useBackEndMethods()
  const { setGlobalLoading } = useGlobalState()

  const navigate = useNavigate()

  useEffect(() => {
    setErrorText('')
  }, [userEmail, password, code, setErrorText, state.authFormInView])

  const handleSignUpUser = async (): Promise<any> => {
    try {
      await Auth.signUp({
        username: userEmail,
        password,
        attributes: { email: userEmail },
        autoSignIn: { enabled: true }
      })
      dispatch({ type: 'updateAuthFormInView', payload: 'CONFIRM_EMAIL' })
    } catch (error: any) {
      console.log('error signing up:', error)
      const passwordError = error?.message?.toLowerCase().includes('password')

      if (passwordError === true) {
        setErrorText('Ivalid password.')
      } else {
        setErrorText(error?.message)
      }
    }
  }

  const handleConfirmSignUpUser = async (): Promise<any> => {
    try {
      const response = await Auth.confirmSignUp(userEmail, code)

      navigate(`${ROUTES.PROJECT_SETUP}/${SUB_ROUTES.PROJECT_NAME}`)
      console.log('NEW USER RES', response)
    } catch (error: any) {
      console.log('error confirming sign up', error)
      setErrorText(error?.message)
    }
  }

  const handleSignInUser = async (): Promise<any> => {
    setGlobalLoading(true)
    try {
      await Auth.signIn(userEmail, password)

      navigate(ROUTES.PROJECT)
      await handleGetProjects(() => {
        setGlobalLoading(false)
      })
    } catch (error: any) {
      console.log('error signing in', error)
      setGlobalLoading(false)

      const passwordError = error?.message?.toLowerCase().includes('password')

      if (passwordError === true) {
        setErrorText('Ivalid password.')
      } else {
        setErrorText(error?.message)
      }
    }
  }

  return (
    <StyledAuthentication>
      {state.authFormInView === 'SIGN_UP' && (
        <>
          <h3 className="heading-1">
            Let's get you set up before your ass is kicked
          </h3>
          <TextField
            className="text_field"
            variant="standard"
            label="Email"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value)
            }}
          />
          <TextField
            type={state.showPassword ? 'text' : 'password'}
            className="text_field"
            variant="standard"
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <VisibilityIcon
                    className="visibility_icon"
                    onClick={() => {
                      dispatch({ type: 'changePasswordVisibility' })
                    }}
                  />
                </InputAdornment>
              )
            }}
          />
          <h6 className="caption error_text">{errorText}</h6>
          <Button
            text="Sign Up"
            variant="outlined"
            onClick={() => {
              void handleSignUpUser()
            }}
          />

          <div className="or_group">
            <div className="or_line" />
            <h5 className="caption"> OR </h5>
            <div className="or_line" />
          </div>
          <div className="auth_options">
            <div className="auth_option">
              <MaterialUIButton
                color="secondary"
                variant="contained"
                onClick={() => {
                  void Auth.federatedSignIn({
                    provider: CognitoHostedUIIdentityProvider.Google
                  })
                }}
              >
                <GoogleIcon color="primary" />
                Google
              </MaterialUIButton>
            </div>
            <div className="auth_option">
              <MaterialUIButton
                color="secondary"
                variant="contained"
                onClick={() => {
                  void Auth.federatedSignIn({
                    provider: CognitoHostedUIIdentityProvider.Facebook
                  })
                }}
              >
                <FacebookIcon color="primary" />
                Facebook
              </MaterialUIButton>
            </div>
          </div>

          <MaterialUIButton
            variant="text"
            onClick={() => {
              dispatch({ type: 'updateAuthFormInView', payload: 'SIGN_IN' })
            }}
          >
            I have an account
          </MaterialUIButton>
        </>
      )}
      {state.authFormInView === 'CONFIRM_EMAIL' && (
        <>
          <h3 className="heading-1">Confirm Sign Up</h3>
          <h4 className="caption subheading_text">
            A code has been sent to your email
          </h4>
          <TextField
            className="text_field"
            variant="standard"
            label="Code"
            value={code}
            onChange={(e) => {
              setCode(e.target.value)
            }}
          />
          <h6 className="caption error_text">{errorText}</h6>
          <Button
            variant="outlined"
            onClick={() => {
              void handleConfirmSignUpUser()
            }}
            text="Verify Code"
          />
        </>
      )}
      {state.authFormInView === 'SIGN_IN' && (
        <>
          <h3 className="heading-1">Let's get back to work</h3>
          <TextField
            className="text_field"
            variant="standard"
            label="Email"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value)
            }}
          />
          <TextField
            type={state.showPassword ? 'text' : 'password'}
            className="text_field"
            variant="standard"
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <VisibilityIcon
                    className="visibility_icon"
                    onClick={() => {
                      dispatch({ type: 'changePasswordVisibility' })
                    }}
                  />
                </InputAdornment>
              )
            }}
          />
          <h6 className="caption error_text">{errorText}</h6>
          <Button
            variant="outlined"
            onClick={() => {
              void handleSignInUser()
            }}
            text="Log In"
          />
          <MaterialUIButton
            variant="text"
            onClick={() => {
              dispatch({ type: 'updateAuthFormInView', payload: 'SIGN_UP' })
            }}
          >
            I don't have an account
          </MaterialUIButton>
        </>
      )}
    </StyledAuthentication>
  )
}

export default Authentication

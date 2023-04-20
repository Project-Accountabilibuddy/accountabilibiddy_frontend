import React, { useEffect, useReducer } from 'react'
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

enum AuthScreens {
  SIGN_UP_SCREEN = 'SIGN_UP_SCREEN',
  SIGN_IN_SCREEN = 'SIGN_IN_SCREEN',
  CONFIRM_EMAIL_SCREEN = 'CONFIRM_EMAIL_SCREEN'
}

const IntialState = {
  authFormInView: AuthScreens.SIGN_UP_SCREEN,
  userEmail: '',
  password: '',
  code: '',
  errorText: '',
  showPassword: false
}

type FormInputTypes =
  | 'SET_EMAIL'
  | 'SET_PASSWORD'
  | 'SET_CONFIRMATION_CODE'
  | 'SET_ERROR_TEXT'

type UpdateAuthFormInViewAction = {
  type: 'NAVIGATE_AUTH'
  payload: AuthScreens
}

type UpdateFormInputAction = {
  type: FormInputTypes
  payload: string
}

type UpdateTextVisibilityAction = {
  type: 'CHANGE_PASSWORD_VISIBILITY'
}

type Action =
  | UpdateAuthFormInViewAction
  | UpdateFormInputAction
  | UpdateTextVisibilityAction

type State = typeof IntialState

// TODO: BREAK OUT INTO SEPARATE FILE
const reducer = (state: State, action: Action): State => {
  if (action.type === 'NAVIGATE_AUTH') {
    return {
      ...state,
      authFormInView: action.payload
    }
  }

  if (action.type === 'CHANGE_PASSWORD_VISIBILITY') {
    return {
      ...state,
      showPassword: !state.showPassword
    }
  }

  if (action.type === 'SET_EMAIL') {
    return {
      ...state,
      userEmail: action.payload
    }
  }

  if (action.type === 'SET_PASSWORD') {
    return {
      ...state,
      password: action.payload
    }
  }

  if (action.type === 'SET_CONFIRMATION_CODE') {
    return {
      ...state,
      code: action.payload
    }
  }

  if (action.type === 'SET_ERROR_TEXT') {
    return {
      ...state,
      errorText: action.payload
    }
  }

  return state
}

const Authentication = (): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, IntialState)

  const { authFormInView, userEmail, password, code, errorText, showPassword } =
    state

  const { handleGetProjects } = useBackEndMethods()
  const { setGlobalLoading } = useGlobalState()

  const navigate = useNavigate()

  useEffect(() => {
    dispatch({ type: 'SET_ERROR_TEXT', payload: '' })
  }, [userEmail, password, code, authFormInView])

  const handleSignUpUser = async (): Promise<any> => {
    try {
      await Auth.signUp({
        username: userEmail,
        password,
        attributes: { email: userEmail },
        autoSignIn: { enabled: true }
      })
      dispatch({
        type: 'NAVIGATE_AUTH',
        payload: AuthScreens.CONFIRM_EMAIL_SCREEN
      })
    } catch (error: any) {
      console.log('error signing up:', error)
      const passwordError = error?.message?.toLowerCase().includes('password')

      if (passwordError === true) {
        dispatch({ type: 'SET_ERROR_TEXT', payload: 'Invalid Password' })
      } else {
        dispatch({ type: 'SET_ERROR_TEXT', payload: error?.message })
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
      dispatch({ type: 'SET_ERROR_TEXT', payload: error?.message })
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
        dispatch({ type: 'SET_ERROR_TEXT', payload: 'Invalid Password' })
      } else {
        dispatch({ type: 'SET_ERROR_TEXT', payload: error?.message })
      }
    }
  }

  return (
    <StyledAuthentication>
      {authFormInView === 'SIGN_UP_SCREEN' && (
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
              dispatch({ type: 'SET_EMAIL', payload: e.target.value })
            }}
          />
          <TextField
            type={showPassword ? 'text' : 'password'}
            className="text_field"
            variant="standard"
            label="Password"
            value={password}
            onChange={(e) => {
              dispatch({ type: 'SET_PASSWORD', payload: e.target.value })
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <VisibilityIcon
                    className="visibility_icon"
                    onClick={() => {
                      dispatch({ type: 'CHANGE_PASSWORD_VISIBILITY' })
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
              dispatch({
                type: 'NAVIGATE_AUTH',
                payload: AuthScreens.SIGN_IN_SCREEN
              })
            }}
          >
            I have an account
          </MaterialUIButton>
        </>
      )}
      {authFormInView === 'CONFIRM_EMAIL_SCREEN' && (
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
              dispatch({
                type: 'SET_CONFIRMATION_CODE',
                payload: e.target.value
              })
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
      {authFormInView === 'SIGN_IN_SCREEN' && (
        <>
          <h3 className="heading-1">Let's get back to work</h3>
          <TextField
            className="text_field"
            variant="standard"
            label="Email"
            value={userEmail}
            onChange={(e) => {
              dispatch({
                type: 'SET_EMAIL',
                payload: e.target.value
              })
            }}
          />
          <TextField
            type={showPassword ? 'text' : 'password'}
            className="text_field"
            variant="standard"
            label="Password"
            value={password}
            onChange={(e) => {
              dispatch({
                type: 'SET_PASSWORD',
                payload: e.target.value
              })
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <VisibilityIcon
                    className="visibility_icon"
                    onClick={() => {
                      dispatch({
                        type: 'CHANGE_PASSWORD_VISIBILITY'
                      })
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
              dispatch({
                type: 'NAVIGATE_AUTH',
                payload: AuthScreens.SIGN_UP_SCREEN
              })
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

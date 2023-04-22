import { useReducer } from 'react'

import { AUTH_SCREENS } from '../global/Types'

type FormInputTypes =
  | 'SET_EMAIL'
  | 'SET_PASSWORD'
  | 'SET_CONFIRMATION_CODE'
  | 'SET_ERROR_TEXT'

type UpdateAuthFormInViewAction = {
  type: 'NAVIGATE_AUTH'
  payload: AUTH_SCREENS
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

const INITIAL_AUTH_STATE = {
  authFormInView: AUTH_SCREENS.SIGN_UP_SCREEN,
  userEmail: '',
  password: '',
  code: '',
  errorText: '',
  showPassword: false
}

type State = typeof INITIAL_AUTH_STATE

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

const useAuthReducer = (): {
  authState: State
  authDispatch: React.Dispatch<Action>
} => {
  const [authState, authDispatch] = useReducer(reducer, INITIAL_AUTH_STATE)

  return {
    authState,
    authDispatch
  }
}

export default useAuthReducer

import axios from 'axios'
import { Auth } from 'aws-amplify'

import useGlobalState from '../global/GlobalSate'

interface useBackEndMethodsReturn {
  handleUpdateProject: (fieldToUpdate: object) => void
  handleGetProject: (onCompletionCB: () => void) => void
}

const useBackEndMethods = (): useBackEndMethodsReturn => {
  const {
    setUserResponseWhatLongForm,
    setProjectName,
    setUserResponseSacrificeLongForm,
    setUserResponseWhyLongForm,
    setUserResponseHattersLongForm,
    setWeeksExpectedToComplete,
    setUserResponseWhyShortForm,
    setUserResponseHattersShortForm
  } = useGlobalState()

  const handleGetProject = (onCompletionCB = () => {}): void => {
    Auth.currentSession()
      .then((res) => {
        const idToken = res.getIdToken().getJwtToken()
        const config = { headers: { Authorization: idToken } }

        axios
          .get(
            'https://euzdgtnwai.execute-api.us-east-1.amazonaws.com/project',
            config
          )
          .then((res) => {
            console.log('Retrieved Project: ', res.data.Item.projectName)
            onCompletionCB()
            const Items = res.data.Item

            // TODO: CLEANER WAY TO DO THIS... MAP OVER OBJECT KEYS?
            if (Items.userResponseWhatLongForm !== undefined) {
              setUserResponseWhatLongForm(Items.userResponseWhatLongForm)
            }

            if (Items.userResponseWhyLongForm !== undefined) {
              setUserResponseWhyLongForm(res.data.Item.userResponseWhyLongForm)
            }

            if (Items.projectName !== undefined) {
              setProjectName(Items.projectName)
            }

            if (Items.userResponseSacrificeLongForm !== undefined) {
              setUserResponseSacrificeLongForm(
                Items.userResponseSacrificeLongForm
              )
            }

            if (Items.userResponseHattersLongForm !== undefined) {
              setUserResponseHattersLongForm(Items.userResponseHattersLongForm)
            }

            if (Items.weeksExpectedToComplete !== undefined) {
              setWeeksExpectedToComplete(Items.weeksExpectedToComplete)
            }

            if (Items.userResponseWhyShortForm !== undefined) {
              const responses = JSON.parse(Items.userResponseWhyShortForm)

              responses.forEach((response: string, index: number) => {
                setUserResponseWhyShortForm(response, index)
              })
            }

            if (Items.userResponseHattersShortForm !== undefined) {
              const responses = JSON.parse(Items.userResponseHattersShortForm)

              responses.forEach((response: string, index: number) => {
                setUserResponseHattersShortForm(response, index)
              })
            }
          })
          .catch((err) => {
            console.log('GET PROJECT ERR', err)
            onCompletionCB()
          })
      })
      .catch((err) => {
        console.log('ID TOKEN ERR', err)
      })
  }

  const handleUpdateProject = (fieldToUpdate: object): void => {
    Auth.currentSession()
      .then((res) => {
        const idToken = res.getIdToken().getJwtToken()
        const config = { headers: { Authorization: idToken } }

        axios
          .put(
            'https://euzdgtnwai.execute-api.us-east-1.amazonaws.com/project',
            fieldToUpdate,
            config
          )
          .then((res) => {
            console.log(res.data)
          })
          .catch((err) => {
            console.log('UPDATE PROJECT ERR', err)
          })
      })
      .catch((err) => {
        console.log('ID TOKEN ERR', err)
      })
  }

  return {
    handleUpdateProject,
    handleGetProject
  }
}

export default useBackEndMethods

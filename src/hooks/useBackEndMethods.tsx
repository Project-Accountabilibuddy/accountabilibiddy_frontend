import axios from 'axios'

import useGlobalState from '../global/GlobalSate'

interface useBackEndMethodsReturn {
  handleUpdateProject: (fieldToUpdate: object, userID: string) => void
  handleGetProject: (userID: string, onCompletionCB: () => void) => void
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

  const handleGetProject = (
    userID: string,
    onCompletionCB = () => {}
  ): void => {
    axios
      .get(
        `https://euzdgtnwai.execute-api.us-east-1.amazonaws.com/items/${userID}`
      )
      .then((res) => {
        const Items = res.data.Item
        onCompletionCB()

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
          setUserResponseSacrificeLongForm(Items.userResponseSacrificeLongForm)
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
  }

  const handleUpdateProject = (fieldToUpdate: object, userID: string): void => {
    axios
      .put(
        `https://euzdgtnwai.execute-api.us-east-1.amazonaws.com/items/${userID}`,
        fieldToUpdate
      )
      .then((res) => {
        console.log('UPDATE PROJECT RES', res.data)
      })
      .catch((err) => {
        console.log('UPDATE PROJECT ERR', err)
      })
  }

  return {
    handleUpdateProject,
    handleGetProject
  }
}

export default useBackEndMethods

import axios from 'axios'

import useGlobalState from '../global/GlobalSate'

interface useBackEndMethodsReturn {
  handleUpdateProject: (fieldToUpdate: object, userID: string) => void
  handleGetProject: (userID: string) => void
}

const useBackEndMethods = (): useBackEndMethodsReturn => {
  const {
    setUserResponseWhatLongForm,
    setProjectName,
    setUserResponseSacrificeLongForm,
    setUserResponseWhyLongForm,
    setUserResponseHattersLongForm,
    setWeeksExpectedToComplete
  } = useGlobalState()

  const handleGetProject = (userID: string): void => {
    axios
      .get(
        `https://euzdgtnwai.execute-api.us-east-1.amazonaws.com/items/${userID}`
      )
      .then((res) => {
        const Items = res.data.Item

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
      })
      .catch((err) => {
        console.log('GET PROJECT ERR', err)
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

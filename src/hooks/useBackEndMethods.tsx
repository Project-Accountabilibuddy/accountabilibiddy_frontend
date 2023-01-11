import axios from 'axios'

import useGlobalState from '../global/GlobalSate'

interface useBackEndMethodsReturn {
  handleUpdateProject: (
    userResponseWhatLongForm: string,
    userID: string
  ) => void
  handleGetProject: (userID: string) => void
}

const useBackEndMethods = (): useBackEndMethodsReturn => {
  const { setUserResponseWhatLongForm } = useGlobalState()

  const handleGetProject = (userID: string): void => {
    axios
      .get(
        `https://euzdgtnwai.execute-api.us-east-1.amazonaws.com/items/${userID}`
      )
      .then((res) => {
        console.log('GET PROJECT RES', res)
        setUserResponseWhatLongForm(res.data.Item.userResponseWhatLongForm)
      })
      .catch((err) => {
        console.log('GET PROJECT ERR', err)
      })
  }

  const handleUpdateProject = (
    userResponseWhatLongForm: string,
    userID: string
  ): void => {
    axios
      .put(
        `https://euzdgtnwai.execute-api.us-east-1.amazonaws.com/items/${userID}`,
        { userResponseWhatLongForm }
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

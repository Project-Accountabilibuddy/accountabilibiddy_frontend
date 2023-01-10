import axios from 'axios'

import useGlobalState from '../global/GlobalSate'

const useBackEndMethods = (): {
  handleCreateOrGetProject: (id: string) => void
  handleUpdateProject: (
    userResponseWhatLongForm: string,
    userID: string
  ) => void
  handleGetProject: (userID: string) => void
} => {
  const { setUserID, setUserResponseWhatLongForm } = useGlobalState()

  const handleGetProject = (userID: string): void => {
    axios
      .get(
        `https://euzdgtnwai.execute-api.us-east-1.amazonaws.com/items/${userID}`
      )
      .then((res) => {
        console.log('PROJECT ITEMS GET RES', res.data.Item)
        setUserResponseWhatLongForm(res.data.Item.userResponseWhatLongForm)
      })
      .catch((err) => {
        console.log('PROJECT ITEMS GET ERR', err)
      })
  }

  const handleCreateOrGetProject = (userID: string): void => {
    axios
      .put('https://euzdgtnwai.execute-api.us-east-1.amazonaws.com/items', {
        id: userID
      })
      .then((res) => {
        console.log('PROJECT CREATED', res)
        handleGetProject(userID)
        setUserID(userID)
      })
      .catch((err) => {
        console.log('PROJECT EXISTS', err)
      })
  }

  const handleUpdateProject = (
    userResponseWhatLongForm: string,
    userID: string
  ): void => {
    console.log('I HAVE AN ID', userID)
    axios
      .put(
        `https://euzdgtnwai.execute-api.us-east-1.amazonaws.com/items/${userID}`,
        {
          userResponseWhatLongForm
        }
      )
      .then((res) => {
        console.log('PROJECT ITEM UPDATE RES', res.data)
      })
      .catch((err) => {
        console.log('PROJECT ITEM UPDATE ERR', err)
      })
  }

  return {
    handleCreateOrGetProject,
    handleUpdateProject,
    handleGetProject
  }
}

export default useBackEndMethods

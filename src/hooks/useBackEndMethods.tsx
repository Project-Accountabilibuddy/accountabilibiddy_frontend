import axios from 'axios'

import useGlobalState from '../global/GlobalSate'

const useBackEndMethods = (): {
  handleUpdateProject: (
    userResponseWhatLongForm: string,
    userID: string
  ) => void
  handleGetProject: (userID: string) => void
} => {
  const { setUserResponseWhatLongForm } = useGlobalState()

  const handleGetProject = (userID: string): void => {
    console.log('LOOK AT ME FUCKER: ', userID)
    axios
      .get(
        `https://euzdgtnwai.execute-api.us-east-1.amazonaws.com/items/${userID}`
      )
      .then((res) => {
        console.log('PROJECT ITEMS GET RES', res)
        setUserResponseWhatLongForm(res.data.Item.userResponseWhatLongForm)
      })
      .catch((err) => {
        console.log('PROJECT ITEMS GET ERR', err)
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
    handleUpdateProject,
    handleGetProject
  }
}

export default useBackEndMethods

import { useEffect } from 'react'
import axios from 'axios'

import useGlobalState from '../global/GlobalSate'

const useBackEndMethods = (): {
  handleCreateOrGetProject: (id: string) => void
  handleUpdateProject: (userResponseWhatLongForm: string) => void
} => {
  const { setUserID, userID } = useGlobalState()

  const handleGetProject = (userID: string): void => {
    axios
      .get(
        `https://euzdgtnwai.execute-api.us-east-1.amazonaws.com/items/${userID}`
      )
      .then((res) => {
        console.log('PROJECT ITEMS GET RES', res.data)
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

  const handleUpdateProject = (userResponseWhatLongForm: string): void => {
    axios
      .put(
        `https://euzdgtnwai.execute-api.us-east-1.amazonaws.com/items/${userID}`,
        {
          userResponseWhatLongForm
        }
      )
      .then((res) => {
        console.log('PROJECT ITEMS GET RES', res.data)
      })
      .catch((err) => {
        console.log('PROJECT ITEMS GET ERR', err)
      })
  }

  return {
    handleCreateOrGetProject,
    handleUpdateProject
  }
}

export default useBackEndMethods

import axios from 'axios'
import { Auth } from 'aws-amplify'

import useGlobalState from '../global/GlobalSate'

interface useBackEndMethodsReturn {
  handleGetProject: (onCompletionCB: () => void) => void
  handleUpdateProject: (fieldToUpdate: object) => void
  handleCreateProject: (projectName: object) => void
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
    setUserResponseHattersShortForm,
    projectName
  } = useGlobalState()

  const handleGetProject = (onCompletionCB = () => {}): void => {
    Auth.currentSession()
      .then((res) => {
        const idToken = res.getIdToken().getJwtToken()
        const config = { headers: { Authorization: idToken } }

        axios
          .get(
            'https://neu3e8od22.execute-api.us-east-1.amazonaws.com/project',
            config
          )
          .then((res) => {
            console.log(
              'Retrieved Project: ',
              res.data.Items[0].userResponseWhyLongForm
            )

            onCompletionCB()
            const {
              projectName,
              userResponseWhatLongForm,
              userResponseWhyLongForm,
              userResponseSacrificeLongForm,
              userResponseHattersLongForm,
              weeksExpectedToComplete,
              userResponseWhyShortForm,
              userResponseHattersShortForm
            } = res.data.Items[0]

            setProjectName(projectName)
            setUserResponseWhatLongForm(userResponseWhatLongForm)
            setUserResponseWhyLongForm(userResponseWhyLongForm)
            setUserResponseSacrificeLongForm(userResponseSacrificeLongForm)
            setUserResponseHattersLongForm(userResponseHattersLongForm)
            setWeeksExpectedToComplete(weeksExpectedToComplete)

            JSON.parse(userResponseWhyShortForm).forEach(
              (response: string, index: number) => {
                setUserResponseWhyShortForm(response, index)
              }
            )

            JSON.parse(userResponseHattersShortForm).forEach(
              (response: string, index: number) => {
                setUserResponseHattersShortForm(response, index)
              }
            )
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
            'https://neu3e8od22.execute-api.us-east-1.amazonaws.com/project',
            {
              fieldToUpdate: Object.keys(fieldToUpdate)[0],
              updateValue: Object.values(fieldToUpdate)[0],
              projectToUpdate: projectName
            },
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

  const handleCreateProject = (projectName: object): void => {
    Auth.currentSession()
      .then((res) => {
        const idToken = res.getIdToken().getJwtToken()
        const config = { headers: { Authorization: idToken } }

        axios
          .post(
            'https://neu3e8od22.execute-api.us-east-1.amazonaws.com/project',
            projectName,
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
    handleGetProject,
    handleCreateProject
  }
}

export default useBackEndMethods

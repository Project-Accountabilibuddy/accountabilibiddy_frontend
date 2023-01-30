import axios from 'axios'
import { Auth } from 'aws-amplify'
import { useNavigate } from 'react-router-dom'

import useGlobalState from '../global/GlobalSate'
import { SETUP_PROJECT_SCREENS, ROUTES } from '../global/Constants'

interface useBackEndMethodsReturn {
  handleGetProjects: (onCompletionCB?: () => void) => void
  handleUpdateProject: (fieldToUpdate: object) => void
  handleCreateProject: (projectName: object) => void
}

const useBackEndMethods = (): useBackEndMethodsReturn => {
  const {
    setUserResponseWhatLongForm,
    setProjectName,
    setProjectStartDate,
    setUserResponseSacrificeLongForm,
    setUserResponseWhyLongForm,
    setUserResponseHatersLongForm,
    setWeeksExpectedToComplete,
    setUserResponseWhyShortForm,
    setUserResponseHatersShortForm,
    setDaysResponseFeed,
    projectName
  } = useGlobalState()

  const navigate = useNavigate()

  const handleGetProjects = (onCompletionCB = () => {}): void => {
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
            if (res.data.Items.length === 0) {
              console.log('PROJECT HAS NOT BEEN SET UP YET')
              navigate(
                `${ROUTES.PROJECT_SETUP}/${SETUP_PROJECT_SCREENS.PROJECT_NAME}`
              )
            }

            console.log('Retrieved Project: ', res.data.Items[0].projectName)

            onCompletionCB()

            // TODO: SUPPORT MUTLIPLE PROJECTS FEATURE HERE
            const {
              projectName,
              projectStartDate,
              userResponseWhatLongForm,
              userResponseWhyLongForm,
              userResponseSacrificeLongForm,
              userResponseHatersLongForm,
              weeksExpectedToComplete,
              userResponseWhyShortForm,
              userResponseHatersShortForm,
              daysResponseFeed
            } = res.data.Items[0]

            setProjectName(projectName)
            setProjectStartDate(projectStartDate)
            setUserResponseWhatLongForm(userResponseWhatLongForm)
            setUserResponseWhyLongForm(userResponseWhyLongForm)
            setUserResponseSacrificeLongForm(userResponseSacrificeLongForm)
            setUserResponseHatersLongForm(userResponseHatersLongForm)
            setWeeksExpectedToComplete(weeksExpectedToComplete)

            setDaysResponseFeed(JSON.parse(daysResponseFeed))

            JSON.parse(userResponseWhyShortForm).forEach(
              (response: string, index: number) => {
                setUserResponseWhyShortForm(response, index)
              }
            )

            JSON.parse(userResponseHatersShortForm).forEach(
              (response: string, index: number) => {
                setUserResponseHatersShortForm(response, index)
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
    handleGetProjects,
    handleCreateProject
  }
}

export default useBackEndMethods

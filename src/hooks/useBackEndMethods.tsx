import axios from 'axios'
import { Auth } from 'aws-amplify'
import { useNavigate } from 'react-router-dom'

import useGlobalState from '../global/GlobalSate'
import { SETUP_PROJECT_SCREENS, ROUTES } from '../global/Constants'

interface useBackEndMethodsReturn {
  handleGetProjects: (onCompletionCB?: () => void) => Promise<void>
  handleUpdateProject: (fieldToUpdate: object) => Promise<void>
  handleCreateProject: (projectName: object) => Promise<void>
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
    setAllUserResponseWhyShortForm,
    setAllUserResponseHatersShortForm,
    setDaysResponseFeed,
    projectName
  } = useGlobalState()

  const navigate = useNavigate()

  const handleGetProjects = async (onCompletionCB = () => {}): Promise<any> => {
    try {
      const session = await Auth.currentSession()
      const idToken = session.getIdToken().getJwtToken()
      const config = { headers: { Authorization: idToken } }

      const response = await axios.get(
        'https://neu3e8od22.execute-api.us-east-1.amazonaws.com/project',
        config
      )

      if (response.data.Items.length === 0) {
        throw new Error('PROJECT_NOT_SET_UP_YET')
      }

      console.log('Retrieved Project: ', response.data.Items[0].projectName)

      // TODO: SUPPORT MUTLIPLE PROJECTS FEATURE HERE
      const {
        projectName,
        projectStartDate,
        userCompletedSignUpFlow,
        userResponseWhatLongForm,
        userResponseWhyLongForm,
        userResponseSacrificeLongForm,
        userResponseHatersLongForm,
        weeksExpectedToComplete,
        userResponseWhyShortForm,
        userResponseHatersShortForm,
        daysResponseFeed
      } = response.data.Items[0]

      // TODO: NAV LOGIC SHOULD BE CONSOLIDATED
      console.log('userCompletedSignUpFlow: ', userCompletedSignUpFlow)
      if (userCompletedSignUpFlow === false) {
        navigate(
          `${ROUTES.PROJECT_SETUP}/${SETUP_PROJECT_SCREENS.WHAT_LONG_FORM}`
        )
      }

      setProjectName(projectName)
      setProjectStartDate(projectStartDate)
      setUserResponseWhatLongForm(userResponseWhatLongForm)
      setUserResponseWhyLongForm(userResponseWhyLongForm)
      setUserResponseSacrificeLongForm(userResponseSacrificeLongForm)
      setUserResponseHatersLongForm(userResponseHatersLongForm)
      setWeeksExpectedToComplete(weeksExpectedToComplete)
      setDaysResponseFeed(JSON.parse(daysResponseFeed))
      setAllUserResponseWhyShortForm(JSON.parse(userResponseWhyShortForm))
      setAllUserResponseHatersShortForm(JSON.parse(userResponseHatersShortForm))
    } catch (err: any) {
      console.log('GET PROJECT ERR', err)

      if (err.message === 'PROJECT_NOT_SET_UP_YET') {
        navigate(
          `${ROUTES.PROJECT_SETUP}/${SETUP_PROJECT_SCREENS.PROJECT_NAME}`
        )
      }
    } finally {
      onCompletionCB()
    }
  }

  const handleUpdateProject = async (fieldToUpdate: object): Promise<any> => {
    try {
      const session = await Auth.currentSession()
      const idToken = session.getIdToken().getJwtToken()
      const config = { headers: { Authorization: idToken } }

      const response = await axios.put(
        'https://neu3e8od22.execute-api.us-east-1.amazonaws.com/project',
        {
          fieldToUpdate: Object.keys(fieldToUpdate)[0],
          updateValue: Object.values(fieldToUpdate)[0],
          projectToUpdate: projectName
        },
        config
      )

      console.log(response.data)
    } catch (err) {
      console.log('UPDATE PROJECT ERR', err)
    }
  }

  const handleCreateProject = async (projectName: object): Promise<any> => {
    try {
      const session = await Auth.currentSession()
      const idToken = session.getIdToken().getJwtToken()
      const config = { headers: { Authorization: idToken } }

      const response = await axios.post(
        'https://neu3e8od22.execute-api.us-east-1.amazonaws.com/project',
        projectName,
        config
      )

      console.log(response.data)
    } catch (err) {
      console.log('CREATE PROJECT ERR', err)
    }
  }

  return {
    handleUpdateProject,
    handleGetProjects,
    handleCreateProject
  }
}

export default useBackEndMethods

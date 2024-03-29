import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom'

import FormInput from '../components/FormInput'
import useGlobalState from '../global/GlobalSate'
import useBackEndMethods from '../hooks/useBackEndMethods'
import { SUB_ROUTES, ROUTES } from '../global/Types'
import TopNavBar from '../components/TopNavBar'

const StyledProjectSetup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20%;
  width: 100%;
  position: relative;
`

const ProjectSetup = (): JSX.Element => {
  const {
    userResponseWhatLongForm,
    userResponseSacrificeLongForm,
    projectName,
    userResponseWhyLongForm,
    userResponseWhyShortForm,
    userResponseHatersLongForm,
    userResponseHatersShortForm,
    weeksExpectedToComplete,
    inEditFormMode,
    setInEditFormMode,
    setUserResponseWhyShortForm,
    setUserResponseWhatLongForm,
    setProjectName,
    setUserResponseSacrificeLongForm,
    setUserResponseWhyLongForm,
    setUserResponseHatersLongForm,
    updateWhyShortFormNumberOfResponses,
    updateHatersShortFormNumberOfResponses,
    setUserResponseHatersShortForm,
    setWeeksExpectedToComplete
  } = useGlobalState()

  const { handleUpdateProject, handleCreateProject } = useBackEndMethods()

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const endOfPath = pathname.split(ROUTES.LANDING).slice(-1)[0]

  // USER SHOULD NEVER BE ABLE TO UPDATE PROJECT NAME
  useEffect(() => {
    if (endOfPath === SUB_ROUTES.PROJECT_NAME && projectName !== '') {
      navigate(`${ROUTES.PROJECT_SETUP}/${SUB_ROUTES.WHAT_LONG_FORM}`)
    }
  }, [endOfPath])

  const handleContinueAction = (
    fieldToUpdate: object,
    nextFormInView: string
  ): void => {
    handleUpdateProject(fieldToUpdate).finally(() => {
      console.log('update complete')
    })

    if (inEditFormMode) {
      navigate(ROUTES.PROJECT)
      setInEditFormMode(false)
    } else {
      navigate(`${ROUTES.PROJECT_SETUP}/${nextFormInView}`)
    }
  }

  return (
    <>
      <TopNavBar />
      <StyledProjectSetup>
        {endOfPath === SUB_ROUTES.PROJECT_NAME && (
          <FormInput
            type="TEXT"
            step="Feel free to take a break at any point, progress is saved every time you click next"
            title="Better come up with an inspring name for your project..."
            description="Note: be careful this can not be changed..."
            responseText={projectName}
            setResponseText={(text) => {
              setProjectName(text)
            }}
            continueAction={() => {
              handleCreateProject({ projectName }).finally(() => {
                console.log('create project complete')
              })
              navigate(`${ROUTES.PROJECT_SETUP}/${SUB_ROUTES.WHAT_LONG_FORM}`)
            }}
          />
        )}
        {endOfPath === SUB_ROUTES.WHAT_LONG_FORM && (
          <FormInput
            type="TEXT"
            step="Step 1/7"
            title="What do you want to do? Please make it interesting..."
            description="Write fast and dirty straigh from the heart for at least 10 minutes, if that's too much effort then you are not serious about this, please quit"
            responseText={userResponseWhatLongForm}
            setResponseText={(text) => {
              setUserResponseWhatLongForm(text)
            }}
            continueAction={() => {
              handleContinueAction(
                { userResponseWhatLongForm },
                SUB_ROUTES.WHY_LONG_FORM
              )
            }}
          />
        )}
        {endOfPath === SUB_ROUTES.WHY_LONG_FORM && (
          <FormInput
            type="TEXT"
            step="Step 2/7"
            title="Why the fuck are you doing this?"
            description="Write fast and dirty straigh from the heart for at least 10 minutes, if that's too much effort then you are not serious about this, please quit"
            responseText={userResponseWhyLongForm}
            setResponseText={(text) => {
              setUserResponseWhyLongForm(text)
            }}
            continueAction={() => {
              handleContinueAction(
                { userResponseWhyLongForm },
                SUB_ROUTES.HATERS_LONG_FORM
              )
            }}
            backAction={() => {
              navigate(`${ROUTES.PROJECT_SETUP}/${SUB_ROUTES.WHAT_LONG_FORM}`)
            }}
          />
        )}
        {endOfPath === SUB_ROUTES.HATERS_LONG_FORM && (
          <FormInput
            type="TEXT"
            step="Step 3/7"
            title="What will your internal voice say that thinks you cant?"
            description="Write fast and dirty straigh from the heart for at least 10 minutes, if that's too much effort then you are not serious about this, please quit"
            responseText={userResponseHatersLongForm}
            setResponseText={(text) => {
              setUserResponseHatersLongForm(text)
            }}
            continueAction={() => {
              handleContinueAction(
                { userResponseHatersLongForm },
                SUB_ROUTES.SACRIFICES_LONG_FORM
              )
            }}
            backAction={() => {
              navigate(`${ROUTES.PROJECT_SETUP}/${SUB_ROUTES.WHY_LONG_FORM}`)
            }}
          />
        )}
        {endOfPath === SUB_ROUTES.SACRIFICES_LONG_FORM && (
          <FormInput
            type="TEXT"
            step="Step 4/7"
            title="What sacrifces will be made?"
            description="Write fast and dirty straigh from the heart for at least 10 minutes, if that's too much effort then you are not serious about this, please quit"
            responseText={userResponseSacrificeLongForm}
            setResponseText={(text) => {
              setUserResponseSacrificeLongForm(text)
            }}
            continueAction={() => {
              handleContinueAction(
                { userResponseSacrificeLongForm },
                SUB_ROUTES.WHY_SHORT_FORM
              )
            }}
            backAction={() => {
              navigate(`${ROUTES.PROJECT_SETUP}/${SUB_ROUTES.HATERS_LONG_FORM}`)
            }}
          />
        )}
        {endOfPath === SUB_ROUTES.WHY_SHORT_FORM && (
          <FormInput
            type="MULTIPLE_TEXT"
            step="Step 5/7"
            title="Here are your reasons for doing this, now distill them into some one liners to inspire you when you want to give up"
            groupResponses={userResponseWhyShortForm}
            responseText={userResponseWhyLongForm}
            updateNumberOfGroupResponses={updateWhyShortFormNumberOfResponses}
            setGroupResponse={setUserResponseWhyShortForm}
            continueAction={() => {
              handleContinueAction(
                {
                  userResponseWhyShortForm: JSON.stringify(
                    userResponseWhyShortForm
                  )
                },
                SUB_ROUTES.HATERS_SHORT_FORM
              )
            }}
            backAction={() => {
              navigate(
                `${ROUTES.PROJECT_SETUP}/${SUB_ROUTES.SACRIFICES_LONG_FORM}`
              )
            }}
          />
        )}
        {endOfPath === SUB_ROUTES.HATERS_SHORT_FORM && (
          <FormInput
            type="MULTIPLE_TEXT"
            step="Step 6/7"
            title="Distill the voice of others and your own that tell you why you can't with the aim of pushing yourself onward."
            groupResponses={userResponseHatersShortForm}
            responseText={userResponseHatersLongForm}
            updateNumberOfGroupResponses={
              updateHatersShortFormNumberOfResponses
            }
            setGroupResponse={setUserResponseHatersShortForm}
            continueAction={() => {
              handleContinueAction(
                {
                  userResponseHatersShortForm: JSON.stringify(
                    userResponseHatersShortForm
                  )
                },
                SUB_ROUTES.WEEKS_EXPECTED_TO_COMPLETE
              )
            }}
            backAction={() => {
              navigate(`${ROUTES.PROJECT_SETUP}/${SUB_ROUTES.WHY_SHORT_FORM}`)
            }}
          />
        )}
        {endOfPath === SUB_ROUTES.WEEKS_EXPECTED_TO_COMPLETE && (
          <FormInput
            type="NUMBER"
            step="7/7"
            title="Choose a number of weeks to achieve your aim, in an amount of time that is inspiring but not impossible"
            description="This can not be edited, deadlines are important, what is to keep you from continueing to push this shit out. If the project was meaningful enough do a part two after this is done"
            responseNumber={Number(weeksExpectedToComplete)}
            setResponseNumber={(text) => {
              setWeeksExpectedToComplete(String(text))
            }}
            continueAction={() => {
              handleUpdateProject({ weeksExpectedToComplete }).finally(() => {
                console.log('project set up complete')
              })
              navigate(ROUTES.PROJECT)
            }}
            backAction={() => {
              navigate(
                `${ROUTES.PROJECT_SETUP}/${SUB_ROUTES.HATERS_SHORT_FORM}`
              )
            }}
          />
        )}
      </StyledProjectSetup>
    </>
  )
}

export default ProjectSetup

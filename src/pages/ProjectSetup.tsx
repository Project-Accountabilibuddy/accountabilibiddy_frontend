import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom'

import FormInput from '../components/FormInput'
import useGlobalState from '../global/GlobalSate'
import useBackEndMethods from '../hooks/useBackEndMethods'

const StyledProjectSetup = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  padding: 0 200px;
  height: 100%;
`

const DEFAULT_FORM_RESPONSES = {
  JOURNEY_NAME: 'journey-name',
  WHAT_LONG_FORM: 'what-long-form',
  WHY_LONG_FORM: 'why-long-form',
  WHY_SHORT_FORM: 'why-short-form',
  HATTERS_LONG_FORM: 'hatters-long-form',
  HATTERS_SHORT_FORM: 'hatters-short-form',
  SACRIFICES_LONG_FORM: 'sacrifices-long-form',
  WEEKS_EXPECTED_TO_COMPLETE: 'weeks-expected-to-complete'
}

const ProjectSetup = (): JSX.Element => {
  const {
    userResponseWhatLongForm,
    userResponseSacrificeLongForm,
    projectName,
    userResponseWhyLongForm,
    userResponseWhyShortForm,
    userResponseHattersLongForm,
    userResponseHattersShortForm,
    weeksExpectedToComplete,
    setUserResponseWhyShortForm,
    setUserResponseWhatLongForm,
    setProjectName,
    setUserResponseSacrificeLongForm,
    setUserResponseWhyLongForm,
    setUserResponseHattersLongForm,
    updateWhyShortFormNumberOfResponses,
    updateHattersShortFormNumberOfResponses,
    setUserResponseHattersShortForm,
    setWeeksExpectedToComplete
  } = useGlobalState()

  const [inEditFormMode, setInEditFormMode] = useState(false)
  const [formInView, setFormInView] = useState(
    projectName === ''
      ? DEFAULT_FORM_RESPONSES.JOURNEY_NAME
      : DEFAULT_FORM_RESPONSES.WHAT_LONG_FORM
  )

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { handleUpdateProject, handleCreateProject } = useBackEndMethods()

  // NAVIGATES USER TO PROPER EDIT SCREEN
  useEffect(() => {
    const endOfPath = pathname.split('/').slice(-1)[0]

    if (endOfPath !== 'project-setup') {
      setInEditFormMode(true)
      setFormInView(endOfPath)
    }
  }, [pathname])

  const handleContinueAction = (
    fieldToUpdate: object,
    nextFormInView: string
  ): void => {
    handleUpdateProject(fieldToUpdate)

    if (inEditFormMode) {
      navigate('/my-project')
    } else {
      setFormInView(nextFormInView)
    }
  }

  return (
    <StyledProjectSetup>
      {formInView === DEFAULT_FORM_RESPONSES.JOURNEY_NAME && (
        <FormInput
          type="TEXT"
          title="Better come up with an inspring name"
          responseText={projectName}
          setResponseText={(text) => {
            setProjectName(text)
          }}
          continueAction={() => {
            handleCreateProject({ projectName })
            setFormInView(DEFAULT_FORM_RESPONSES.WHAT_LONG_FORM)
          }}
        />
      )}
      {formInView === DEFAULT_FORM_RESPONSES.WHAT_LONG_FORM && (
        <FormInput
          type="TEXT"
          title="What do you want to do? Please make it interesting..."
          description="Write fast and dirty straigh from the heart for at least 10 minutes, if that's too much effort then you are not serious about this, please quit"
          responseText={userResponseWhatLongForm}
          setResponseText={(text) => {
            setUserResponseWhatLongForm(text)
          }}
          continueAction={() => {
            handleContinueAction(
              { userResponseWhatLongForm },
              DEFAULT_FORM_RESPONSES.WHY_LONG_FORM
            )
          }}
        />
      )}
      {formInView === DEFAULT_FORM_RESPONSES.WHY_LONG_FORM && (
        <FormInput
          type="TEXT"
          title="Why the fuck are you doing this?"
          description="Write fast and dirty straigh from the heart for at least 10 minutes, if that's too much effort then you are not serious about this, please quit"
          responseText={userResponseWhyLongForm}
          setResponseText={(text) => {
            setUserResponseWhyLongForm(text)
          }}
          continueAction={() => {
            handleContinueAction(
              { userResponseWhyLongForm },
              DEFAULT_FORM_RESPONSES.HATTERS_LONG_FORM
            )
          }}
        />
      )}
      {formInView === DEFAULT_FORM_RESPONSES.HATTERS_LONG_FORM && (
        <FormInput
          type="TEXT"
          title="What will your internal bitch say?"
          description="Write fast and dirty straigh from the heart for at least 10 minutes, if that's too much effort then you are not serious about this, please quit"
          responseText={userResponseHattersLongForm}
          setResponseText={(text) => {
            setUserResponseHattersLongForm(text)
          }}
          continueAction={() => {
            handleContinueAction(
              { userResponseHattersLongForm },
              DEFAULT_FORM_RESPONSES.SACRIFICES_LONG_FORM
            )
          }}
        />
      )}
      {formInView === DEFAULT_FORM_RESPONSES.SACRIFICES_LONG_FORM && (
        <FormInput
          type="TEXT"
          title="What sacrifces will be made? Is this actually worth it?"
          description="Write fast and dirty straigh from the heart for at least 10 minutes, if that's too much effort then you are not serious about this, please quit"
          responseText={userResponseSacrificeLongForm}
          setResponseText={(text) => {
            setUserResponseSacrificeLongForm(text)
          }}
          continueAction={() => {
            handleContinueAction(
              { userResponseSacrificeLongForm },
              DEFAULT_FORM_RESPONSES.WHY_SHORT_FORM
            )
          }}
        />
      )}
      {formInView === DEFAULT_FORM_RESPONSES.WHY_SHORT_FORM && (
        <FormInput
          type="MULTIPLE_TEXT"
          title="Here is your bullshit reason for doing this, now distill it into some bull shit one liners"
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
              DEFAULT_FORM_RESPONSES.HATTERS_SHORT_FORM
            )
          }}
        />
      )}
      {formInView === DEFAULT_FORM_RESPONSES.HATTERS_SHORT_FORM && (
        <FormInput
          type="MULTIPLE_TEXT"
          title="Distill the voice of others and your own inner bitch that tells you why you can't"
          groupResponses={userResponseHattersShortForm}
          responseText={userResponseHattersLongForm}
          updateNumberOfGroupResponses={updateHattersShortFormNumberOfResponses}
          setGroupResponse={setUserResponseHattersShortForm}
          continueAction={() => {
            handleContinueAction(
              {
                userResponseHattersShortForm: JSON.stringify(
                  userResponseHattersShortForm
                )
              },
              DEFAULT_FORM_RESPONSES.WEEKS_EXPECTED_TO_COMPLETE
            )
          }}
        />
      )}
      {formInView === DEFAULT_FORM_RESPONSES.WEEKS_EXPECTED_TO_COMPLETE && (
        <FormInput
          type="NUMBER"
          title="Choose a time that is inspiring but not impossible"
          description="This can nto be edited, deadlines are important,
           what is to keep you from continueing to push this shit out.
            If the project was meaningful enough do a part two after this is done"
          responseNumber={Number(weeksExpectedToComplete)}
          setResponseNumber={(text) => {
            setWeeksExpectedToComplete(String(text))
          }}
          continueAction={() => {
            handleUpdateProject({ weeksExpectedToComplete })
            navigate('/my-project')
          }}
        />
      )}
    </StyledProjectSetup>
  )
}

export default ProjectSetup

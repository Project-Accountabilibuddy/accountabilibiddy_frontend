import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import FormInput from '../components/FormInput'
import useGlobalState from '../global/GlobalSate'

const StyledProjectSetup = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  padding: 0 200px;
  height: 100%;
`

const DEFAULT_FORM_RESPONSES = {
  WHAT_LONG_FORM: 'WHAT_LONG_FORM',
  WHY_LONG_FORM: 'WHY_LONG_FORM',
  WHY_SHORT_FORM: 'WHY_SHORT_FORM',
  HATTERS_LONG_FORM: 'HATTERS_LONG_FORM',
  HATTERS_SHORT_FORM: 'HATTERS_SHORT_FORM',
  SACRIFICES_LONG_FORM: 'SACRIFICES_LONG_FORM',
  JOURNEY_NAME: 'JOURNEY_NAME',
  WEEKS_EXPECTED_TO_COMPLETE: 'WEEKS_EXPECTED_TO_COMPLETE'
}

// TOOD: SHIT THAT NEEDS DOING
// 1. HAVE MORE OF NAV HANDLED IN URL SO USER CAN GO DIRECT TO SPECIFIC FORM
// 2. ADD IN TIME USER WILL GIVE THEMSELVES TO COMPLETE PROJECT
// 3. SOME KIND OF PERMANENT SAVE BUTTON MAY BE NEEDED
const ProjectSetup = (): JSX.Element => {
  const [formInView, setFormInView] = useState(
    DEFAULT_FORM_RESPONSES.WHAT_LONG_FORM
  )

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

  const navigate = useNavigate()

  return (
    <StyledProjectSetup>
      {formInView === 'WHAT_LONG_FORM' && (
        <FormInput
          type="TEXT"
          title="What do you want to do? Please make it interesting..."
          description="Write fast and dirty straigh from the heart for at least 10 minutes, if that's too much effort then you are not serious about this, please quit"
          responseText={userResponseWhatLongForm}
          setResponseText={(text) => {
            setUserResponseWhatLongForm(text)
          }}
          continueAction={() => {
            setFormInView(DEFAULT_FORM_RESPONSES.WHY_LONG_FORM)
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
            setFormInView(DEFAULT_FORM_RESPONSES.HATTERS_LONG_FORM)
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
            setFormInView(DEFAULT_FORM_RESPONSES.SACRIFICES_LONG_FORM)
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
            setFormInView(DEFAULT_FORM_RESPONSES.WHY_SHORT_FORM)
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
            setFormInView(DEFAULT_FORM_RESPONSES.HATTERS_SHORT_FORM)
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
            setFormInView(DEFAULT_FORM_RESPONSES.JOURNEY_NAME)
          }}
        />
      )}
      {formInView === DEFAULT_FORM_RESPONSES.JOURNEY_NAME && (
        <FormInput
          type="TEXT"
          title="Better come up with an inspring name"
          responseText={projectName}
          setResponseText={(text) => {
            setProjectName(text)
          }}
          continueAction={() => {
            setFormInView(DEFAULT_FORM_RESPONSES.WEEKS_EXPECTED_TO_COMPLETE)
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
          responseNumber={weeksExpectedToComplete}
          setResponseNumber={(text) => {
            setWeeksExpectedToComplete(text)
          }}
          continueAction={() => {
            navigate('/my-project')
          }}
        />
      )}
    </StyledProjectSetup>
  )
}

export default ProjectSetup

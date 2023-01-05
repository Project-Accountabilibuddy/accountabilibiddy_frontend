import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import FormInput from "../components/FormInput";
import useGlobalState from "../global/GlobalSate";

const StyledProjectSetup = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  padding: 0 200px;
  height: 100%;
`;

const DEFAULT_FORM_RESPONSES = {
  WHAT_LONG_FORM: "WHAT_LONG_FORM",
  WHY_LONG_FORM: "WHY_LONG_FORM",
  HATTERS_LONG_FORM: "HATTERS_LONG_FORM",
  SACRIFICES_LONG_FORM: "SACRIFICES_LONG_FORM",
  JOURNEY_NAME: "JOURNEY_NAME",
};

// TOOD: SHIT THAT NEEDS DOING
// 1. ADD DISTILLED VERSION VIEWS WHY/HATTERS
// 2. HAVE MORE OF NAV HANDLED IN URL SO USER CAN GO DIRECT TO SPECIFIC FORM
// 3. ADD IN TIME USER WILL GIVE THEMSELVES TO COMPLETE PROJECT
// 4. SOME KIND OF PERMANENT SAVE BUTTON MAY BE NEEDED
const ProjectSetup = () => {
  const [formInView, setFormInView] = useState(
    DEFAULT_FORM_RESPONSES.WHAT_LONG_FORM
  );

  const {
    userResponseWhatLongForm,
    userResponseSacrificeLongForm,
    projectName,
    userResponseWhyLongForm,
    userResponseHattersLongForm,
    setUserResponseWhatLongForm,
    setProjectName,
    setUserResponseSacrificeLongForm,
    setUserResponseWhyLongForm,
    setUserResponseHattersLongForm,
  } = useGlobalState();

  const navigate = useNavigate();

  return (
    <StyledProjectSetup>
      {formInView === "WHAT_LONG_FORM" && (
        <FormInput
          title="What do you want to do? Please make it interesting..."
          description="Write fast and dirty straigh from the heart for at least 10 minutes, if that's too much effort then you are not serious about this, please quit"
          responseText={userResponseWhatLongForm}
          setResponseText={(text) => setUserResponseWhatLongForm(text)}
          continueAction={() =>
            setFormInView(DEFAULT_FORM_RESPONSES.WHY_LONG_FORM)
          }
        />
      )}
      {formInView === DEFAULT_FORM_RESPONSES.WHY_LONG_FORM && (
        <FormInput
          title="Why the fuck are you doing this?"
          description="Write fast and dirty straigh from the heart for at least 10 minutes, if that's too much effort then you are not serious about this, please quit"
          responseText={userResponseWhyLongForm}
          setResponseText={(text) => setUserResponseWhyLongForm(text)}
          continueAction={() =>
            setFormInView(DEFAULT_FORM_RESPONSES.HATTERS_LONG_FORM)
          }
        />
      )}
      {formInView === DEFAULT_FORM_RESPONSES.HATTERS_LONG_FORM && (
        <FormInput
          title="What will your internal bitch say?"
          description="Write fast and dirty straigh from the heart for at least 10 minutes, if that's too much effort then you are not serious about this, please quit"
          responseText={userResponseHattersLongForm}
          setResponseText={(text) => setUserResponseHattersLongForm(text)}
          continueAction={() =>
            setFormInView(DEFAULT_FORM_RESPONSES.SACRIFICES_LONG_FORM)
          }
        />
      )}
      {formInView === DEFAULT_FORM_RESPONSES.SACRIFICES_LONG_FORM && (
        <FormInput
          title="What sacrifces will be made? Is this actually worth it?"
          description="Write fast and dirty straigh from the heart for at least 10 minutes, if that's too much effort then you are not serious about this, please quit"
          responseText={userResponseSacrificeLongForm}
          setResponseText={(text) => setUserResponseSacrificeLongForm(text)}
          continueAction={() =>
            setFormInView(DEFAULT_FORM_RESPONSES.JOURNEY_NAME)
          }
        />
      )}
      {formInView === DEFAULT_FORM_RESPONSES.JOURNEY_NAME && (
        <FormInput
          title="Better come up with an inspring name"
          responseText={projectName}
          setResponseText={(text) => setProjectName(text)}
          continueAction={() => navigate("/my-project")}
        />
      )}
    </StyledProjectSetup>
  );
};

export default ProjectSetup;

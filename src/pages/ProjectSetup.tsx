import React, { useState } from "react";
import styled from "styled-components";

import FormInput from "../components/FormInput";

const StyledProjectSetup = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  padding: 0 200px;
  height: 100%;
`;

const DEFAULT_FORM_RESPONSES = {
  WHAT_LONG_FORM: "",
  WHY_LONG_FORM: "",
  HATTERS_LONG_FORM: "",
  SACRIFICES_LONG_FORM: "",
  JOURNEY_NAME: "",
};

const ProjectSetup = () => {
  const [allFormResponses, setAllFormResponses] = useState(
    DEFAULT_FORM_RESPONSES
  );

  const [formInView, setFormInView] = useState("WHAT_LONG_FORM");

  const onChange = (responseText: string, field: string) => {
    setAllFormResponses({ ...allFormResponses, [field]: responseText });
  };

  return (
    <StyledProjectSetup>
      {formInView === "WHAT_LONG_FORM" && (
        <FormInput
          title="What do you want to do? Please make it interesting..."
          description="Write fast and dirty straigh from the heart for at least 10 minutes, if that's too much effort then you are not serious about this, please quit"
          responseText={allFormResponses.WHAT_LONG_FORM}
          setResponseText={(text) => onChange(text, "WHAT_LONG_FORM")}
          continueAction={() => setFormInView("WHY_LONG_FORM")}
        />
      )}
      {formInView === "WHY_LONG_FORM" && (
        <FormInput
          title="Why the fuck are you doing this?"
          description="Write fast and dirty straigh from the heart for at least 10 minutes, if that's too much effort then you are not serious about this, please quit"
          responseText={allFormResponses.WHY_LONG_FORM}
          setResponseText={(text) => onChange(text, "WHY_LONG_FORM")}
          continueAction={() => setFormInView("HATTERS_LONG_FORM")}
        />
      )}
      {formInView === "HATTERS_LONG_FORM" && (
        <FormInput
          title="What will your internal bitch say?"
          description="Write fast and dirty straigh from the heart for at least 10 minutes, if that's too much effort then you are not serious about this, please quit"
          responseText={allFormResponses.HATTERS_LONG_FORM}
          setResponseText={(text) => onChange(text, "HATTERS_LONG_FORM")}
          continueAction={() => setFormInView("SACRIFICES_LONG_FORM")}
        />
      )}
      {formInView === "SACRIFICES_LONG_FORM" && (
        <FormInput
          title="What sacrifces will be made? Is this actually worth it?"
          description="Write fast and dirty straigh from the heart for at least 10 minutes, if that's too much effort then you are not serious about this, please quit"
          responseText={allFormResponses.SACRIFICES_LONG_FORM}
          setResponseText={(text) => onChange(text, "SACRIFICES_LONG_FORM")}
          continueAction={() => setFormInView("JOURNEY_NAME")}
        />
      )}
      {formInView === "JOURNEY_NAME" && (
        <FormInput
          title="Better come up with an inspring name"
          responseText={allFormResponses.JOURNEY_NAME}
          setResponseText={(text) => onChange(text, "JOURNEY_NAME")}
          continueAction={() => alert("we done")}
        />
      )}
    </StyledProjectSetup>
  );
};

export default ProjectSetup;

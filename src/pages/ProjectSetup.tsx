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

const ProjectSetup = () => {
  const [responseText, setResponseText] = useState("");
  return (
    <StyledProjectSetup>
      <FormInput
        title="Why the fuck are you doing this?"
        description="Write fast and dirty straigh from the heart for at least 10 minutes, if that's too much effort then you are not serious about this, please quit"
        responseText={responseText}
        setResponseText={setResponseText}
      />
    </StyledProjectSetup>
  );
};

export default ProjectSetup;

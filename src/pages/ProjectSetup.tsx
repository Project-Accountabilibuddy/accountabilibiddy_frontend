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
        title="What is the name of your project?"
        description="This is the name of your project. It will be used to identify your project in the future."
        responseText={responseText}
        setResponseText={setResponseText}
      />
    </StyledProjectSetup>
  );
};

export default ProjectSetup;

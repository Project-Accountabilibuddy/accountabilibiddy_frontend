import React from "react";
import styled from "styled-components";

const StyledLanding = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Landing = () => {
  return (
    <StyledLanding>
      <h1 className="heading-1">Welcome To Pain</h1>
      <h3 className="heading-3">
        The setup process for Accoutabilibuddy will take real effort and time.
        It’s designed that way to ensure you are serious about your chosen
        Project as it will take real effort and time. If you choose to utilize
        this tool realize that you are taking a huge first step though I don’t
        believe you will actually make it to the last one.
      </h3>
      <h3 className="heading-3">
        Just because it will take time does not mean you have to do it all in a
        single setting I recommend taking breaks in between questions to keep
        your brain from melting ~
      </h3>
    </StyledLanding>
  );
};

export default Landing;

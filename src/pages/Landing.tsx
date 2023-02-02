import React from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '../global/Constants'
import ProjectExampleImage from '../images/example_dashboard.png'

const StyledLanding = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 0 10%;
  height: 100%;
  justify-content: center;

  .top_section {
    margin-top: 60px;
    width: 100%;
    display: flex;
    justify-content: space-between;

    .top_left_section {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding-right: 34px;

      .welcome_text,
      .quote_text,
      .inspire_text {
        text-align: start;
        margin-bottom: 32px;

        .heading-3 {
          text-align: start;
        }
      }

      .begin_button {
        width: 200px;
      }
    }

    .top_right_section {
      img {
        margin-top: -12px;
        margin-right: -36px;
      }
    }
  }

  .body-2 {
    margin-bottom: 24px;
    text-align: start;
  }
`

const Landing = (): JSX.Element => {
  const navigate = useNavigate()

  return (
    <StyledLanding>
      <div className="top_section">
        <div className="top_left_section">
          <h1 className="heading-1 welcome_text">
            Welcome To A Struggle Worth Of You
          </h1>
          <div className="quote_text">
            <h2 className="heading-3">
              “He who has a why to live for can bear
            </h2>
            <h2 className="heading-3">
              almost any how.” - Friedrich Nietzsche
            </h2>
          </div>
          <h3 className="caption inspire_text">
            In today's “safe” society motivation rarely comes from external
            sources, it must come from within. Billibuddy can not motivate you.
            However, it might help you inspire yourself to achieve something you
            have always wanted to make happen.
          </h3>
          <Button
            className="begin_button"
            variant="outlined"
            onClick={() => {
              navigate(ROUTES.AUTH)
            }}
          >
            Begin Journey
          </Button>
        </div>
        <div className="top_right_section">
          <img src={ProjectExampleImage} alt="Dashboard Example" />
        </div>
      </div>
      <h3 className="body-2">
        The setup process for Bilibuddy will take real effort and time. It’s
        designed that way to ensure you are serious about your chosen Project as
        it will take real effort and time. If you choose to utilize this tool
        realize that you are taking a huge first step though I don’t believe you
        will actually make it to the last one.
      </h3>
      <h3 className="body-2">
        Just because it will take time does not mean you have to do it all in a
        single setting we recommend taking breaks in between questions to keep
        your brain from melting
      </h3>
      <h3 className="body-2">
        Billibuddy will help support users to achieve there aims. This is done
        through an initial sign up flow of long form writing along with the very
        important questions “how long will you give yourself to active this aim?
        Once the sign up flow is complete, users will be taken to their very own
        dashboard. Here they will be presented with constant reminders as to why
        they decided to take there chosen project on. There is also a daily
        check in feature to help hold users accountable to themselves.
      </h3>
    </StyledLanding>
  )
}

export default Landing

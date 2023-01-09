import React, { useState } from 'react'
import Button from '@mui/material/Button'
import styled from 'styled-components'
import { Auth } from 'aws-amplify'
import { useNavigate } from 'react-router-dom'

import useGlobalState from '../global/GlobalSate'

const StyledProject = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;

  .body-2 {
    text-align: start;
  }

  .top_nav_bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--height-top-bar);
    padding: 0 24px;
    background-color: var(--color-light-grey);
    border-bottom: 2px solid var(--color-secondary);

    .future_logo {
      width: 100%;
      position: absolute;
      left: 0;
    }
  }

  .section_group {
    height: calc(100vh - var(--height-top-bar));
    display: flex;

    .section_left,
    .section_middle,
    .section_right {
      padding: 24px;
      width: 100%;
      border: 2px solid var(--color-secondary);
      border-radius: 4px;
    }

    .section_left,
    .section_right {
      width: 50%;
    }

    .section_left {
      margin: 12px 6px 12px 12px;
    }

    .section_middle {
      display: flex;
      flex-direction: column;

      margin: 12px 6px 12px 6px;
      border: none;
      padding: 0;

      .section_middle_top,
      .section_weekly_form_fields,
      .section_weekly_feed {
        border: 2px solid var(--color-secondary);
        border-radius: 4px;
        margin-bottom: 12px;
        padding: 24px;
      }

      .section_middle_top {
        .fade_in_out_texts {
          color: var(--color-primary);
        }
      }

      .section_weekly_form_fields {
        .section_weekly_form {
          color: var(--color-white);
          background-color: var(--color-dark-grey);
          border-radius: 4px;
          border: none;
          outline: none;
          width: 100%;
          resize: none;
        }
      }

      .section_weekly_feed {
        margin-bottom: 0;
        height: 100%;
        overflow: scroll;

        .weeks_response {
          border-bottom: 2px solid var(--color-secondary);
          margin-bottom: 12px;
          padding: 12px;
        }
      }
    }

    .section_right {
      margin: 12px 12px 12px 6px;
    }
  }
`

const Project = (): JSX.Element => {
  const [inputWeeksGoals, setInputWeeksGoals] = useState('')
  const [inputLastWeeksReview, setInputLastWeeksReview] = useState('')

  const navigate = useNavigate()

  const {
    setWeekResponseFeed,
    projectName,
    userResponseWhyLongForm,
    userResponseHattersLongForm,
    weekResponseFeed,
    userResponseWhyShortForm,
    weeksExpectedToComplete
  } = useGlobalState()

  const handleSignOut = async (): Promise<any> => {
    await Auth.signOut()
      .then(() => {
        navigate('/')
      })
      .catch((error) => {
        console.log('error signing out: ', error)
      })
  }

  const handleSubmitWeekReview = (): void => {
    setWeekResponseFeed({
      weeksGoals: inputWeeksGoals,
      lastWeeksReview: inputLastWeeksReview
    })

    setInputLastWeeksReview('')
    setInputWeeksGoals('')
  }

  return (
    <StyledProject>
      <div className="top_nav_bar">
        <h1 className="heading-1">{projectName}</h1>
        <h1 className="heading-1 future_logo">Accountabilibuddy</h1>
        <Button
          onClick={() => {
            void handleSignOut()
          }}
        >
          Sign Out
        </Button>
      </div>
      <div className="section_group">
        <div className="section_left">
          <h3 className="body-2">{userResponseWhyLongForm}</h3>
        </div>
        <div className="section_middle">
          <div className="section_middle_top">
            <h2 className="body-1 fade_in_out_texts">{`${weeksExpectedToComplete}/10 Weeks Remaining`}</h2>
          </div>
          <div className="section_middle_top">
            <h2 className="body-1 fade_in_out_texts">
              {userResponseWhyShortForm}
            </h2>
          </div>
          <div className="section_weekly_form_fields">
            <h3 className="body-2">Last Week Review:</h3>
            <textarea
              className="section_weekly_form"
              value={inputLastWeeksReview}
              onChange={(e) => {
                setInputLastWeeksReview(e.target.value)
              }}
              rows={3}
            />
            <h3 className="body-2">This Weeks Goals:</h3>
            <textarea
              className="section_weekly_form"
              value={inputWeeksGoals}
              onChange={(e) => {
                setInputWeeksGoals(e.target.value)
              }}
              rows={3}
            />
            <Button onClick={handleSubmitWeekReview}>Submit</Button>
          </div>
          <div className="section_weekly_feed">
            {weekResponseFeed.map(({ weeksGoals, lastWeeksReview }, i) => {
              return (
                <div key={i} className="weeks_response">
                  <h6 className="body-2">{`Current weeks goals: ${weeksGoals}`}</h6>
                  <h6 className="body-2">{`Previou weeks review: ${lastWeeksReview}`}</h6>
                </div>
              )
            })}
          </div>
        </div>
        <div className="section_right">
          <h3 className="body-2">{userResponseHattersLongForm}</h3>
        </div>
      </div>
    </StyledProject>
  )
}

export default Project

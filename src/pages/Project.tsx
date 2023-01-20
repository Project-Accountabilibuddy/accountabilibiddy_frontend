import React, { useState } from 'react'
import Button from '@mui/material/Button'
import styled from 'styled-components'
import { Auth } from 'aws-amplify'
import { useNavigate } from 'react-router-dom'
import { Edit as EditIcon } from '@mui/icons-material'

import useGlobalState from '../global/GlobalSate'
import { DEFAULT_FORM_RESPONSES, ROUTES } from '../global/Constants'

const StyledProject = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;

  .body-2 {
    text-align: start;
    color: var(--color-light-grey);
  }

  .section_title {
    color: var(--color-white);
    text-align: start;
    margin-bottom: 12px;
    width: 100%;
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
    .section_right {
      width: 50%;
      margin: 12px 6px 12px 12px;
      display: flex;
      flex-direction: column;
    }

    .section_top_left,
    .section_bottom_left,
    .section_top_right,
    .section_bottom_right {
      display: flex;
      align-items: flex-end;
      flex-direction: column;
      position: relative;
      border: 2px solid var(--color-secondary);
      border-radius: 4px;
      margin-bottom: 12px;
      padding: 12px;
      height: 100%;
      overflow: scroll;
    }

    .section_bottom_left,
    .section_bottom_right {
      margin-bottom: 0;
    }

    .section_middle {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin: 12px 6px 12px 6px;

      .section_middle_top,
      .section_weekly_form_fields,
      .section_weekly_feed {
        border: 2px solid var(--color-secondary);
        border-radius: 4px;
        margin-bottom: 12px;
        padding: 12px;
      }

      .section_middle_top {
        position: relative;
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

  .edit_icon_middle {
    position: absolute;
    bottom: 12px;
    right: 12px;
  }

  .edit_icon {
    position: sticky;
    bottom: 0px;

    :hover {
      cursor: pointer;
    }
  }
`

const Project = (): JSX.Element => {
  const [inputWeeksGoals, setInputWeeksGoals] = useState('')
  const [inputLastWeeksReview, setInputLastWeeksReview] = useState('')

  const navigate = useNavigate()

  const {
    projectName,
    userResponseWhyLongForm,
    userResponseHattersLongForm,
    weekResponseFeed,
    userResponseWhyShortForm,
    weeksExpectedToComplete,
    userResponseHattersShortForm,
    userResponseWhatLongForm,
    userResponseSacrificeLongForm,
    setWeekResponseFeed,
    setInEditFormMode
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

  const handleEditField = (fieldToEdit: string): void => {
    setInEditFormMode(true)
    navigate(`${ROUTES.PROJECT_SETUP}/${fieldToEdit}`)
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
          <div className="section_top_left">
            <h2 className="body-1 section_title">What are you doing?</h2>
            <h3 className="body-2">{userResponseWhatLongForm}</h3>
            <EditIcon
              className="edit_icon"
              color="primary"
              onClick={() => {
                handleEditField(DEFAULT_FORM_RESPONSES.WHAT_LONG_FORM)
              }}
            />
          </div>
          <div className="section_bottom_left">
            <h2 className="body-1 section_title">Why are you doing this?</h2>
            <h3 className="body-2">{userResponseWhyLongForm}</h3>
            <EditIcon
              className="edit_icon"
              color="primary"
              onClick={() => {
                handleEditField(DEFAULT_FORM_RESPONSES.WHY_LONG_FORM)
              }}
            />
          </div>
        </div>
        <div className="section_middle">
          <div className="section_middle_top">
            <h2 className="body-1 fade_in_out_texts">{`${weeksExpectedToComplete}/10 Weeks Remaining`}</h2>
          </div>
          <div className="section_middle_top">
            <h2 className="body-1 fade_in_out_texts">
              {userResponseWhyShortForm}
            </h2>
            <EditIcon
              className="edit_icon_middle"
              color="primary"
              onClick={() => {
                handleEditField(DEFAULT_FORM_RESPONSES.WHY_SHORT_FORM)
              }}
            />
          </div>
          <div className="section_middle_top">
            <h2 className="body-1 fade_in_out_texts">
              {userResponseHattersShortForm}
            </h2>
            <EditIcon
              className="edit_icon_middle"
              color="primary"
              onClick={() => {
                handleEditField(DEFAULT_FORM_RESPONSES.HATTERS_SHORT_FORM)
              }}
            />
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
          <div className="section_top_right">
            <h2 className="body-1 section_title">
              What will your internal hater say?
            </h2>
            <h3 className="body-2">{userResponseHattersLongForm}</h3>
            <EditIcon
              onClick={() => {
                handleEditField(DEFAULT_FORM_RESPONSES.HATTERS_LONG_FORM)
              }}
              className="edit_icon"
              color="primary"
            />
          </div>
          <div className="section_bottom_right">
            <h2 className="body-1 section_title">What are you sacrificing?</h2>
            <h3 className="body-2">{userResponseSacrificeLongForm}</h3>
            <EditIcon
              onClick={() => {
                handleEditField(DEFAULT_FORM_RESPONSES.SACRIFICES_LONG_FORM)
              }}
              className="edit_icon"
              color="primary"
            />
          </div>
        </div>
      </div>
    </StyledProject>
  )
}

export default Project

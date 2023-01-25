import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import styled from 'styled-components'
import { Auth } from 'aws-amplify'
import { useNavigate } from 'react-router-dom'
import { Edit as EditIcon } from '@mui/icons-material'
import dayjs from 'dayjs'

import useGlobalState from '../global/GlobalSate'
import { SETUP_PROJECT_SCREENS, ROUTES } from '../global/Constants'
import DailyForm from '../components/DailyForm'

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
      .section_daily_form_fields,
      .section_daily_feed,
      .section_time {
        border: 2px solid var(--color-secondary);
        border-radius: 4px;
        margin-bottom: 12px;
        padding: 12px;
      }

      .section_middle_top {
        position: relative;
        height: 42px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .fade_in_out_text {
          color: var(--color-primary);
          padding: 0 12px;
        }

        .fade_edit {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          :hover {
            cursor: pointer;
          }
        }
      }

      .section_daily_feed {
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
  const navigate = useNavigate()

  const {
    projectName,
    userResponseWhyLongForm,
    userResponseHatersLongForm,
    daysResponseFeed,
    userResponseWhyShortForm,
    weeksExpectedToComplete,
    userResponseHatersShortForm,
    userResponseWhatLongForm,
    userResponseSacrificeLongForm,
    setInEditFormMode
  } = useGlobalState()

  const allShortResponses = [
    ...userResponseWhyShortForm,
    ...userResponseHatersShortForm
  ]
  const [shortResponseInView, setShortResponseInView] = useState(
    allShortResponses[0]
  )

  // HANDLES FADE IN/OUT OF SHORT RESPONSES
  useEffect(() => {
    const getRandomShortAnswer = (): string => {
      const randInt = Math.floor(Math.random() * allShortResponses.length)
      return allShortResponses[randInt]
    }

    setInterval(() => {
      setShortResponseInView('')
      setTimeout(() => {
        setShortResponseInView(getRandomShortAnswer())
      }, 100)
    }, 10000)
  }, [])

  const handleSignOut = async (): Promise<any> => {
    await Auth.signOut()
      .then(() => {
        navigate('/')
      })
      .catch((error) => {
        console.log('error signing out: ', error)
      })
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
                handleEditField(SETUP_PROJECT_SCREENS.WHAT_LONG_FORM)
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
                handleEditField(SETUP_PROJECT_SCREENS.WHY_LONG_FORM)
              }}
            />
          </div>
        </div>
        <div className="section_middle">
          <div className="section_time">
            <h2 className="body-1">{`${weeksExpectedToComplete}/10 Weeks Remaining`}</h2>
          </div>
          <div className="section_middle_top">
            <div
              className="fade_edit"
              onClick={() => {
                handleEditField(SETUP_PROJECT_SCREENS.HATERS_SHORT_FORM)
              }}
            >
              <EditIcon className="edit_icon" color="primary" />
              <h5 className="label">Haters</h5>
            </div>
            {shortResponseInView !== '' && (
              <h2 className="body-1 fade_in_out_text">{shortResponseInView}</h2>
            )}
            <div
              className="fade_edit"
              onClick={() => {
                handleEditField(SETUP_PROJECT_SCREENS.WHY_SHORT_FORM)
              }}
            >
              <EditIcon className="edit_icon" color="primary" />
              <h5 className="label">Why</h5>
            </div>
          </div>
          <DailyForm className="section_daily_form_fields" />
          <div className="section_daily_feed">
            {daysResponseFeed.map(
              (
                {
                  userResponseExcelYesterday,
                  userResponseFocusYesterday,
                  dateSubmitted
                },
                i
              ) => {
                return (
                  <div key={i} className="weeks_response">
                    <h5 className="body-2">{`Submitted ${dayjs(
                      dateSubmitted
                    ).format('ddd MMM D, ha')}`}</h5>
                    <h6 className="body-2">{`What is your focus today? ${userResponseFocusYesterday}`}</h6>
                    <h6 className="body-2">{`How did you excel yesterday? ${userResponseExcelYesterday}`}</h6>
                  </div>
                )
              }
            )}
          </div>
        </div>
        <div className="section_right">
          <div className="section_top_right">
            <h2 className="body-1 section_title">
              What will your internal hater say?
            </h2>
            <h3 className="body-2">{userResponseHatersLongForm}</h3>
            <EditIcon
              onClick={() => {
                handleEditField(SETUP_PROJECT_SCREENS.HATERS_LONG_FORM)
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
                handleEditField(SETUP_PROJECT_SCREENS.SACRIFICES_LONG_FORM)
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

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Auth } from 'aws-amplify'
import { useNavigate } from 'react-router-dom'
import { Edit as EditIcon } from '@mui/icons-material'
import dayjs from 'dayjs'

import useGlobalState from '../global/GlobalSate'
import { SETUP_PROJECT_SCREENS, ROUTES } from '../global/Constants'
import DailyForm from '../components/DailyForm'
import CheckInStatusSection from '../components/CheckInStatusSection'

const StyledProject = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;

  .caption {
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

    .sign_out_button {
      :hover {
        cursor: pointer;
        color: var(--color-primary);
      }
    }
  }

  .section_group {
    height: calc(100vh - var(--height-top-bar));
    padding: 0 100px;
    display: flex;

    .section_left,
    .section_right {
      width: 70%;
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
      border-radius: 6px;
      margin-bottom: 12px;
      padding: 12px;
      height: 100%;
      overflow: scroll;
      text-align: start;
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
      .section_daily_feed {
        border: 2px solid var(--color-secondary);
        border-radius: 6px;
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
          padding-bottom: 12px;

          .time_submitted {
            width: 100%;
            text-align: end;
          }
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
    userResponseWhyLongForm,
    userResponseHatersLongForm,
    daysResponseFeed,
    userResponseWhyShortForm,
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
        <h1 className="caption">Hello, Nick</h1>
        <h1 className="heading-2">BiliBuddy</h1>
        <h1
          className="caption sign_out_button"
          onClick={() => {
            void handleSignOut()
          }}
        >
          Sign Out
        </h1>
      </div>
      <div className="section_group">
        <div className="section_left">
          <CheckInStatusSection />
          <div className="section_top_left">
            <h2 className="heading-3 section_title">What are you doing?</h2>
            <h3 className="caption">{userResponseWhatLongForm}</h3>
            <EditIcon
              className="edit_icon"
              color="primary"
              onClick={() => {
                handleEditField(SETUP_PROJECT_SCREENS.WHAT_LONG_FORM)
              }}
            />
          </div>
          <div className="section_bottom_left">
            <h2 className="heading-3 section_title">Why are you doing this?</h2>
            <h3 className="caption">{userResponseWhyLongForm}</h3>
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
          <div className="section_middle_top">
            <div
              className="fade_edit"
              onClick={() => {
                handleEditField(SETUP_PROJECT_SCREENS.HATERS_SHORT_FORM)
              }}
            >
              <EditIcon className="edit_icon" color="primary" />
              <h5 className="caption">Haters</h5>
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
              <h5 className="caption">Why</h5>
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
                    <h5 className="caption time_submitted">
                      {dayjs(dateSubmitted).format('ddd MMM D')}
                    </h5>
                    <h6 className="caption">What is your focus today?</h6>
                    <h6 className="caption">{userResponseFocusYesterday}</h6>
                    <h6 className="caption">How did you excel yesterday?</h6>
                    <h6 className="caption">{userResponseExcelYesterday}</h6>
                  </div>
                )
              }
            )}
          </div>
        </div>
        <div className="section_right">
          <div className="section_top_right">
            <h2 className="heading-3 section_title">
              What will your internal hater say?
            </h2>
            <h3 className="caption">{userResponseHatersLongForm}</h3>
            <EditIcon
              onClick={() => {
                handleEditField(SETUP_PROJECT_SCREENS.HATERS_LONG_FORM)
              }}
              className="edit_icon"
              color="primary"
            />
          </div>
          <div className="section_bottom_right">
            <h2 className="heading-3 section_title">
              What are you sacrificing?
            </h2>
            <h3 className="caption">{userResponseSacrificeLongForm}</h3>
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

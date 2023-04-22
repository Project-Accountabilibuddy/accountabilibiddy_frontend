import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Edit as EditIcon } from '@mui/icons-material'
import dayjs from 'dayjs'
import cx from 'classnames'

import useGlobalState from '../global/GlobalSate'
import { SUB_ROUTES, ROUTES } from '../global/Types'
import DailyForm from '../components/DailyForm'
import CheckInStatusSection from '../components/CheckInStatusSection'
import TodoSection from '../components/TodoSection'
import TopNavBar from '../components/TopNavBar'

type ShortAnswer = {
  text: string
  type: 'HATE' | 'WHY'
}

const StyledProject = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;

  .caption {
    text-align: start;
    color: var(--color-white);
  }

  .section_title {
    color: var(--color-light-grey);
    text-align: start;
    margin-bottom: 12px;
    width: 100%;
  }

  .section_group {
    margin-top: var(--height-top-bar);
    height: calc(100vh - var(--height-top-bar));
    padding: 0 100px;
    display: flex;

    .section_left,
    .section_right {
      width: 70%;
      margin: 12px 6px 12px 12px;
      display: flex;
      flex-direction: column;
      padding-bottom: 36px;
    }

    .section_top_left,
    .section_bottom_left,
    .section_top_right,
    .section_bottom_right {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      position: relative;
      border: 1px solid var(--color-primary);
      border-radius: 2px;
      margin-bottom: 12px;
      padding: 12px;
      height: 100%;
      overflow: scroll;
      text-align: start;
      background-color: var(--color-black);

      .scroll_container {
        width: -webkit-fill-available;
        height: 100%;
        overflow: scroll;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
      }
    }

    .section_bottom_left,
    .section_bottom_right {
      margin-bottom: 0;
    }

    .section_middle_top,
    .section_top_left,
    .section_bottom_left,
    .section_top_right,
    .section_bottom_right,
    :before {
      background: rgba(0, 0, 0, 0.6);
    }

    .section_middle {
      z-index: 1;
      width: 100%;
      display: flex;
      flex-direction: column;
      margin: 12px 6px 12px 6px;
      padding-bottom: 36px;

      .section_middle_top,
      .section_daily_form_fields {
        border: 1px solid var(--color-primary);
        border-radius: 2px;
        margin-bottom: 12px;
        padding: 12px;
        background-color: var(--color-black);
      }

      .section_middle_top,
      .section_daily_form_fields,
      :before {
        background: rgba(0, 0, 0, 0.6);
      }

      .section_middle_top {
        height: 38px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        width: -webkit-fill-available;
        width: -moz-available;
        margin-right: 114px;

        .fade_in_out_text {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          color: var(--color-primary);
          margin-right: 34px;
        }

        .fade_in_out_text.hate_res {
          color: var(--color-red);
        }

        .fade_edit {
          position: absolute;
          bottom: 8px;
          right: 0px;

          :hover {
            cursor: pointer;
          }
        }
      }

      .section_middle_top.hate_res {
        border-color: var(--color-red);
      }

      .section_daily_feed {
        margin-bottom: 0;
        height: 100%;
        overflow: scroll;

        .weeks_response {
          border: 1px solid var(--color-primary);
          border-radius: 2px;
          padding: 12px;
          margin-bottom: 12px;
          background-color: var(--color-black);

          .time_submitted {
            width: 100%;
            text-align: end;
          }

          .response_title {
            color: var(--color-white);
          }

          .response_text {
            padding-bottom: 12px;
          }

          :last-child {
            margin-bottom: 0;
          }
        }

        .weeks_response,
        :before {
          background: rgba(0, 0, 0, 0.6);
        }
      }
    }

    .section_right {
      margin: 12px 12px 12px 6px;
      padding-top: 78px;
    }
  }

  .edit_icon_middle {
    position: absolute;
    bottom: 12px;
    right: 12px;
  }

  .edit_icon {
    position: absolute;
    bottom: 8px;
    right: 8px;

    :hover {
      cursor: pointer;
    }
  }
`

const Project = (): JSX.Element => {
  const navigate = useNavigate()

  const {
    userResponseWhyLongForm,
    // userResponseHatersLongForm,
    daysResponseFeed,
    userResponseWhyShortForm,
    userResponseHatersShortForm,
    userResponseWhatLongForm,
    userResponseSacrificeLongForm,
    setInEditFormMode
  } = useGlobalState()

  const allShortResponses: ShortAnswer[] = [
    ...userResponseWhyShortForm.map(
      (res): ShortAnswer => ({ text: res, type: 'WHY' })
    ),
    ...userResponseHatersShortForm.map(
      (res): ShortAnswer => ({ text: res, type: 'HATE' })
    )
  ]
  const [shortResponseInView, setShortResponseInView] = useState(
    allShortResponses[0]
  )

  // HANDLES FADE IN/OUT OF SHORT RESPONSES
  useEffect(() => {
    const getRandomShortAnswer = (): typeof shortResponseInView => {
      const randInt = Math.floor(Math.random() * allShortResponses.length)
      return allShortResponses[randInt]
    }

    setInterval(() => {
      setShortResponseInView({ text: '', type: shortResponseInView.type })
      setTimeout(() => {
        setShortResponseInView(getRandomShortAnswer())
      }, 100)
    }, 5000)
  }, [])

  const handleEditField = (fieldToEdit: string): void => {
    setInEditFormMode(true)
    navigate(`${ROUTES.PROJECT_SETUP}/${fieldToEdit}`)
  }

  return (
    <>
      <TopNavBar />
      <StyledProject>
        <div className="section_group">
          <div className="section_left">
            <CheckInStatusSection />
            <div className="section_top_left">
              <h2 className="heading-3 section_title">What are you doing?</h2>
              <div className="scroll_container">
                <h3 className="caption">{userResponseWhatLongForm}</h3>
              </div>
              <EditIcon
                className="edit_icon"
                color="primary"
                onClick={() => {
                  handleEditField(SUB_ROUTES.WHAT_LONG_FORM)
                }}
              />
            </div>
            <div className="section_bottom_left">
              <h2 className="heading-3 section_title">
                Why are you doing this?
              </h2>
              <div className="scroll_container">
                <h3 className="caption">{userResponseWhyLongForm}</h3>
              </div>
              <EditIcon
                className="edit_icon"
                color="primary"
                onClick={() => {
                  handleEditField(SUB_ROUTES.WHY_LONG_FORM)
                }}
              />
            </div>
          </div>
          <div className="section_middle">
            <div
              className={cx('section_middle_top', {
                hate_res: shortResponseInView.type === 'HATE'
              })}
            >
              {shortResponseInView.text !== '' && (
                <h2
                  className={cx('body-1 fade_in_out_text', {
                    hate_res: shortResponseInView.type === 'HATE'
                  })}
                >
                  {shortResponseInView.text}
                </h2>
              )}
              <div
                className="fade_edit"
                onClick={() => {
                  if (shortResponseInView.type === 'WHY') {
                    handleEditField(SUB_ROUTES.WHY_SHORT_FORM)
                  } else {
                    handleEditField(SUB_ROUTES.HATERS_SHORT_FORM)
                  }
                }}
              >
                <EditIcon
                  className="edit_icon"
                  color={
                    shortResponseInView.type === 'WHY' ? 'primary' : 'error'
                  }
                />
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
                        {dayjs(dateSubmitted).format('ddd, MMM D')}
                      </h5>
                      <h6 className="caption response_title">
                        What is your focus today?
                      </h6>
                      <h6 className="caption response_text">
                        {userResponseFocusYesterday}
                      </h6>
                      {userResponseExcelYesterday !== '' && (
                        <>
                          <h6 className="caption response_title">
                            How did you excel yesterday?
                          </h6>
                          <h6 className="caption response_text">
                            {userResponseExcelYesterday}
                          </h6>
                        </>
                      )}
                    </div>
                  )
                }
              )}
            </div>
          </div>
          <div className="section_right">
            {/* <div className="section_top_right">
              <h2 className="heading-3 section_title">
                What will your internal hater say?
              </h2>
              <div className="scroll_container">
                <h3 className="caption">{userResponseHatersLongForm}</h3>
              </div>
              <EditIcon
                onClick={() => {
                  handleEditField(SETUP_PROJECT_SCREENS.HATERS_LONG_FORM)
                }}
                className="edit_icon"
                color="primary"
              />
            </div> */}
            <TodoSection className="section_top_right" />
            <div className="section_bottom_right">
              <h2 className="heading-3 section_title">
                What are you sacrificing?
              </h2>
              <div className="scroll_container">
                <h3 className="caption">{userResponseSacrificeLongForm}</h3>
              </div>
              <EditIcon
                onClick={() => {
                  handleEditField(SUB_ROUTES.SACRIFICES_LONG_FORM)
                }}
                className="edit_icon"
                color="primary"
              />
            </div>
          </div>
        </div>
      </StyledProject>
    </>
  )
}

export default Project

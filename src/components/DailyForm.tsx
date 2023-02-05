import React, { useState } from 'react'
import styled from 'styled-components'
import cx from 'classnames'
import dayjs from 'dayjs'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

import useGlobalState from '../global/GlobalSate'
import useBackEndMethods from '../hooks/useBackEndMethods'
import Button from '../components/Button'

interface DailyFormProps {
  className: string
}

const StyledDailyForm = styled.div`
  margin-top: 78px;

  .form_content {
    height: 160px;
    transition: height 1s ease-in-out;
    position: relative;
    display: flex;
    flex-direction: column;

    .heading {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;

      .checked_in {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        svg {
          margin-right: 8px;
        }
      }

      .heading-3 {
        text-align: start;
      }
    }

    .question_title {
      color: var(--color-light-grey);
    }

    .form_input_field {
      color: var(--color-white);
      background: none;
      border-radius: 4px;
      border: none;
      outline: none;
      width: 100%;
      resize: none;
    }

    .submit_button {
      width: 100%;
      margin-top: 12px;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }

  .form_content.form_focused {
    height: 272px;
  }

  .form_content.close_daily_form {
    height: 28px;

    .form_input_field,
    .question_title,
    .submit_button {
      display: none;
    }
  }
`

const DailyForm = ({ className }: DailyFormProps): JSX.Element => {
  const [inputExcelYesterday, setinputExcelYesterday] = useState('')
  const [inputFocusToday, setInputFocusToday] = useState('')
  const [focusedOnForm, setFocusedOnForm] = useState(false)

  const { daysResponseFeed, setDaysResponse, projectName } = useGlobalState()
  const { handleUpdateProject } = useBackEndMethods()

  const handleSubmitWeekReview = (): void => {
    const daysResponse = {
      userResponseExcelYesterday: inputExcelYesterday,
      userResponseFocusYesterday: inputFocusToday,
      dateSubmitted: dayjs()
    }

    setDaysResponse(daysResponse)
    handleUpdateProject({
      daysResponseFeed: JSON.stringify([daysResponse, ...daysResponseFeed])
    }).finally(() => {
      console.log('update complete')
    })

    setInputFocusToday('')
    setinputExcelYesterday('')
  }

  const formHasBeenFilledOutToday = daysResponseFeed.some((response) => {
    return dayjs().isSame(response.dateSubmitted, 'day')
  })

  return (
    <StyledDailyForm
      className={className}
      onClick={() => {
        setFocusedOnForm(true)
      }}
    >
      <div
        className={cx('form_content', {
          close_daily_form: formHasBeenFilledOutToday,
          form_focused: focusedOnForm
        })}
      >
        <div className="heading">
          {!formHasBeenFilledOutToday && (
            <h2 className="heading-3">Check-in today</h2>
          )}
          {formHasBeenFilledOutToday && (
            <div className="checked_in">
              <CheckCircleIcon color="primary" />
              <h2 className="heading-3">
                {daysResponseFeed.length === 1
                  ? 'Do this again tomorrow'
                  : 'Checked in today... Nice'}
              </h2>
            </div>
          )}
          <h3 className="caption">{dayjs().format('ddd, MMM D')}</h3>
        </div>
        <h3 className="caption question_title">What is your focus today?*</h3>
        <textarea
          className="form_input_field"
          placeholder={
            daysResponseFeed.length !== 0
              ? ''
              : `Complete the setup proccess for ${projectName} `
          }
          value={inputFocusToday}
          disabled={formHasBeenFilledOutToday}
          onChange={(e) => {
            setInputFocusToday(e.target.value)
          }}
          rows={4}
        />
        {daysResponseFeed.length !== 0 && focusedOnForm && (
          <>
            <h3 className="caption question_title">
              How did you excel yesterday?*
            </h3>
            <textarea
              disabled={formHasBeenFilledOutToday}
              className="form_input_field"
              value={inputExcelYesterday}
              onChange={(e) => {
                setinputExcelYesterday(e.target.value)
              }}
              rows={4}
            />
          </>
        )}
        <Button
          className="submit_button"
          variant="outlined"
          onClick={handleSubmitWeekReview}
          disabled={inputFocusToday === ''}
          text="Submit"
        />
      </div>
    </StyledDailyForm>
  )
}

export default DailyForm

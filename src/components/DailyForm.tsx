import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button'
import cx from 'classnames'
import dayjs from 'dayjs'

import useGlobalState from '../global/GlobalSate'
import useBackEndMethods from '../hooks/useBackEndMethods'

interface DailyFormProps {
  className: string
}

const StyledDailyForm = styled.div`
  margin-top: 80px;

  .form_content {
    height: 272px;
    transition: height 2s ease-in-out;

    .heading {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;

      .heading-3 {
        text-align: start;
      }
    }

    .form_input_field {
      color: var(--color-white);
      background-color: var(--color-background);
      border-radius: 4px;
      border: none;
      outline: none;
      width: 100%;
      resize: none;
    }

    .submit_button {
      width: 100%;
      margin-top: 12px;
    }
  }

  .form_content.formnotavailable {
    height: 28px;

    .form_input_field,
    .question_title,
    button {
      display: none;
    }
  }
`

const DailyForm = ({ className }: DailyFormProps): JSX.Element => {
  const [inputExcelYesterday, setinputExcelYesterday] = useState('')
  const [inputFocusToday, setInputFocusToday] = useState('')

  const { daysResponseFeed, setDaysResponse } = useGlobalState()
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
    })

    setInputFocusToday('')
    setinputExcelYesterday('')
  }

  const formHasBeenFilledOutToday = daysResponseFeed.some((response) => {
    return dayjs().isSame(response.dateSubmitted, 'day')
  })

  return (
    <StyledDailyForm className={className}>
      <div
        className={cx('form_content', {
          formnotavailable: formHasBeenFilledOutToday
        })}
      >
        <div className="heading">
          {!formHasBeenFilledOutToday && (
            <h2 className="heading-3">Check-in today</h2>
          )}
          {formHasBeenFilledOutToday && (
            <h2 className="heading-3">Checked in today... Nice</h2>
          )}
          <h3 className="caption">{dayjs().format('ddd MMM D')}</h3>
        </div>
        <h3 className="caption question_title">What is your focus today?</h3>
        <textarea
          className="form_input_field"
          value={inputFocusToday}
          disabled={formHasBeenFilledOutToday}
          onChange={(e) => {
            setInputFocusToday(e.target.value)
          }}
          rows={4}
        />
        <h3 className="caption question_title">How did you excel yesterday?</h3>
        <textarea
          disabled={formHasBeenFilledOutToday}
          className="form_input_field"
          value={inputExcelYesterday}
          onChange={(e) => {
            setinputExcelYesterday(e.target.value)
          }}
          rows={4}
        />
        <Button
          className="submit_button"
          variant="outlined"
          onClick={handleSubmitWeekReview}
        >
          Submit
        </Button>
      </div>
    </StyledDailyForm>
  )
}

export default DailyForm

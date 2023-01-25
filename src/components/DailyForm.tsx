import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button'
import cx from 'classnames'
import dayjs from 'dayjs'

import useGlobalState from '../global/GlobalSate'

interface DailyFormProps {
  className: string
}

const StyledDailyForm = styled.div`
  .form_content {
    height: 200px;
    transition: height 2s ease-in-out;
  }

  .form_content.formnotavailable {
    height: 0px;

    .form_input_field,
    h3,
    button {
      display: none;
    }
  }

  .form_input_field {
    color: var(--color-white);
    background-color: var(--color-dark-grey);
    border-radius: 4px;
    border: none;
    outline: none;
    width: 100%;
    resize: none;
  }
`

const DailyForm = ({ className }: DailyFormProps): JSX.Element => {
  const [inputExcelYesterday, setinputExcelYesterday] = useState('')
  const [inputFocusToday, setInputFocusToday] = useState('')

  const { daysResponseFeed, setDaysResponseFeed } = useGlobalState()

  const handleSubmitWeekReview = (): void => {
    setDaysResponseFeed({
      userResponseExcelYesterday: inputExcelYesterday,
      userResponseFocusYesterday: inputFocusToday,
      dateSubmitted: dayjs()
    })

    setInputFocusToday('')
    setinputExcelYesterday('')
  }

  const formHasBeenFilledOutToday = daysResponseFeed.some((response) => {
    // TODO: CHANGE TO 'day' ONCE TESTING OF DAILY FORM IS COMPLETE
    return dayjs().isSame(response.dateSubmitted, 'minute')
  })

  return (
    <StyledDailyForm className={className}>
      <div
        className={cx('form_content', {
          formnotavailable: formHasBeenFilledOutToday
        })}
      >
        <h3 className="body-2">What is your focus today?</h3>
        <textarea
          className="form_input_field"
          value={inputFocusToday}
          disabled={formHasBeenFilledOutToday}
          onChange={(e) => {
            setInputFocusToday(e.target.value)
          }}
          rows={3}
        />
        <h3 className="body-2">How did you excel yesterday?</h3>
        <textarea
          disabled={formHasBeenFilledOutToday}
          className="form_input_field"
          value={inputExcelYesterday}
          onChange={(e) => {
            setinputExcelYesterday(e.target.value)
          }}
          rows={3}
        />
        <Button onClick={handleSubmitWeekReview}>Submit</Button>
      </div>
    </StyledDailyForm>
  )
}

export default DailyForm

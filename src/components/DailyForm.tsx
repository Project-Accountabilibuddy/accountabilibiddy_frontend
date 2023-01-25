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
  .form_input_field {
    color: var(--color-white);
    background-color: var(--color-dark-grey);
    border-radius: 4px;
    border: none;
    outline: none;
    width: 100%;
    resize: none;
  }

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
`

const DailyForm = ({ className }: DailyFormProps): JSX.Element => {
  const [inputWeeksGoals, setInputWeeksGoals] = useState('')
  const [inputLastWeeksReview, setInputLastWeeksReview] = useState('')

  const { daysResponseFeed, setDaysResponseFeed } = useGlobalState()

  const handleSubmitWeekReview = (): void => {
    setDaysResponseFeed({
      weeksGoals: inputWeeksGoals,
      lastWeeksReview: inputLastWeeksReview,
      dateSubmitted: dayjs()
    })

    setInputLastWeeksReview('')
    setInputWeeksGoals('')
  }

  const mostRecentResponseTime = daysResponseFeed[0]?.dateSubmitted

  const formFilledOutthisMinute =
    dayjs().isSame(mostRecentResponseTime, 'minutes') &&
    daysResponseFeed.length > 0

  return (
    <StyledDailyForm className={className}>
      <div
        className={cx('form_content', {
          formnotavailable: formFilledOutthisMinute
        })}
      >
        <h3 className="body-2">Last Week Review:</h3>
        <textarea
          className="form_input_field"
          value={inputLastWeeksReview}
          disabled={formFilledOutthisMinute}
          onChange={(e) => {
            setInputLastWeeksReview(e.target.value)
          }}
          rows={3}
        />
        <h3 className="body-2">This Weeks Goals:</h3>
        <textarea
          disabled={formFilledOutthisMinute}
          className="form_input_field"
          value={inputWeeksGoals}
          onChange={(e) => {
            setInputWeeksGoals(e.target.value)
          }}
          rows={3}
        />
        <Button onClick={handleSubmitWeekReview}>Submit</Button>
      </div>
    </StyledDailyForm>
  )
}

export default DailyForm

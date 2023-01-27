import React, { useState } from 'react'
import styled from 'styled-components'
import cx from 'classnames'
import dayjs from 'dayjs'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'

import useGlobalState from '../global/GlobalSate'

const StyledCheckInStatus = styled.div`
  border: 2px solid var(--color-secondary);
  border-radius: 4px;
  margin-bottom: 12px;
  padding: 8px;
  position: relative;

  .form_content {
    height: 38px;
    transition: height 1s ease-in-out;
    padding-right: 24px;

    .current_week_check_in {
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: space-between;
      align-items: center;

      .day_check {
        display: flex;
        flex-direction: column;

        .caption {
          font-size: 12px;
          line-height: 14px;
          color: var(--color-light-grey);
          margin: 0;
        }

        .empty_circle {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 2px solid var(--color-primary);
        }
      }
    }

    .open_close_arrow {
      cursor: pointer;
      transition: transform 1s ease-in-out;
      transform: rotate(0deg);
      position: absolute;
      right: 4px;
      top: 16px;
    }

    .pointarrowup.open_close_arrow {
      transform: rotate(180deg);
    }
  }

  .form_content.checkinstatusopen {
    height: 300px;
  }
`

const CheckInStatus = (): JSX.Element => {
  const [checkInStatusSectionOpen, setCheckInStatusSectionOpen] =
    useState(false)

  const { daysResponseFeed, weeksExpectedToComplete } = useGlobalState()

  const buildCheckInStatus = () => {
    // TODO: 1. store the start date of the project on creation (right now that's the start)
    // TODO: 2. build entire check status object with date stamps based on start date
    // TODO: 3. map back over check status array updating status based on days response feed (true, false)
    // TODO: 4. stop updating the check status once todays date is reached (undefined)

    // TODO: EDGE CASE: user does not start on monday.... keep them undefined for first pass

    const dummyWeek = {
      currentWeek: true,
      days: [
        { day: 'mon', checkedIn: undefined },
        { day: 'tue', checkedIn: undefined },
        { day: 'wed', checkedIn: undefined },
        { day: 'thu', checkedIn: undefined },
        { day: 'fri', checkedIn: undefined },
        { day: 'sat', checkedIn: undefined },
        { day: 'sun', checkedIn: undefined }
      ]
    }

    const allWeeks = [dummyWeek]

    return allWeeks
  }

  return (
    <StyledCheckInStatus>
      <div
        className={cx('form_content', {
          checkinstatusopen: checkInStatusSectionOpen
        })}
      >
        <div className="current_week_check_in">
          {buildCheckInStatus()[0].days.map(({ day, checkedIn }, i) => {
            return (
              <div className="day_check" key={i}>
                <div className="caption">{day}</div>
                {checkedIn === true && <CheckCircleIcon color="primary" />}
                {checkedIn === false && <CancelIcon />}
                {checkedIn === undefined && <div className="empty_circle" />}
              </div>
            )
          })}
          <h3 className="body-1">1/8</h3>
        </div>

        <KeyboardArrowDownIcon
          className={cx('open_close_arrow', {
            pointarrowup: checkInStatusSectionOpen
          })}
          color="primary"
          onClick={() => {
            setCheckInStatusSectionOpen(!checkInStatusSectionOpen)
          }}
        />
      </div>
    </StyledCheckInStatus>
  )
}

export default CheckInStatus

import React, { useState } from 'react'
import styled from 'styled-components'
import cx from 'classnames'
import dayjs from 'dayjs'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'

import useGlobalState from '../global/GlobalSate'

const StyledCheckInStatus = styled.div<{
  checinsectionopenheight: number
}>`
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
      display: none;
      flex-direction: row;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;

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

    .showweek.current_week_check_in {
      display: flex;
      animation: fadein 3s;
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
    height: ${(props) => props.checinsectionopenheight}px;
  }
`

const CheckInStatus = (): JSX.Element => {
  const [checkInStatusSectionOpen, setCheckInStatusSectionOpen] =
    useState(false)

  const { daysResponseFeed, weeksExpectedToComplete, projectStartDate } =
    useGlobalState()

  const buildCheckInStatus = () => {
    // TODO: 1. store the start date of the project on creation (right now that's the start)
    // TODO: 2. build entire check status object with date stamps based on start date
    // TODO: 3. map back over check status array updating status based on days response feed (true, false)
    // TODO: 4. stop updating the check status once todays date is reached (undefined)

    // TODO: EDGE CASE: user does not start on monday.... keep them undefined for first pass

    const allWeeks = []

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

    for (let i = 0; i < Number(weeksExpectedToComplete); i++) {
      allWeeks.push(dummyWeek)
    }

    console.log('allWeeks', allWeeks)

    return allWeeks
  }

  return (
    <StyledCheckInStatus
      checinsectionopenheight={40 * Number(weeksExpectedToComplete)}
    >
      <div
        className={cx('form_content', {
          checkinstatusopen: checkInStatusSectionOpen
        })}
      >
        {buildCheckInStatus().map((week, k) => {
          return (
            <div
              key={k}
              className={cx('current_week_check_in', {
                showweek: checkInStatusSectionOpen || k === 0
              })}
            >
              {week.days.map(({ day, checkedIn }, i) => {
                return (
                  <div className="day_check" key={i}>
                    <div className="caption">{day}</div>
                    {checkedIn === true && <CheckCircleIcon color="primary" />}
                    {checkedIn === false && <CancelIcon />}
                    {checkedIn === undefined && (
                      <div className="empty_circle" />
                    )}
                  </div>
                )
              })}
              <h3 className="body-1">{`${
                k + 1
              }/${weeksExpectedToComplete}`}</h3>
            </div>
          )
        })}
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

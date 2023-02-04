import React, { useState } from 'react'
import styled from 'styled-components'
import cx from 'classnames'
import dayjs from 'dayjs'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'

import useGlobalState from '../global/GlobalSate'

interface checkInDays {
  day: dayjs.Dayjs
  checkedIn: string
}

interface CompleteWeek {
  currentWeek: boolean
  days: checkInDays[]
}

const StyledCheckInStatus = styled.div<{
  checinsectionopenheight: number
}>`
  border: 1px solid var(--color-primary);
  border-radius: 2px;
  margin-bottom: 12px;
  padding: 12px;
  position: relative;
  background-color: var(--color-black);

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
        align-items: center;

        .caption {
          font-size: 12px;
          line-height: 14px;
          color: var(--color-light-grey);
          margin-bottom: 2px;
        }

        .empty_circle {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 2px solid var(--color-primary);
        }

        .hidden_circle {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 2px solid var(--color-primary);
          opacity: 0;
        }
      }

      .week_label_text {
        width: 90px;
        text-align: end;
      }

      .wks_text {
        color: var(--color-white);
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

  const buildCheckInStatus = (): CompleteWeek[] => {
    const allWeeks = []

    const allCheckInDates = daysResponseFeed.map((day) => {
      return day.dateSubmitted
    })

    // BUILD ALL WEEKS BASED ON WEEKS EXPECTED TO COMPLETE
    for (let week = 0; week < Number(weeksExpectedToComplete); week++) {
      const completeWeek: CompleteWeek = {
        currentWeek: dayjs(projectStartDate)
          .add(week, 'week')
          .isSame(dayjs(), 'week'),
        days: []
      }

      const sundayOfStartWeek = dayjs(projectStartDate).startOf('week')

      // BUILD ALL DAYS FOR EACH WEEK ADDING CHECK IN STATUS
      for (let day = 0; day < 7; day++) {
        let checkedIn = 'UP_COMMING'

        const daysDate = dayjs(sundayOfStartWeek)
          .add(week, 'week')
          .add(day, 'day')

        // CHECK IF DAY IS BEFORE TODAY AND AFTER PROJECT START DATE
        if (
          dayjs(daysDate).isBefore(dayjs().add(1, 'day'), 'day') &&
          dayjs(daysDate).isAfter(
            dayjs(projectStartDate).subtract(1, 'day'),
            'day'
          )
        ) {
          // IF DAY IS TODAY IT SHOULD NOT DEFAULT TO "NOT" CHECKED IN
          if (!dayjs(daysDate).isSame(dayjs(), 'day')) {
            checkedIn = 'SKIPPED'
          }

          // CHECK IF DAY IS IN CHECK IN DATES
          allCheckInDates.forEach((checkInDate) => {
            if (dayjs(checkInDate).isSame(daysDate, 'day')) {
              checkedIn = 'DONE'
            }
          })
        }

        if (dayjs(daysDate.add(1, 'day')).isBefore(dayjs(projectStartDate))) {
          checkedIn = 'PRE_DATE'
        }

        completeWeek.days.push({ day: daysDate, checkedIn })
        checkedIn = 'UP_COMMING'
      }

      allWeeks.push(completeWeek)
    }

    return allWeeks
  }

  //   console.log('BUILD CHECK IN STATUS: ', buildCheckInStatus())

  return (
    <StyledCheckInStatus
      checinsectionopenheight={42 * Number(weeksExpectedToComplete)}
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
                    <div className="caption">{dayjs(day).format('dd')}</div>
                    {checkedIn === 'DONE' && (
                      <CheckCircleIcon color="primary" />
                    )}
                    {checkedIn === 'SKIPPED' && <CancelIcon />}
                    {checkedIn === 'UP_COMMING' && (
                      <div className="empty_circle" />
                    )}
                    {checkedIn === 'PRE_DATE' && (
                      <div className="hidden_circle" />
                    )}
                  </div>
                )
              })}
              <h3 className="body-1 week_label_text">
                {`${k + 1}/${weeksExpectedToComplete}`}
                <span className="caption wks_text"> wks</span>
              </h3>
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

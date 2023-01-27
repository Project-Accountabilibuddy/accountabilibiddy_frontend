import React, { useState } from 'react'
import styled from 'styled-components'
import cx from 'classnames'
import dayjs from 'dayjs'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import useGlobalState from '../global/GlobalSate'

const StyledCheckInStatus = styled.div`
  border: 2px solid var(--color-secondary);
  border-radius: 4px;
  margin-bottom: 12px;
  padding: 12px;
  position: relative;

  .form_content {
    height: 30px;
    transition: height 1s ease-in-out;

    .open_close_arrow {
      cursor: pointer;
      transition: transform 1s ease-in-out;
      transform: rotate(0deg);
      position: absolute;
      right: 4px;
      top: 12px;
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

  const { daysResponseFeed } = useGlobalState()

  return (
    <StyledCheckInStatus>
      <div
        className={cx('form_content', {
          checkinstatusopen: checkInStatusSectionOpen
        })}
      >
        <h3 className="body-2">Check In Status</h3>
        <h3 className="body-2">Check In Status</h3>
        <h3 className="body-2">Check In Status</h3>
        <h3 className="body-2">Check In Status</h3>
        <h3 className="body-2">Check In Status</h3>
        <h3 className="body-2">Check In Status</h3>

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

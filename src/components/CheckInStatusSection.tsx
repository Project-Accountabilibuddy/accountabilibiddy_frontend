import React, { useState } from 'react'
import styled from 'styled-components'
import cx from 'classnames'
import dayjs from 'dayjs'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import useGlobalState from '../global/GlobalSate'

interface CheckInStatusProps {
  className: string
}

const StyledCheckInStatus = styled.div`
  .form_content {
    height: 200px;
    transition: height 1s ease-in-out;

    .open_close_arrow {
      cursor: pointer;
      transition: transform 1s ease-in-out;
      transform: rotate(180deg);
    }

    .pointarrowup.open_close_arrow {
      transform: rotate(0deg);
    }
  }

  .form_content.checkinstatusopen {
    height: 50px;
  }
`

const CheckInStatus = ({ className }: CheckInStatusProps): JSX.Element => {
  const [checkInStatusSectionOpen, setCheckInStatusSectionOpen] =
    useState(false)

  const { daysResponseFeed } = useGlobalState()

  return (
    <StyledCheckInStatus className={className}>
      <div
        className={cx('form_content', {
          checkinstatusopen: checkInStatusSectionOpen
        })}
      >
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

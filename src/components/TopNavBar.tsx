import React from 'react'
import styled from 'styled-components'
import { Auth } from 'aws-amplify'
import { useNavigate } from 'react-router-dom'

import useGlobalState from '../global/GlobalSate'
import LogoBig from '../icons/LogoBig'

const StyledTopNavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--height-top-bar);
  padding: 0 24px;
  position: fixed;
  width: 100vw;
  top: 0;
  z-index: 1;

  .project_name {
    padding-left: 24px;
  }

  .project_logo {
    position: absolute;
    width: 100%;
    text-align: center;
  }

  .sign_out_button {
    z-index: 1;
    color: var(--color-white);
    padding-right: 24px;

    :hover {
      cursor: pointer;
      color: var(--color-primary);
    }
  }
`

const TopNavBar = (): JSX.Element => {
  const navigate = useNavigate()

  const { projectName } = useGlobalState()

  const handleSignOut = async (): Promise<any> => {
    try {
      await Auth.signOut()
      navigate('/')
    } catch (error) {
      console.log('error signing out: ', error)
    }
  }

  return (
    <StyledTopNavBar>
      <h2 className="caption project_name">{projectName}</h2>
      <LogoBig className="project_logo" />
      <h2
        className="caption sign_out_button"
        onClick={() => {
          void handleSignOut()
        }}
      >
        Sign Out
      </h2>
    </StyledTopNavBar>
  )
}

export default TopNavBar

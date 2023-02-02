import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button'
import cx from 'classnames'
import CloseIcon from '@mui/icons-material/Close'

import useGlobalState from '../global/GlobalSate'

interface FormInputProps {
  type: 'TEXT' | 'NUMBER' | 'MULTIPLE_TEXT'
  title: string
  step: string
  description?: string
  responseText?: string
  groupResponses?: string[]
  responseNumber?: number
  setResponseText?: (responseText: string) => void
  setGroupResponse?: (responseText: string, index: number) => void
  continueAction: () => void
  backAction?: (() => void) | null
  updateNumberOfGroupResponses?: (removeOrAdd: 'ADD' | 'REMOVE') => void
  setResponseNumber?: (responseNumber: number) => void
}

const StyledFormInput = styled.div`
  display: flex;
  flex-direction: column;

  .heading-1,
  .heading-2 {
    margin-bottom: 24px;
  }

  .heading-1 {
    color: var(--color-primary);
  }

  .heading-2 {
    color: var(--color-light-grey);
  }

  button {
    margin-top: 120px;
    width: 400px;
  }

  textarea {
    color: var(--color-white);
    background-color: var(--color-light-background);
    border: none;
    outline: none;
    resize: none;
    margin-bottom: 24px;
    padding: 8px;
    border-radius: 4px;
    caret-color: var(--color-primary);
  }

  .week_options {
    display: flex;
    justify-content: space-between;

    .week_option {
      display: flex;
      align-items: center;
      juect-content: center;
      padding: 24px;
      border: 2px solid var(--color-light-grey);
      color: var(--color-white);
      border-radius: 4px;

      :hover {
        border: 2px solid var(--color-primary);
        cursor: pointer;
      }
    }

    .selected {
      border: 2px solid var(--color-primary);
    }
  }

  .body-1 {
    margin-bottom: 24px;
  }

  .group_responses {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .input_group {
      width: 100%;
      display: flex;
      justify-content: space-between;
      position: relative;

      .single_row_textarea {
        width: 100%;
        height: auto;
        border-bottom: 2px solid var(--color-primary);
        border-radius: 0;
        margin-right: 40px;
      }

      svg {
        margin-left: 24px;
        position: absolute;
        right: 0;

        :hover {
          cursor: pointer;
        }
      }
    }

    .add_more_button {
      margin-top: 24px;
      width: 200px;
    }
  }

  .nav_buttons {
    display: flex;
    width: 100%;
    justify-content: center;
  }
`

const FormInput = ({
  type,
  title,
  step,
  description,
  responseText = '',
  groupResponses = [],
  responseNumber,
  setResponseText = () => {},
  setGroupResponse = () => {},
  continueAction,
  backAction = null,
  updateNumberOfGroupResponses = () => {},
  setResponseNumber = () => {}
}: FormInputProps): JSX.Element => {
  const ref = useRef<HTMLTextAreaElement>(null)

  const { inEditFormMode } = useGlobalState()

  useEffect(() => {
    if (ref?.current != null) {
      ref?.current?.focus()
    }
  }, [])

  return (
    <StyledFormInput>
      {!inEditFormMode && <h1 className="body-1">{step}</h1>}
      <h1 className="heading-1">{title}</h1>
      {Boolean(description) && <h3 className="heading-2">{description}</h3>}
      {type === 'TEXT' && (
        <textarea
          ref={ref}
          name="text"
          rows={14}
          cols={10}
          wrap="soft"
          value={responseText}
          onChange={(e) => {
            setResponseText(e.target.value)
          }}
          disabled={groupResponses.length > 0}
        />
      )}
      {type === 'NUMBER' && (
        <div className="week_options">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((weekOption, index) => {
            return (
              <div
                onClick={() => {
                  setResponseNumber(weekOption)
                }}
                className={cx('week_option body-2', {
                  selected: weekOption === responseNumber
                })}
                key={index}
              >
                {weekOption}
              </div>
            )
          })}
        </div>
      )}
      {type === 'MULTIPLE_TEXT' && (
        <>
          <h4 className="body-1">{responseText}</h4>
          <div className="group_responses">
            {groupResponses?.map((response, index) => {
              return (
                <div className="input_group" key={index}>
                  <textarea
                    className="single_row_textarea"
                    ref={ref}
                    name="text"
                    rows={1}
                    value={response}
                    onChange={(e) => {
                      setGroupResponse(e.target.value, index)
                    }}
                  />
                  {groupResponses.length - 1 === index &&
                    groupResponses.length > 3 && (
                      <CloseIcon
                        color="primary"
                        onClick={() => {
                          updateNumberOfGroupResponses('REMOVE')
                        }}
                      />
                    )}
                </div>
              )
            })}
            <Button
              className="add_more_button"
              disabled={groupResponses.length > 4}
              variant="outlined"
              onClick={() => {
                updateNumberOfGroupResponses('ADD')
              }}
            >
              Add More
            </Button>
          </div>
        </>
      )}
      <div className="nav_buttons">
        {backAction !== null && !inEditFormMode && (
          <Button variant="text" onClick={backAction}>
            Back
          </Button>
        )}
        <Button
          disabled={responseText.length === 0 && type === 'TEXT'}
          variant="outlined"
          onClick={continueAction}
        >
          {inEditFormMode ? 'Save' : 'Next'}
        </Button>
      </div>
    </StyledFormInput>
  )
}

export default FormInput

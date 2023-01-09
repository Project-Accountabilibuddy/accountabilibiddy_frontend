import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button'
import cx from 'classnames'

interface FormInputProps {
  type: 'TEXT' | 'NUMBER' | 'MULTIPLE_TEXT'
  title: string
  description?: string
  responseText?: string
  groupResponses?: string[]
  responseNumber?: number
  setResponseText?: (responseText: string) => void
  setGroupResponse?: (responseText: string, index: number) => void
  continueAction: () => void
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
    color: ${({ theme }) => theme.colors.primary};
  }

  .heading-2 {
    color: ${({ theme }) => theme.colors.lightGrey};
  }

  button {
    margin-top: 120px;
  }

  textarea {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.background};
    border: none;
    outline: none;
    resize: none;
    margin-bottom: 24px;
    padding: 8px;
    border-radius: 4px;
  }

  .week_options {
    display: flex;
    justify-content: space-between;

    .week_option {
      display: flex;
      align-items: center;
      juect-content: center;
      padding: 24px;
      background-color: ${({ theme }) => theme.colors.lightGrey};
      border: 2px solid ${({ theme }) => theme.colors.lightGrey};
      color: ${({ theme }) => theme.colors.white};
      border-radius: 4px;

      :hover {
        border: 2px solid ${({ theme }) => theme.colors.primary};
        cursor: pointer;
      }
    }

    .selected {
      border: 2px solid ${({ theme }) => theme.colors.primary};
    }
  }

  .group_responses {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .single_row_textarea {
      background-color: ${({ theme }) => theme.colors.lightGrey};
      height: auto;
    }

    .group_responses_buttons {
      display: flex;
      justify-content: space-between;
    }
  }
`

const FormInput = ({
  title,
  type,
  description,
  responseText = '',
  groupResponses = [],
  responseNumber,
  setResponseText = () => {},
  setGroupResponse = () => {},
  continueAction,
  updateNumberOfGroupResponses = () => {},
  setResponseNumber = () => {}
}: FormInputProps): JSX.Element => {
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (ref?.current != null) {
      ref?.current?.focus()
    }
  }, [])

  return (
    <StyledFormInput>
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
                className={cx('week_option', {
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
        <div className="group_responses">
          {groupResponses?.map((response, index) => {
            return (
              <textarea
                key={index}
                className="single_row_textarea"
                ref={ref}
                name="text"
                rows={1}
                value={response}
                onChange={(e) => {
                  setGroupResponse(e.target.value, index)
                }}
              />
            )
          })}
          <div className="group_responses_buttons">
            <Button
              disabled={groupResponses.length < 2}
              variant="outlined"
              onClick={() => {
                updateNumberOfGroupResponses('REMOVE')
              }}
            >
              Remove Reason
            </Button>
            <Button
              disabled={groupResponses.length > 4}
              variant="outlined"
              onClick={() => {
                updateNumberOfGroupResponses('ADD')
              }}
            >
              Add Reason
            </Button>
          </div>
        </div>
      )}
      <Button
        disabled={responseText.length === 0 && type === 'TEXT'}
        variant="outlined"
        onClick={continueAction}
      >
        Continue Journey
      </Button>
    </StyledFormInput>
  )
}

export default FormInput

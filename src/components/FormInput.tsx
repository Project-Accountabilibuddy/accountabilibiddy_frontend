import React from 'react'
import styled from 'styled-components'
import MaterialUIButton from '@mui/material/Button'
import cx from 'classnames'
import CloseIcon from '@mui/icons-material/Close'

import useGlobalState from '../global/GlobalSate'
import Button from '../components/Button'

type FormInputProps = {
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

  .title_text,
  .description_text {
    margin-bottom: 24px;
  }

  .description_text {
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
      border: 2px solid var(--color-white);
      color: var(--color-white);
      border-radius: 4px;

      :hover {
        border: 2px solid var(--color-primary);
        color: var(--color-primary);
        cursor: pointer;
      }
    }

    .selected {
      border: 2px solid var(--color-primary);
      background: linear-gradient(
        0deg,
        var(--color-secondary),
        var(--color-primary)
      );
    }
  }

  .step_text {
    margin-bottom: 24px;
    color: var(--color-white);
  }

  .short_responses {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .long_response_text {
      max-height: 200px;
      overflow: scroll;
      margin-bottom: 24px;
    }

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

      .remove_icon {
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

    button {
      margin: 48px 24px 0 24px;
    }
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
  const { inEditFormMode } = useGlobalState()

  return (
    <StyledFormInput>
      {!inEditFormMode && <h1 className="step_text caption">{step}</h1>}
      <h1 className="title_text heading-1">{title}</h1>
      {Boolean(description) && (
        <h3 className="description_text caption">{description}</h3>
      )}
      {type === 'TEXT' && (
        <textarea
          autoFocus
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
          <div className="short_responses">
            <h4 className="caption long_response_text">{responseText}</h4>
            {groupResponses?.map((response, index) => {
              const showCloseIcon =
                groupResponses.length - 1 === index && groupResponses.length > 3

              return (
                <div className="input_group" key={index}>
                  <textarea
                    className="single_row_textarea"
                    autoFocus={index === 0}
                    name="text"
                    rows={1}
                    value={response}
                    onChange={(e) => {
                      setGroupResponse(e.target.value, index)
                    }}
                  />
                  {showCloseIcon && (
                    <CloseIcon
                      className="remove_icon"
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
              text="Add More"
            />
          </div>
        </>
      )}
      <div className="nav_buttons">
        {backAction !== null && !inEditFormMode && (
          <MaterialUIButton
            className="caption"
            variant="text"
            onClick={backAction}
          >
            Back
          </MaterialUIButton>
        )}
        <Button
          disabled={responseText.length === 0 && type === 'TEXT'}
          variant="outlined"
          onClick={continueAction}
          text={inEditFormMode ? 'Save' : 'Next'}
        />
      </div>
    </StyledFormInput>
  )
}

export default FormInput

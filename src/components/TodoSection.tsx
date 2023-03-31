import React, { useState } from 'react'
import styled from 'styled-components'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import MaterialUIButton from '@mui/material/Button'

import Button from '../components/Button'

const getRandomHash = (): string => {
  return Math.random().toString(36).substring(2, 15)
}

interface TodoSectionProps {
  className: string
}

interface Todo {
  id: string
  text: string
  completed: boolean
  focused: boolean
}

interface UserAction extends Todo {
  typeOfUserAction: 'create' | 'update' | 'delete' | 'complete'
}

const StyledTodoSection = styled.div`
  .todo_items {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;

    .todo_item {
      display: flex;
      flex-direction: row;
      width: 100%;
      align-items: center;
      justify-content: space-between;

      .complete_box_and_input {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;

        .incomplete_box {
          width: 24px;
          height: 20px;
          border-radius: 12px;
          border: 2px solid var(--color-primary);

          :hover {
            cursor: pointer;
          }
        }

        .todo_input {
          width: 100%;
          color: var(--color-white);
          background-color: var(--color-light-background);
          border: none;
          outline: none;
          resize: none;
          padding: 4px 4px 4px 0;
          margin: 0 8px;
          border-radius: 4px;
          caret-color: var(--color-primary);
          border-radius: 0;
          border-bottom: 1px solid var(--color-background);
        }

        .todo_input:focus {
          border-bottom: 1px solid var(--color-primary);
        }
      }
    }
  }

  .create_todo_button {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

// TODO: further consolidation of methods possible here
const TodoSection = ({ className }: TodoSectionProps): JSX.Element => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [actionStack] = useState<UserAction[]>([])

  const handleCreateTodo = (action: UserAction | Todo): void => {
    if ('typeOfUserAction' in action) {
      const { typeOfUserAction, ...rest } = action
      setTodos([...todos, rest])
    } else {
      setTodos([...todos, action])
      actionStack.push({ ...action, typeOfUserAction: 'create' })
    }
  }

  const handleUpdateTodo = (action: UserAction | Todo): void => {
    const { id, text } = action
    const updatedTodos = todos.map((todo) => {
      if (id === todo.id) {
        return { ...todo, text }
      } else {
        return todo
      }
    })

    if ('typeOfUserAction' in action) {
      setTodos(updatedTodos)
    } else {
      setTodos(updatedTodos)
      actionStack.push({ ...action, typeOfUserAction: 'update' })
    }
  }

  const handleCompleteTodo = (action: UserAction | Todo): void => {
    const { id } = action
    const updatedTodos = todos.map((todo) => {
      if (id === todo.id) {
        return { ...todo, completed: !todo.completed }
      } else {
        return todo
      }
    })
    setTodos(updatedTodos)

    if ('typeOfUserAction' in action) {
      setTodos(updatedTodos)
    } else {
      setTodos(updatedTodos)
      actionStack.push({ ...action, typeOfUserAction: 'complete' })
    }
  }

  const handleDeleteTodo = (action: UserAction | Todo): void => {
    const { id } = action

    const updatedTodos = todos.filter((todo) => todo.id !== id)

    if ('typeOfUserAction' in action) {
      setTodos(updatedTodos)
    } else {
      setTodos(updatedTodos)
      actionStack.push({ ...action, typeOfUserAction: 'delete' })
    }
  }

  const handleUndoAction = (): void => {
    const actionToUndo: UserAction | undefined = actionStack.pop()

    if (typeof actionToUndo === 'undefined') {
      return
    }

    const { typeOfUserAction } = actionToUndo

    if (typeOfUserAction === 'delete') {
      handleCreateTodo(actionToUndo)
    } else if (typeOfUserAction === 'create') {
      handleDeleteTodo(actionToUndo)
    } else if (typeOfUserAction === 'update') {
      handleUpdateTodo(actionToUndo)
    } else if (typeOfUserAction === 'complete') {
      handleCompleteTodo(actionToUndo)
    }
  }

  return (
    <StyledTodoSection className={className}>
      <h2 className="heading-3 section_title">High Impact Todos</h2>
      <div className="scroll_container">
        <div className="todo_items">
          {todos.map((todo) => {
            const { id, completed, focused, text } = todo
            return (
              <div key={id} className="todo_item">
                <div className="complete_box_and_input">
                  {completed && <CheckCircleIcon color="primary" />}
                  {!completed && (
                    <div
                      className="incomplete_box"
                      onClick={() => {
                        handleCompleteTodo(todo)
                      }}
                    />
                  )}
                  <input
                    className="todo_input caption"
                    name="text"
                    autoFocus={focused}
                    value={text}
                    onChange={(e) => {
                      handleUpdateTodo({ ...todo, text: e.target.value })
                    }}
                  />
                </div>
                <MaterialUIButton
                  variant="text"
                  onClick={() => {
                    handleDeleteTodo(todo)
                  }}
                >
                  Delete
                </MaterialUIButton>
              </div>
            )
          })}
        </div>
      </div>
      <div className="create_todo_button">
        <MaterialUIButton variant="text" onClick={handleUndoAction}>
          Undo Action
        </MaterialUIButton>
        <Button
          variant="outlined"
          onClick={() => {
            handleCreateTodo({
              id: getRandomHash(),
              text: 'get shit done',
              completed: false,
              focused: true
            })
          }}
          text="Create Todo"
        />
      </div>
    </StyledTodoSection>
  )
}

export default TodoSection

import React, { useState } from 'react'
import styled from 'styled-components'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import MaterialUIButton from '@mui/material/Button'

import Button from '../components/Button'

interface TodoSectionProps {
  className: string
}

interface Todo {
  text: string
  completed: boolean
  id: number
  focused: boolean
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

        .todo_input {
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
    justify-content: flex-end;
  }
`

const TodoSection = ({ className }: TodoSectionProps): JSX.Element => {
  const [todos, setTodos] = useState<Todo[]>([
    { text: 'Todo 1', completed: false, id: 1, focused: false },
    { text: 'Todo 2', completed: false, id: 2, focused: false }
  ])

  const handleCreateTodo = (): void => {
    const newTodo = {
      focused: true,
      text: 'get shit done',
      completed: false,
      id: todos.length + 1
    }
    setTodos([...todos, newTodo])
  }

  const handleUpdateTodo = ({
    copy,
    todoToUpdateId
  }: {
    copy: string
    todoToUpdateId: number
  }): void => {
    const updatedTodos = todos.map((todo) => {
      if (todoToUpdateId === todo.id) {
        return { ...todo, text: copy }
      } else {
        return todo
      }
    })

    setTodos(updatedTodos)
  }

  const handleCompleteTodo = (todoToCompleteId: number): void => {
    const updatedTodos = todos.map((todo) => {
      if (todoToCompleteId === todo.id) {
        return { ...todo, completed: true }
      } else {
        return todo
      }
    })
    setTodos(updatedTodos)
  }

  const handleDeleteTodo = (todoToDeleteId: number): void => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoToDeleteId)
    setTodos(updatedTodos)
  }

  return (
    <StyledTodoSection className={className}>
      <h2 className="heading-3 section_title">High Impact Todos</h2>
      <div className="scroll_container">
        <div className="todo_items">
          {todos.map(({ id, text, completed, focused }) => {
            return (
              <div key={id} className="todo_item">
                <div className="complete_box_and_input">
                  <CheckCircleIcon color="primary" />
                  <input
                    className="todo_input caption"
                    name="text"
                    autoFocus={focused}
                    value={text}
                    onChange={(e) => {
                      handleUpdateTodo({
                        copy: e.target.value,
                        todoToUpdateId: id
                      })
                    }}
                  />
                </div>
                <MaterialUIButton
                  variant="text"
                  onClick={() => {
                    handleDeleteTodo(id)
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
        <Button
          variant="outlined"
          onClick={handleCreateTodo}
          text="Create Todo"
        />
      </div>
    </StyledTodoSection>
  )
}

export default TodoSection

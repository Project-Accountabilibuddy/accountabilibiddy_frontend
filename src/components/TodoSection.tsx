import React, { useState } from 'react'
import styled from 'styled-components'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

interface DailyFormProps {
  className: string
}

const StyledTodoSection = styled.div`
  .todo_items {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    .todo_item {
      display: flex;
      flex-direction: row;
      width: 100%;
      margin-bottom: 24px;

      .todo_input {
        margin-left: 12px;
        height: auto;
        border: none;
        border-bottom: 2px solid var(--color-primary);
        border-radius: 0;
        background: none;
      }
    }
  }
`

const TodoSection = ({ className }: DailyFormProps): JSX.Element => {
  const [todos, setTodos] = useState(['', '', ''])

  const handleUpdateTodos = ({
    copy,
    todoIndex
  }: {
    copy: string
    todoIndex: number
  }): void => {
    const updatedTodos: string[] = [...todos]
    updatedTodos[todoIndex] = copy
    setTodos(updatedTodos)
  }

  return (
    <StyledTodoSection className={className}>
      <h2 className="heading-3 section_title">High Impact Todos</h2>
      <div className="scroll_container">
        <div className="todo_items">
          {todos.map((todo, index) => {
            return (
              <div key={todo} className="todo_item">
                <CheckCircleIcon color="primary" />
                <textarea
                  className="todo_input"
                  name="text"
                  rows={1}
                  value={todo}
                  onChange={(e) => {
                    handleUpdateTodos({
                      copy: e.target.value,
                      todoIndex: index
                    })
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </StyledTodoSection>
  )
}

export default TodoSection

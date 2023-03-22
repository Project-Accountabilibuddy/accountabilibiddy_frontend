import React, { useState } from 'react'
import styled from 'styled-components'

interface DailyFormProps {
  className: string
}

const StyledTodoSection = styled.div`
  .todo_items {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 24px;

    .single_row_textarea {
      width: 100%;
      height: auto;
      border-bottom: 2px solid var(--color-primary);
      border-radius: 0;
      margin-right: 40px;
    }
  }
`

const TodoSection = ({ className }: DailyFormProps): JSX.Element => {
  const [todos, setTodos] = useState([''])

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
              <textarea
                key={todo}
                className="single_row_textarea"
                name="text"
                rows={1}
                value={todo}
                onChange={(e) => {
                  handleUpdateTodos({ copy: e.target.value, todoIndex: index })
                }}
              />
            )
          })}
        </div>
      </div>
    </StyledTodoSection>
  )
}

export default TodoSection

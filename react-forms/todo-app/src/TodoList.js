import React, { useState } from 'react'
import Todo from './Todo'
import NewTodoForm from './NewTodoForm'

function TodoList () {
  const [todos, setTodos] = useState([])

  const add = todo => {
    setTodos(todos => [...todos, todo])
  }

  const remove = id => {
    setTodos(todos => todos.filter(t => t.id !== id))
  }

  const todoMap = todos.map(t => (
    <Todo
      key={t.id}
      id={t.id}
      task={t.task}
      handleRemove={remove}
    />
  ))

  return (
    <div>
      <NewTodoForm addTodo={add} />
      <div>{todoMap}</div>
    </div>
  )
}

export default TodoList

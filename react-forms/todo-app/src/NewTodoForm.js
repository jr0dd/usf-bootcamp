import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'

const NewTodoForm = ({ addTodo }) => {
  const [task, setTaskData] = useState('')

  const handleChange = evt => {
    setTaskData(evt.target.value)
  }

  const getFormInput = evt => {
    evt.preventDefault()
    addTodo({ task, id: uuid() })
    setTaskData('')
  }

  return (
    <div>
      <form onSubmit={getFormInput}>
        <div>
          <label htmlFor='task'>Task</label>
          <input
            id='task'
            name='task'
            type='text'
            value={task}
            onChange={handleChange}
          />
        </div>
        <button id='add'>Add</button>
      </form>
    </div>
  )
}

export default NewTodoForm

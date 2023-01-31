import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'

const NewBoxForm = ({ addBox }) => {
  const [formData, setFormData] = useState({
    height: '',
    width: '',
    backgroundColor: ''
  })

  const handleChange = evt => {
    const { name, value } = evt.target
    setFormData(formData => ({
      ...formData,
      [name]: value
    }))
  }

  const getFormInput = evt => {
    evt.preventDefault()
    addBox({ ...formData, id: uuid() })
    setFormData({
      height: '',
      width: '',
      backgroundColor: ''
    })
  }

  return (
    <div>
      <form onSubmit={getFormInput}>
        <div>
          <label htmlFor='height'>Height</label>
          <input
            id='height'
            name='height'
            type='text'
            value={formData.height}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='width'>Width</label>
          <input
            id='width'
            name='width'
            type='text'
            value={formData.width}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='backgroundColor'>Background Color</label>
          <input
            id='backgroundColor'
            name='backgroundColor'
            type='text'
            value={formData.backgroundColor}
            onChange={handleChange}
          />
        </div>
        <button id='add'>Add</button>
      </form>
    </div>
  )
}

export default NewBoxForm

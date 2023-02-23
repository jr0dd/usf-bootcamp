import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const ColorForm = ({addColor}) => {
  
  const [formData, setFormData] = useState({
    name:'',
    hex:''
  })
  const history = useHistory()

  const handleChange = evt => {
    const { name, value } = evt.target
    setFormData(formData => ({
      ...formData,
      [name]: value
    }))
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    addColor(formData)
    history.push('/colors')
  }

  return (
    <div className='ColorForm'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>
          Color Name:
        </label>
        <input
          required='required'
          name='name'
          placeholder='name'
          onChange={handleChange}
        />
        <label htmlFor='hex'>
          Color Hex Code:
        </label>
        <input
          type='color'
          required='required'
          name='hex'
          onChange={handleChange}
        />
        <input type='submit'></input>
      </form>
    </div>
  )
}

export default ColorForm

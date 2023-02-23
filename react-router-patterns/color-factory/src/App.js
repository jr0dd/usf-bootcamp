import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes'
import './App.css'

const App = ({colors}) => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes colors={colors}/>
      </BrowserRouter>
    </div>
  )
}

App.defaultProps ={
  colors : [
    { name: 'red', hex: '#FF0000'}, 
    { name: 'green', hex: '#008000'},
    { name: 'cyan', hex: '#00FFFF'}, 
    { name: 'yellow', hex: '#FFFF00'},
    { name: 'blueviolet', hex: '#8A2BE2'},
  ]
}

export default App

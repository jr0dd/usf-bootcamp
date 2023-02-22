import React from 'react'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import Nav from './Nav'
import DogList from './Doglist'
import DogDetails from './DogDetails'
import './App.css'

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Nav />
        <Route exact path='/dogs' >
          <DogList />
        </Route>
        <Route path='/dogs/:name' >
          <DogDetails />
        </Route>
        <Redirect to='/dogs' />
      </BrowserRouter>
    </div>
  )
}

export default App

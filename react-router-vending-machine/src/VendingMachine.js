import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './Home'
import NavBar from './NavBar'
import Cheetos from './Cheetos'
import Doritos from './Doritos'
import KitKat from './KitKat'
import Reeses from './Reeses'

const VendingMachine = () => {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/cheetos'>
          <Cheetos />
        </Route>
        <Route exact path='/doritos'>
          <Doritos />
        </Route>
        <Route exact path='/kitkat'>
          <KitKat />
        </Route>
        <Route exact path='/reeses'>
          <Reeses />
        </Route>
      </BrowserRouter>
    </div>
  )
}

export default VendingMachine

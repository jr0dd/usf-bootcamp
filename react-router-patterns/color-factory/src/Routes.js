import React, { useState } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import ColorForm from './ColorForm'
import ColorList from './ColorList'
import Color from './Color'

const Routes = ({colors}) => {
  const [cols, setColors] = useState(colors)
  const add = color => {
    setColors(cols => [...cols, color])
  }

  return (
    <div>
      <Switch>
        <Route exact path='/colors'>
          <ColorList colors={cols} />
        </Route>
        <Route exact path='/colors/new'>
          <ColorForm addColor={add} />
        </Route>
        <Route path='/colors/:color'>
          <Color colors={cols} />
        </Route>
        <Route>
          <Redirect to='/colors' />
        </Route>
      </Switch>
    </div>
  )
}

export default Routes

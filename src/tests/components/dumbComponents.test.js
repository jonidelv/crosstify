import React from 'react'
import ReactDOM from 'react-dom'
import { DarkBackground, Error404 } from '../../components'

describe('test dumb components rendering', () => {

  it('renders DarkBackground without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<DarkBackground />, div)
  })

  it('renders Error404 without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Error404 />, div)
  })

})

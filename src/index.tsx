import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './app'

import { Providers } from 'providers'

ReactDOM.render(
  <Providers>
    <App />
  </Providers>,
  document.getElementById('root')
)

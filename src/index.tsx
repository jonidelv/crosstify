import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import GlobalStyles from './styles/GlobalStyles'
import * as registerServiceWorker from './utils/serviceWorker'

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyles />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker.register()

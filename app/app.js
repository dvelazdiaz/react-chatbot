//Styles
import '../scss/styles.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import Root from './Root/component'
import reducer from './reducer'

const store = createStore(
  reducer
  //applyMiddleware(thunkMiddleware)
)

ReactDOM.render(
    <Provider store={store}>
        <Root/>
    </Provider>,
    document.getElementById('root')
)

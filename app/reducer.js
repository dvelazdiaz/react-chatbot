import { combineReducers } from 'redux'

import Root from './Root/reducer'

const reducer = combineReducers({
  ['root']: Root
})

export default reducer

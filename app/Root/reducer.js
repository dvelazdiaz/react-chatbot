const initialState = {
  count: 0,
  messages: []
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case 'SEND_MESSAGE':
      let messages = state.messages
      let currentMessage = action.message
      let previousMessage = null
      let newState = Object.assign({}, state)
      newState.count++
      if(state.messages.length > 0)  {
        previousMessage = state.messages[state.messages.length - 1]
        if(currentMessage.author == previousMessage.author) {
          if(previousMessage.type == 'CORNER_TOP_LEFT') {
            previousMessage.type = 'MIDDLE_LEFT'
          } else {
            previousMessage.type = 'CORNER_BOTTOM_LEFT'
          }
          currentMessage.type = 'CORNER_TOP_LEFT'

          newState.messages[newState.messages.length - 1] = previousMessage
        }
      }
      newState.messages.push(currentMessage)
      return newState
  }

  return state
}

export default reducer;

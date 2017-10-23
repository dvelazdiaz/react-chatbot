import * as constants from './constants';

export function sendMessage(message) {
    return {
      type: constants.SEND_MESSAGE,
      message: message
    }
}

export function changeControlHeight(height) {
    return {
      type: constants.CHANGE_CONTROL_HEIGHT,
      height: height
    }
}


/*
export function fetchWebform() {
    return (dispatch) => {
      dispatch(requestPosts(subreddit))


    }
}*/

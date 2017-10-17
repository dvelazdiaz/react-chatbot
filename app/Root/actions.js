import * as constants from './constants';

export function sendMessage(message) {
    return {
      type: constants.SEND_MESSAGE,
      message: message
    }
}

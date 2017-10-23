import React from 'react'
import { connect } from 'react-redux'

import { sendMessage } from '../Root/actions'
import { validateRequire, validateEmail, validateNumber, validateCustom} from './validations'

class TextBoxComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      init: false,
      error: false,
      message: ""
    }
  }

  componentDidMount() {
      window.setTimeout(() => {
        this.setState({init: true})
      }, 2000)
  }

  handleOnSubmit(e) {
    e.preventDefault()

    let validation = true

    this.props.rules.forEach((rule) => {
      if(rule == "required")
        validation = validateRequire(this.input.value)
      else if(rule == "email")
        validation = validateEmail(this.input.value)
      else if(rule == "number")
        validation = validateNumber(this.input.value)
      else
        validation = validateCustom(this.input.value, rule)
    })

    if(!validation) {
      this.setState({error: false})

      this.props.dispatch(sendMessage({
        id: Math.floor((Math.random() * 100000) + 1),
        author: 'USER',
        text: this.input.value,
        delay: 0,
        type: 'DEFAULT'
      }))

      this.props.dispatch(sendMessage({
        id: this.props.trigger,
        author: 'BOT',
        text: this.props.flow[this.props.trigger].message,
        delay: 300,
        type: 'DEFAULT'
      }))
    } else {
      this.setState({error: validation.error, message: validation.message})
    }

    this.input.value = ''
  }

  displayErrorMessage() {
    if(this.state.error) {
      return <p className="notification">{this.state.message}</p>
    }
  }

  render() {
    return <section className={'textbox' + (this.state.init ? ' textbox-init' : '')} ref={(content) => this.content = content}>
              {this.displayErrorMessage()}
              <form onSubmit={this.handleOnSubmit.bind(this)}>
              <input type='text' placeholder={this.props.placeholder} ref={(input) => this.input = input}/>
              </form>
            </section>
  }
}

const TextBox = connect()(TextBoxComponent)

export default TextBox

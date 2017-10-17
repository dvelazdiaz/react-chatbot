import React from 'react'
import { connect } from 'react-redux'

import { sendMessage } from '../Root/actions'

class TextBoxComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {init: false}
  }

  componentDidMount() {
      window.setTimeout(() => {
        this.setState({init: true})
      }, 300)
  }

  handleOnClick(e) {
    e.preventDefault()
    this.props.dispatch(sendMessage({
      id: Math.floor((Math.random() * 100000) + 1),
      author: 'USER',
      text: this.input.value,
      delay: 0,
      type: 'DEFAULT'
    }))

    this.props.dispatch(sendMessage({
      id: Math.floor((Math.random() * 100000) + 1),
      author: 'BOT',
      text: 'You said: ' + this.input.value,
      delay: 300,
      type: 'DEFAULT'
    }))

    this.input.value = ''
  }

  render() {
    return <section className={'textbox' + (this.state.init ? ' textbox-init' : '')} ref={(content) => this.content = content}>
                <form onSubmit={this.handleOnClick.bind(this)}>
                <input type='text' ref={(input) => this.input = input}/>
                </form>
              </section>
  }
}

const TextBox = connect()(TextBoxComponent)

export default TextBox

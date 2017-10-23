import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Topbar from '../Topbar/component'
import Loader from '../Loader/component'
import TextBox from '../TextBox/component'
import Options from '../Options/component'
import UploadImage from '../UploadImage/component'
import Assistant from '../Assistant/component'
import Message from '../Message/component'

import config from '../config'
import { sendMessage } from './actions'

const Chatbot = styled.section`
  width: 100%;
  margin: 0;
  box-sizing: border-box;
  border-left: solid 1px #ECECEC;
  border-right: solid 1px #ECECEC;
  position: relative;
  padding: 57px 10px 60px 10px;

  @media(min-width: 768px) {
    width: 320px;
    margin: auto;
    overflow-y: auto;
    height: 100vh;
  }
`

class RootComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      init: false,
      response: null
    }
  }

  componentDidMount() {
    window.setTimeout(() => {
      this.setState({init: true})
    }, 300)

    let welcome = config.conversation.welcome

    this.props.dispatch(sendMessage({
      id: "welcome",
      author: 'BOT',
      text: welcome.message,
      delay: welcome.delay,
      type: 'DEFAULT'
    }))

    if(welcome.trigger) {
      this.triggerMessages(welcome.trigger, 1)
    }
  }

  componentDidUpdate() {
    $('body, .chatbot').animate({"scrollTop":$(this.contentHeight).height()}, 800)

    let currentMessage = this.props.messages[this.props.messages.length - 1]
    let configMessage = config.conversation.flow[currentMessage.id]

    if(configMessage) {
      if(configMessage.hasOwnProperty('response')) {
        if(configMessage.response != this.state.response)
          this.setState({response: configMessage.response})
      } else if(configMessage.response != this.state.response) {
        this.setState({response: configMessage.response})
      }
    }
  }

  triggerMessages(trigger, timer) {
      let dialog = config.conversation.flow[trigger]
      if(dialog.hasOwnProperty('trigger')) {
        window.setTimeout(() => {
          this.props.dispatch(sendMessage({
            id: trigger,
            author: 'BOT',
            text: dialog.message,
            delay: dialog.delay,
            type: 'DEFAULT'
          }))
        }, 2000 * timer)
        return this.triggerMessages(dialog.trigger, timer + 1)
      } else {
        window.setTimeout(() => {
          this.props.dispatch(sendMessage({
            id: trigger,
            author: 'BOT',
            text: dialog.message,
            delay: dialog.delay,
            type: 'DEFAULT'
          }))
        }, 2000 * timer)
      }
  }

  displayMessages() {
    let items = []

    if(this.props.messages.length > 0) {
      this.props.messages.map((message, key) => {
          items.push(<Message
            text={message.text}
            img={message.img}
            key={key}
            delay={message.delay}
            id={message.id}
            author={message.author}
            type={message.type} />
          )
      })
    }

    return items
  }

  displayField() {
    if(this.state.response) {
      let response = this.state.response
      switch (response.type) {
        case 'text':
          return <TextBox placeholder={response.placeholder} rules={response.rules} trigger={response.trigger} flow={config.conversation.flow}/>
        case 'options':
          return <Options options={response.options} trigger={response.trigger} flow={config.conversation.flow}/>
        case 'image':
          return <UploadImage trigger={response.trigger} flow={config.conversation.flow}/>
        default:
          return null
      }
    }
  }

  render() {
    return <Chatbot>
              <Topbar name={config.bot}/>
              <div ref={(contentHeight) => this.contentHeight = contentHeight}>
                <Assistant name={config.bot} description={config.description}/>
                {this.displayMessages()}
              </div>
              {this.displayField()}
            </Chatbot>
  }
}

const mapStateToProps = (state) => {
    return {
      waiting: state.root.waiting,
      count: state.root.count,
      messages: state.root.messages
    }
}

const Root = connect(mapStateToProps)(RootComponent)

export default Root

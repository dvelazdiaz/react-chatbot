import React from 'react'
import { connect } from 'react-redux'
import 'jquery.nicescroll'

import Topbar from '../Topbar/component'
import Loader from '../Loader/component'
import TextBox from '../TextBox/component'
import Assistant from '../Assistant/component'
import Message from '../Message/component'

import { sendMessage } from './actions'

class RootComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {init: false}
  }

  componentDidMount() {
      window.setTimeout(() => {
        this.setState({init: true})
      }, 300)

      this.props.dispatch(sendMessage({
        id: Math.floor((Math.random() * 100000) + 1),
        author: 'BOT',
        text: 'I can do this all day...',
        delay: 0,
        type: 'DEFAULT'
      }))

      window.setTimeout(() => {
        this.props.dispatch(sendMessage({
          id: Math.floor((Math.random() * 100000) + 1),
          author: 'BOT',
          text: 'To start, send me some test messages',
          delay: 0,
          type: 'DEFAULT'
        }))
      }, 2000)
  }

  componentDidUpdate() {
    let nice = $(this.content).getNiceScroll(0)
    $(this.content).animate({"scrollTop":$(this.contentHeight).height()}, 800)
  }

  displayMessages() {
    let items = []

    if(this.props.messages.length > 0) {
      this.props.messages.map((message, key) => {
          items.push(<Message
            text={message.text}
            key={key}
            delay={message.delay}
            id={message.id}
            author={message.author}
            type={message.type}
            content={this.content} />
          )
      })
    }

    return items
  }

  render() {
    return <section className='chatbot'>
                <Topbar/>
                <div className={'content' + (this.state.init ? ' content-init' : '')} ref={(content) => this.content = content}>
                  <div ref={(contentHeight) => this.contentHeight = contentHeight}>
                    <Assistant/>
                    {this.displayMessages()}
                    <TextBox/>
                  </div>
                </div>
              </section>
  }
}

const mapStateToProps = (state) => {
    return {
      count: state.root.count,
      messages: state.root.messages
    }
}

const Root = connect(mapStateToProps)(RootComponent)

export default Root

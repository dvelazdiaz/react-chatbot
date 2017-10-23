import React from 'react'

import Avatar from '../Avatar/component'
import Loader from '../Loader/component'

class MessageComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      avatar: true,
      loading: true,
      loadingDelay: this.props.author == 'USER' ? 0 : 1800
    }
  }

  componentDidMount() {
    window.setTimeout(() => {
      this.setState({show: true})
        window.setTimeout(() => {
          this.setState({loading: false})
        }, this.state.loadingDelay)
    }, this.props.delay)
  }

    componentDidUpdate() {
      if(this.state.show && this.props.type != 'CORNER_TOP_LEFT' && this.props.type != 'DEFAULT') {
        this.setState({show: false})
      }
    }

   renderAvatar() {
     if(this.props.author == 'BOT')
      return <Avatar classes={this.state.show ? ' show' : ''} img='images/user.png'/>
     else
      return <Avatar classes={this.state.show ? ' show' : ''} img='images/user.svg'/>
   }

   renderMessageContent() {
     if(this.props.img) {
       return <p className={'text-message text-image' + (!this.state.loading ? ' show' : '') + ' ' + this.props.type }><img src={this.props.img}/> </p>
     } else {
       return <p className={'text-message' + (!this.state.loading ? ' show' : '') + ' ' + this.props.type }> {this.props.text} </p>
     }
   }

    renderContent() {
        return <div>
                 <p className={'loader-message' + (this.state.show ? ' show' : '') + (!this.state.loading ? ' hide' : '')}><Loader/></p>
                 {this.renderMessageContent()}
               </div>
    }

  render() {
    return  <div className={'message' + (this.props.author == 'USER' ? ' message-user' : '')}>
                  { this.renderAvatar() }
                  { this.renderContent() }
               </div>
  }
}

export default MessageComponent

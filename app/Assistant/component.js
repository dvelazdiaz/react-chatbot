import React from 'react'

import Avatar from '../Avatar/component'

class AssistantComponent extends React.Component {

  render() {
    return <div className='assistant'>
                <Avatar img='images/user.png'/>
                <h4>{this.props.name} <small>{this.props.description}</small></h4>
              </div>
  }
}

export default AssistantComponent

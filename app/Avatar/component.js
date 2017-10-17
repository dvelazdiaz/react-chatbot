import React from 'react'

class AvatarComponent extends React.Component {

  render() {
    return <div className={'avatar' + this.props.classes}>
                <img src={this.props.img}/>
              </div>
  }
}

export default AvatarComponent

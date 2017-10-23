import React from 'react'

class TopbarComponent extends React.Component {

  render() {
    return <header className='topbar'>
            <span className="logo"><i className="icon-chubb"></i></span>
            <span className="name"><i></i> {this.props.name}</span>
            <span className="settings icon-cog"></span>
           </header>
  }
}

export default TopbarComponent

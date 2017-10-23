import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { sendMessage, changeControlHeight } from '../Root/actions'

const Options = styled.section`
  position: fixed;
  bottom: -300px;
  left: 0;
  right: 0;
  background-color: white;
  padding: 1px;
  transition: bottom .8s;
  z-index: 100;
  width: 100%;
  margin: auto;

  @media(min-width: 768px) {
    width: 320px;
  }

  &.init {
    bottom: 0;
  }
`

const Button = styled.button`
  width: 100%;
  background-color: #222222;
  border: none;
  color: white;
  font-size: 16px;
  padding: 10px;

  &:hover {
    background-color: black;
  }

  + button {
    margin-top: 1px;
  }
`

class OptionsComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      init: false
    }
  }

  componentDidMount() {
      window.setTimeout(() => {
        this.setState({init: true})
      }, 2000)
  }

  displayOptions() {
    let items = []

    this.props.options.map((option, key) => {
      items.push(<Button onClick={this.handleOnClick.bind(this)} key={key}>{option}</Button>)
    })

    return items
  }

  handleOnClick(e) {
    e.preventDefault()

    this.props.dispatch(sendMessage({
      id: Math.floor((Math.random() * 100000) + 1),
      author: 'USER',
      text: e.target.innerHTML,
      delay: 0,
      type: 'DEFAULT'
    }))

    let text = ""
    let trigger = ""

    if(Array.isArray(this.props.trigger)) {
      this.props.trigger.map((item)=>{
        if(item.hasOwnProperty(e.target.innerHTML)) {
          text = this.props.flow[item[e.target.innerHTML]].message
          trigger = item[e.target.innerHTML]
        }
      })
    } else {
      text = this.props.flow[this.props.trigger].message
      trigger = this.props.trigger
    }

    this.props.dispatch(sendMessage({
      id: trigger,
      author: 'BOT',
      text: text,
      delay: 300,
      type: 'DEFAULT'
    }))
  }

  render() {
    return <Options items={this.props.options.length} className={"options" + (this.state.init ? ' init' : '')}>
              {this.displayOptions()}
           </Options>
  }
}

const OptionsContainer = connect()(OptionsComponent)

export default OptionsContainer

import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { sendMessage } from '../Root/actions'

const Component = styled.section`
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

const Input = styled.input`
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
`

const Button = styled.div`
  position: relative;
  background-color: #222222;
  color: white;
  text-align: center;
  height: 40px;
  cursor: pointer;

  &:hover {
    background-color: black;
  }

  span {
    display: block;
    line-height: 40px;
  }
`

class UploadImageComponent extends React.Component {

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

  handleOnChange(event) {
    let reader = new FileReader()
    let file = event.target.files[0]
    let _this = this

    reader.onload = function (e) {
        let newImage = new Image()
        newImage.src = e.target.result

        _this.props.dispatch(sendMessage({
          id: Math.floor((Math.random() * 100000) + 1),
          author: 'USER',
          text: '',
          img: e.target.result,
          delay: 0,
          type: 'DEFAULT'
        }))

        _this.props.dispatch(sendMessage({
          id: _this.props.trigger,
          author: 'BOT',
          text: _this.props.flow[_this.props.trigger].message,
          delay: 300,
          type: 'DEFAULT'
        }))
    }

    reader.readAsDataURL(file)
  }

  render() {
    return <Component className={this.state.init ? ' init' : ''}>
              <Button>
                <span>image</span>
                <Input type='file' onChange={this.handleOnChange.bind(this)}/>
              </Button>
           </Component>
  }
}

const UploadImage = connect()(UploadImageComponent)

export default UploadImage

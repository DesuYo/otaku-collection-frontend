import React, { Component } from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  position: relative;
  display: block;
  margin: 0 auto;
  margin-top: 15px;
  font: bold 14px / 30px "Myriad Pro", sans-serif;
  color: rgb(134, 50, 170);
  cursor: pointer;

  .text-container:after {
    content: '';
    display: inline-block;
    position: absolute;
    left: calc(100% + 5px); right: -25px;
    top: 8px; bottom: 8px;
    background: center / contain no-repeat;
    background-image: url(../images/arrow.png);
  }
`

const StyledDiv = styled.div`
  &.slide-out {
    animation: slide-out 0.4s linear;
    -webkit-animation: slide-out 0.4s linear;
  }

  @keyframes slide-out {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-100%); }
  }

  @-webkit-keyframes slide-out {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-100%); }
  }
`

export class AwesomeSwitcher extends Component {
  constructor() {
    super()
    this.state = {
      position: 0,
      isSwitched: false
    }
  }

  handleSwitch = () => {
    this.setState(({ position }) => {
      return {
        position: position === React.Children.count(this.props.children) - 1
          ? 0
          : position + 1,
        isSwitched: false
      }
    })
  }

  render() {
    return (
      <div>
        <StyledDiv 
        className={ this.state.isSwitched ? 'slide-out' : '' }
        onAnimationEnd={ this.handleSwitch }>
          { this.props.children[this.state.position] }
        </StyledDiv>
        <StyledButton onClick={ () => this.setState({ isSwitched: true }) }>
          <span className="text-container">{ this.props.children[this.state.position].type.name }</span>
        </StyledButton>
      </div>
    )
  }
}
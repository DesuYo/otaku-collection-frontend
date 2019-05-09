import React, { Component } from 'react'
import styled from 'styled-components'

const StyledButton = styled.a`
  position: relative;
  display: inline-block;
  margin-top: 15px;
  font: bold 14px / 30px "Myriad Pro", sans-serif;
  color: rgb(134, 50, 170);
  cursor: pointer;

  &:after {
    content: '';
    position: absolute;
    display: block;
    bottom: 2px;
    height: 2px;
    width: 100%;
    background: linear-gradient(to right, rgb(134, 50, 170), rgb(234, 50, 170));
  }
`

const StyledDiv = styled.div`
  text-align: center;

  &.slide-out {
    animation: slide-out 0.4s linear;
    -webkit-animation: slide-out 0.4s linear 0.001s;
  }

  @keyframes slide-out {
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
        <StyledDiv>
          <StyledButton onClick={ () => this.setState({ isSwitched: true }) }>
            { this.props.children[this.state.position].type.name }
          </StyledButton>
        </StyledDiv>
      </div>
    )
  }
}
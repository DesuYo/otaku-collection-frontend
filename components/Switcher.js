import React, { Component } from 'react'
import styled from 'styled-components'

const StyledButton = styled.a`
  position: relative;
  display: inline-block;
  margin-top: 15px;

  &:after {
    content: '';
    position: absolute;
    display: block;
    bottom: 2px;
    height: 2px;
    width: 100%;
    background: linear-gradient(to right, rgb(134, 50, 170) 50%, rgb(234, 50, 170) 50%);
  }
`

const StyledSpan = styled.span`
  position: relative;
  cursor: pointer;

  &.arrow {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-left: 2px solid rgb(134, 50, 170);
    border-bottom: 2px solid rgb(134, 50, 170);
    transform: rotate(-135deg);
    margin-left: 5px;
  }

  &.prevArrow {
    margin-left: 0;
    margin-right: 5px;
    transform: rotate(45deg);
  }

  &.textContainer {
    display: inline-block;
    font: 14px / 30px Montserrat, sans-serif;
    color: rgb(142, 142, 153);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`

const StyledDiv = styled.div`
  text-align: center;

  &.slide-out {
    animation: slide-out 0.5s linear;
    -webkit-animation: slide-out 0.5s linear 0.001s;
  }

  &.slide-in {
    animation: slide-in 0.5s linear;
    -webkit-animation: slide-in 0.5s linear 0.001s;
  }

  @keyframes slide-out {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-100%); }
  }

  @keyframes slide-in {
    0% { transform: translateX(0%); }
    100% { transform: translateX(100%); }
  }
`

export class AwesomeSwitcher extends Component {
  constructor() {
    super()
    this.state = {
      position: 0,
      isForwards: false,
      isBackwards: false
    }
  }

  handleSwitch = () => {
    this.setState(({ isForwards, position }) => {
      return isForwards
        ? { position: position === React.Children.count(this.props.children) - 1
          ? 0 
          : position + 1, isForwards: false }
        : { position: position - 1, isBackwards: false }
    })
  }

  render() {
    return (
      <div>
        <StyledDiv 
        className={ this.state.isForwards
          ? 'slide-out'
          : this.state.isBackwards
          ? 'slide-in'
          : '' }
        onAnimationEnd={ this.handleSwitch }>
          { this.props.children[this.state.position] }
        </StyledDiv>
        <StyledDiv>
          <StyledButton>
            <StyledSpan
            className={ this.state.position ? 'arrow prevArrow' : '' }
            onClick={ () => this.setState({ isBackwards: true })}></StyledSpan>
            <StyledSpan
            className="textContainer"
            onClick={ () => this.setState({ isForwards: true }) }>
              { this.props.children[this.state.position].type.name }
            </StyledSpan>
            <StyledSpan 
            className={ this.state.position === React.Children.count(this.props.children) - 1
              ? '' 
              : 'arrow' }
            onClick={ () => this.setState({ isForwards: true }) }></StyledSpan>
          </StyledButton>
        </StyledDiv>
      </div>
    )
  }
}
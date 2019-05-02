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

export class AwesomeSwitcher extends Component {
  constructor() {
    super()
    this.state = {
      position: 0
    }
  }

  handleSwitch = () => {
    this.setState(({ position }) => {
      return {
        position: position === React.Children.count(this.props.children) - 1
          ? 0
          : position + 1
      }
    })
  }

  render() {
    return (
      <div>
        { this.props.children[this.state.position] }
        <StyledButton onClick={ this.handleSwitch }>
          <span className="text-container">{ this.props.children[this.state.position].type.name }</span>
        </StyledButton>
      </div>
    )
  }
}
import React, { Component } from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  position: relative;
  display: block;
  margin: 0 auto;
  font: bold 14px / 30px "Myriad Pro", sans-serif;
  color: rgb(134, 50, 170);
  cursor: pointer;

  &:after {
    content: '';
    display: inline-block;
    position: absolute;
    left: calc(50% + 75px); right: -25px;
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
        position: 1 - position
      }
    })
  }



  render() {
    const children = React.Children.toArray(this.props.children).map(node => {
      return React.cloneElement(node)
    })

    return (
      <div>
        { children[this.state.position] }
        <StyledButton onClick={ this.handleSwitch }>
          { children[this.state.position].type.name }
        </StyledButton>
      </div>
    )
  }
}
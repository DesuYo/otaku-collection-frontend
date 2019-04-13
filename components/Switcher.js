import React, { Component } from 'react'

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
      <div onClick={ this.handleSwitch }>
        { children[this.state.position] }
      </div>
    )
  }
}
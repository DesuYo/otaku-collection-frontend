import React from 'react'
import styled from 'styled-components'

import { InputContainer } from './Input'

const SearchInputContainer = styled(InputContainer)`
  border: 1px solid rgb(134, 50, 170);
  border-radius: 4px;

  &:before {
    background-image: url(../images/search.jpg)
  }

  &.focused {
    border-color: red;
  }

  input {
    font: 14px / 40px Montserrat, sans-serif;
  }
`

export class AwesomeSearchInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isFocused: false
    }
    this.timer = null
  }

  render () {
    const { isFocused } = this.state
    return (
      <div>
        <SearchInputContainer
        className={ isFocused ? 'focused' : 'not-focused' }
        >
          <input 
            onChange={ this.ping }
            onFocus={ () => this.setState({ isFocused: true }) }
            onBlur={ () => this.setState({ isFocused: false }) }
            placeholder="Test it, bratok"
          />
        </SearchInputContainer>
        <button type="button" style={{color: 'rgb(234,50,170)', position: 'relative',
          display: 'block', width: '100%', marginTop: '15px', 
          font: 'bold 14px / 30px "Myriad Pro",sans-serif'}}
          onClick={this.handleSwitch}>
          SWITCH
        </button>
      </div>
    )
  }

  handleSwitch = e => {
    e.preventDefault()
    this.props.onSwitch(e)
  }

  ping = (e) => {
    const text = e.target.value
    clearTimeout(this.timer)
    this.timer = setTimeout(() => { this.props.cb(text) }, 700)
  }
}




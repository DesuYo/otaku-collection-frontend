import React from 'react'
import styled from 'styled-components'

const InputContainer = styled.div`
  position: relative;
  margin-top: 15px;
  padding: 0 10px 0 42px;
  border: 1px solid rgb(134, 50, 170);
  border-radius: 4px;

  &:before {
    content: '';
    background: url(../images/search.jpg) 0 / cover no-repeat;
    display: block;
    position: absolute;
    left: 12px;
    top: 4px;
    width: 20px;
    height: 20px;
  }

  &.focused {
    border-color: red;
  }

  input {
    appearance: none;
    display: block;
    width: 100%;
    font: 14px / 28px Montserrat, sans-serif;
  }
`

export class AwesomeSearchInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      timer: null,
      isFocused: false
    }
    this.timer = null
  }

  render () {
    const { isFocused } = this.state
    return (
      <InputContainer
        className={ isFocused ? 'focused' : 'not-focused' }
      >
        <input 
          onChange={ this.ping }
          onFocus={ () => this.setState({ isFocused: true }) }
          onBlur={ () => this.setState({ isFocused: false }) }
          placeholder="Test it, bratok"
        />
      </InputContainer>
    )
  }

  ping = (e) => {
    const text = e.target.value
    clearTimeout(this.timer)
    this.timer = setTimeout(() => { this.props.cb(text) }, 700)
  }
}




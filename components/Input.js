import React from 'react'
import styled from 'styled-components'

export const InputContainer = styled.div`
  position: relative;
  margin-top: 15px;
  padding: 0 10px 0 40px;
  border-radius: 4px;

  &:before {
    content: '';
    display: block;
    position: absolute;
    left: 10px; right: calc(100% - 30px);
    top: 4px; bottom: 4px;
    background: center / contain no-repeat;
  }

  &.focused {
    border-color: red;
  }

  input {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    display: block;
    width: 100%;
    font: 12px / 24px Montserrat, sans-serif;
  }
`

export class AwesomeInput extends React.Component {
  

  render () {
    return (
      <InputContainer>
        <input 
          placeholder='Email...'
        />
      </InputContainer>
    )
  }
}
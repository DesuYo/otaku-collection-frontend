import React from 'react'
import styled from 'styled-components'

export const InputContainer = styled.div`
  position: relative;
  margin-top: 15px;
  padding: 0 10px 0 40px;

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
  }

  &.email, &.password {
    border-bottom: 1px solid rgb(134, 50, 170);

    &.focused {
      border-color: red;
    }

    input {
      font: 12px / 30px "Myriad Pro", sans-serif;
    }
  }

  &.email:before {
    background-image: url(../images/email.png);
  }

  &.password:before {
    background-image: url(../images/password.png);
  }
`

const StyledButton = styled.button`
  margin-top: 15px;
  padding: 0 10px;
  width: 100%;
  background: linear-gradient(to left, rgb(134, 50, 170), rgb(78, 42, 166));
  border-radius: 4px;
  font: bold 14px / 30px "Myriad Pro", sans-serif;
  color: rgb(255, 255, 255);
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.5s;

  &:hover {
    background: linear-gradient(to right, rgb(134, 50, 170), rgb(78, 42, 166));
  }
`

export class AwesomeInputForm extends React.Component {
  constructor () {
    super()
    this.state = {}
  }
  
  render () {
    const fields = React.Children
      .toArray(this.props.children)
      .filter(node => node.type === 'input')
      .map((node, i) => {
        const { name, type } = node.props
        const focused = this.state[name] ? this.state[name].focused : false
        return (
          <InputContainer key={ i } className={ `${type} ${ focused ? 'focused' : 'no-focused' }` }>
            <input 
              type={ type } 
              onChange={ e => this.setState({ [name]: { ...this.state[name], value: e.target.value } }) }
              onFocus={ () => this.setState({ [name]: { ...this.state[name], focused: true } }) }
              onBlur={ () => this.setState({ [name]: { ...this.state[name], focused: false } }) }
            />
          </InputContainer>
        )
      })
   
    return (
      <form>
        { fields }
        <StyledButton type='button' onClick={ this.handleSubmit }>Submit</StyledButton>
      </form>
    )
  }

  

  handleSubmit = e => {
    const { url, query } = this.props
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables: this.state
      })
    })
      .then(res => this.props.onResponse(res.json()))

  }
}

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

    &:after {
      content: '';
      position: absolute;
      display: block;
      left: 0; right: 100%;
      top: calc(100% - 2px); bottom: 0;
      background-color: rgb(134, 50, 170);
      transition: right 0.5s;
    }

    &.focused:after {
      right: 0;
    }

    &.invalid {
      border-color: rgb(234, 50, 170);
    }

    &.invalid:after {
      background-color: rgb(234, 50, 170);
    }

    &.valid {
      border-color: rgb(84, 150, 120);
    }

    &.valid:after {
      background-color: rgb(84, 150, 120);
    }

    input {
      font: 12px / 30px "Myriad Pro", sans-serif;
    }
  }

  span {
    position: absolute;
    right: 10px;
    top: -45%; bottom: 55%;
    font: 12px / 30px "Myriad Pro", sans-serif;
    color: rgb(134, 50, 170);
    opacity: 0.7;
  }

  &.invalid span {
    color: rgb(234, 50, 170);
  }

  &.valid span {
    color: rgb(84, 150, 120);
  }


  span:first-letter {
    text-transform: capitalize;
  }

  &.email:before {
    background-image: url(../images/email.png);
  }

  &.password:before {
    background-image: url(../images/password.png);
  }
`

const StyledButton = styled.button`
  position: relative;
  display: block;
  margin-top: 15px;
  width: 100%;
  font: bold 14px / 30px "Myriad Pro", sans-serif;
  color: rgb(234, 50, 170);
  text-transform: uppercase;
  background-color: transparent;
  border: 1px solid rgb(134, 50, 170);
  border-radius: 4px;
  cursor: not-allowed;

  &:after {
    content: '';
    position: absolute;
    display: block;
    left: 50%; right: 50%;
    top: -1px; bottom: -1px;
    border: 0 solid rgb(134, 50, 170);
    border-radius: 4px;
    transition: left 1s, right 1s;
    z-index: 100;
  }

  &.form-completed {
    color: rgb(134, 50, 170);
    cursor: pointer;
  }

  &.form-completed:after {
    left: -1px; right: -1px;
    border-width: 2px;
    transition: left 1s, right 1s;
  }

  &:hover {
    /*background: linear-gradient(to right, rgb(134, 50, 170), rgb(78, 42, 166));*/
  }
`

export class AwesomeInputForm extends React.Component {
  constructor () {
    super()
    this.state = {
      values: {},
      resolved: 0,
      checked: {},
      focused: null,
      completed: false
    }
  }

  genInputClasses = ({ props: { name, type } }) => {
    const { focused, checked } = this.state
    return `
      ${type} 
      ${focused === name ? 'focused' : 'no-focused'} 
      ${checked[name] === true
        ? 'valid' 
        : (typeof checked[name] === 'string'  ? 'invalid' : 'no-checked')}
    `
  }

  genInputHint = ({ props: { name } }) => {
    const { checked, completed } = this.state
    return `
      ${name}${typeof checked[name] === 'string' 
        ? `. ${checked[name] || 'Invalid value'}` 
        : ''}
    `
  }

  handleChange = ({ target: el, target: { value } }) => {
    const name = el.getAttribute('name')
    const isValid = new RegExp(el.getAttribute('regex') || '').test(value)
    
    this.setState(({ values, checked, resolved }) => ({
      values: { ...values, [name]: value },
      resolved: isValid && checked[name] !== true 
        ? resolved + 1 
        : (!isValid && checked[name] === true ? resolved - 1 : resolved),
      checked: { ...checked, [name]: isValid || null }
    }))
    this.setState(({ resolved }) => ({ completed: resolved / this.fields.length === 1 }))
  }

  handleBlur = ({ target: el, target: { value }, relatedTarget }) => {
    if (relatedTarget && relatedTarget.getAttribute('type') === 'button' && this.state.completed === true)
      this.handleSubmit()
    this.setState(({ checked }) => ({ 
      checked: { ...checked, [el.getAttribute('name')]: 
        new RegExp(el.getAttribute('regex')).test(value) || el.getAttribute('error-hint') || 'Invalid value' }, 
      focused: null
    }))
  }

  handleFocus = ({ target: el }) => {
    this.setState({ focused: el.getAttribute('name') })
  }
    
  render () {
    const { completed } = this.state
    
    this.fields = React.Children
      .toArray(this.props.children)
      .filter(node => node.type === 'input')
      .map((node, i) => (
        <InputContainer key={ i } className={ this.genInputClasses(node) }>
          { 
            React.cloneElement(node, {
              onChange: this.handleChange,
              onFocus: this.handleFocus,
              onBlur: this.handleBlur
            })
          }
          <span>{ this.genInputHint(node) }</span>
        </InputContainer>
      ))
    
    return (
      <form>
        { this.fields }
        <StyledButton
          type='button'
          className={ completed ? 'form-completed' : 'form-in-progress' }
          disabled={ !completed }
          onClick={ this.handleSubmit }
        >
          Submit
        </StyledButton>
      </form>
    )
  }

  handleSubmit = () => {
    const { url, query } = this.props

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables: this.state.values
      })
    })
      .then(res => this.props.onResponse(res.json()))

  }
}

/*Hello. I have considered 2 options:
https://x-house.co.jp/en/sharehouse/adachiku-en-2/sa-xross147/
https://x-house.co.jp/en/sharehouse/adachiku-en-2/sa-xross149/
One of them costs 39 000 yen and another - 30 000. What is the difference between them?
Generally, I'm looking for private apartment near Nippori station. Toilet and shower can be shared 
but only with few people (3-4 per one unit). Required private facilities: bed, fridge, air-con 
(very important), table, some sort of closet. It seems like all of them are included in this 
two rooms which I mentioned above. I'm planning to entry Japan in 31th March - 1st April.*/

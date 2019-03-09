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
  margin-top: 15px;
  padding: 0 10px;
  width: 100%;
  background-color: transparent;
  /*background: linear-gradient(to left, rgb(134, 50, 170), rgb(78, 42, 166));*/
  border: 1px solid rgb(134, 50, 170);
  border-radius: 4px;
  font: bold 14px / 30px "Myriad Pro", sans-serif;
  text-transform: uppercase;

  &:hover {
    /*background: linear-gradient(to right, rgb(134, 50, 170), rgb(78, 42, 166));*/
  }
`

export class AwesomeInputForm extends React.Component {
  constructor () {
    super()
    this.state = {
      values: {},
      checked: {},
      focused: null,
      completed: 0
    }
  }
  
  render () {
    const { focused, checked, completed } = this.state
    
    let fields = React.Children
      .toArray(this.props.children)
      .filter(node => node.type === 'input')
      
    fields = fields.map((node, i) => {
      const { name, type, regex, errorHint } = node.props

      return (
        <InputContainer 
          key={ i } 
          className={ `
            ${type} 
            ${focused === name ? 'focused' : 'no-focused'} 
            ${checked[name] === true
              ? 'valid' 
              : (typeof checked[name] === 'string'  ? 'invalid' : 'no-checked')}` }
        >
          <input 
            type={ type } 
            onChange={ ({ target: { value }}) => {
              this.setState(({ values, checked }) => 
                ({ 
                  values: { ...values, [name]: value },
                  checked: { ...checked, [name]: new RegExp(regex).test(value) }
                }))
              this.setState(({ checked }) => {
                const completed = Object
                  .keys(checked)
                  .filter(prop => checked[prop] === true)
                return { completed: Math.round(completed.length / fields.length * 100) + '%' }
              })
            }}
            onFocus={ () => 
              this.setState({ focused: name }) }
            onBlur={ () => {
              this.setState(({ values: { [name]: value = '' }, checked }) => 
                ({ 
                  checked: { ...checked, [name]: new RegExp(regex).test(value) || errorHint || '' }, 
                  focused: null
                }))
            }}
          />
          <span>{ `${name}${typeof checked[name] === 'string' ? `. ${errorHint || 'Invalid value'}` : ''}` }</span>
        </InputContainer>
      )
    })

    const ProgressButton = styled(StyledButton)`
      color: ${ !completed || completed === '0%' ? 'rgb(234, 50, 170)' : 'rgb(255, 255, 255)' };
      background: linear-gradient(to right, rgb(134, 50, 170), rgb(184, 50, 170) ${completed}, transparent ${completed});
      animation: blink ${!completed || completed === '0%' ? '0s' : '1s'} steps(20, start) 0s infinite alternate;
      cursor: ${ completed === '100%' ? 'pointer' : 'not-allowed' };
      @keyframes blink {
        from { background-color: rgb(255, 255, 255); }
        to { background-color: rgb(255, 220, 255); }
      }
    `
   
    return (
      <form>
        { fields }
        <ProgressButton
          type='button'
          disabled={ completed !== '100%' }
          onClick={ this.handleSubmit }
        >
          Submit
        </ProgressButton>
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

/*Hello. I looked at myself 2 options:
https://x-house.co.jp/en/sharehouse/adachiku-en-2/sa-xross147/
https://x-house.co.jp/en/sharehouse/adachiku-en-2/sa-xross149/
One of them cost 39 000 yen and other 30 000. What difference between them?
Generally, I'm looking for private apartment near Nippori station. Toilet and shower can be shared but only with small amount of people (3-4 per one unit).
Required private facilities: bed, fridge, air-con (very important), table, some sort of closet. It seem's like all of them are included in this two rooms which I mentioned above.
A'm planning to entry Japan in 31th March - 1st April.*/
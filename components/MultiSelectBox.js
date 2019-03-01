import React from 'react'
import styled from 'styled-components'

import { InputContainer } from './Input'

const SelectBoxTitle = styled(InputContainer)`
  font: bold 14px / 30px Montserrat, sans-serif;
  color: rgb(255, 255, 255);
  text-align: right;
  text-transform: uppercase;
  background: linear-gradient(to right, rgb(134, 50, 170), rgb(78, 42, 166));
  cursor: pointer;

  &:before {
    background-image: url(../images/arrow_white.png);
    transform: rotate(90deg);
    transition: transform 0.5s ease;
  }

  &.opened:before {
    transform: rotate(270deg);
  }
`

const SelectBoxList = styled.ul`
  margin: 0 5px;
  max-height: 0;
  overflow: hidden;
  list-style: none;
  background-color: rgb(243, 240, 246);
  border-radius: 0 0 4px 4px;
  box-shadow: -2px 2px 6px rgb(206, 188, 223);
  cursor: pointer;
  transition: max-height 0.5s ease;

  &.opened {
    max-height: 200px;
  }

  li {
    position: relative;
    padding: 5px 16px 0 16px;
    font: 12px / 20px Segoe, sans-serif;
    color: rgb(91, 91, 91);
    text-align: left;
    text-transform: uppercase;
    border-bottom: 1px solid rgb(193, 183, 228);

    &:hover {
      background-color: rgb(221, 221, 221);
    }

    &.active:after {
      content: '';
      position: absolute;
      top: 7px;
      right: 10px;
      border: 6px solid rgb(134, 50, 170);
      border-radius: 50%;
    }
  }
`

export class AwesomeMultiSelectBox extends React.Component {
  constructor (props) {
    super(props)
    const { title, list = [] } = this.props
    this.state = { 
      title, list, 
      isOpen: false,
      selectedOptions: []
    }
  }

  render () {
    let { title, list, isOpen, selectedOptions } = this.state
    list = list.map((value, i) => (
      <li 
        key={ i }
        onClick={ this.toggleOption }
        className={ selectedOptions.includes(value.toUpperCase()) ? 'active' : 'not-active' }
      >{ value }</li>
    ))
    return (
      <div>
        <SelectBoxTitle 
          onClick={ this.toggleList } 
          className={ isOpen ? 'opened' : 'closed' }
        >{ title }</SelectBoxTitle>
        <SelectBoxList
          className={ isOpen ? 'opened' : 'closed' }
        >{ list }</SelectBoxList>
      </div>
    )
  }

  toggleList = () => {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }))
  }

  toggleOption = (e) => {
    const { innerText } = e.target
    const { selectedOptions } = this.state
    const newSelectedOptions = selectedOptions.includes(innerText)
      ? selectedOptions.filter(value => value !== innerText)
      : [ ...selectedOptions, innerText ]
    this.setState({ selectedOptions: newSelectedOptions })
    this.props.cb(newSelectedOptions)
  }
}
import React from 'react'
import reactDOM from 'react-dom'

import { AwesomeMultiSelectBox } from './components/MultiSelectBox'
import { AwesomeSearchInput } from './components/SearchInput'
import { AwesomeInputForm} from './components/InputForm'

const query = `
  query OutputPayload ($field1: String, $field2: String, $field3: String) {
    outputPayload (field1: $field1, field2: $field2, field3: $field3) {
      field1
      field2
    }
  }
`

reactDOM.render(
  <div>
    <AwesomeMultiSelectBox 
      title='Choose genre'
      list={[ 'Hentai', 'Seinen', 'Echi', 'Horror' ]}
      cb={options => console.log('Options', options)}
    />
    <AwesomeSearchInput 
      cb={text => console.log('Search text', text) }
    />
    <AwesomeInputForm 
      url='https://polar-tundra-68721.herokuapp.com/graphql' 
      query={ query } 
      onResponse={ e => console.log(e) }
    >
      <input name='field1' type='email' />
      <button>Wont be displayed</button>
      <input name='field2' type='password' />
      <input name='field3' type='password' />
    </AwesomeInputForm>
  </div>, 
  document.querySelector('#app')
)
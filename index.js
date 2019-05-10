import React from 'react'
import reactDOM from 'react-dom'

import { AwesomeSwitcher } from './components/Switcher'
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
    <AwesomeSwitcher>
      <AwesomeMultiSelectBox
      title='Choose genre'
      list={[ 'Hentai', 'Seinen', 'Echi', 'Horror' ]}
      url='https://otaku-collection-api.herokuapp.com/graphql' 
      query={ query } 
      onResponse={ e => console.log(e) }
      />
      <AwesomeSearchInput 
        cb={text => console.log('Search text', text) }
      />
      <AwesomeInputForm 
        url='https://otaku-collection-api.herokuapp.com/graphql' 
        query={ query } 
        onResponse={ e => console.log(e) }
      >
        <input name='field1' type='email' regex='^olehdesu@gmail.com$' error-hint='Should be valid email' />
        <button>Wont be displayed</button>
        <input name='field2' type='password' regex='^.{8,}$' />
        <input name='field3' type='password' regex='^.{8,}$' />
      </AwesomeInputForm>
    </AwesomeSwitcher>
  </div>, 
  document.querySelector('#app')
)
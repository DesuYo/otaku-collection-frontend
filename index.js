import React from 'react'
import reactDOM from 'react-dom'

import AwesomeMultiSelectBox from './components/MultiSelectBox'
import { AwesomeSearchInput } from './components/SearchInput'


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
  </div>, 
  document.querySelector('#app')
)
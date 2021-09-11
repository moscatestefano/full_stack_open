import React, {useEffect, useState} from 'react'
import Filter from './components/Filter'
import Results from './components/Results'
import axios from 'axios'

const App = () => {

  const [ states, setState ] = useState([])
  const [ newName, setNewName ] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => setState(response.data)
    )}, [])

  const handleFilterChange = (event) => {
    setNewName(event.target.value)
  }

  const refine = (newName.trim() !== '')
  ? states.filter(state => state.name.toLowerCase().includes(newName))
  : states

  return (
    <div>
      <Filter value={newName} onChange={handleFilterChange}/>
      <Results pool={refine}/>
    </div>
  )

}

export default App;

import axios from 'axios'
import React, { useState, useEffect } from 'react'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  const fullTextUrl = `https://restcountries.com/v3.1/name/${name}?fullText=true`
  
  useEffect(() => {
    if (name !== '')
      axios.get(fullTextUrl)
      .then(response => {
        setCountry({data: response, found: true})
      })
  }, [name])
  
  if (country) {
    console.log(fullTextUrl, country.data.data[0])
    return country
  }
  else 
    return null
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }
  
  return (
    <div>
      <h3>{country.data.data[0].name.official} </h3>
      <div>capital {country.data.data[0].capital} </div>
      <div>population {country.data.data[0].population}</div> 
      <img src={country.data.data[0].flag} height='100' alt={`flag of ${country.data.data[0].name.official}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App

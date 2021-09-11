import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import AddForm from './components/AddForm'
import PeopleList from './components/PeopleList'
import Notification from './components/Notification'
import numberService from './services/numberService'

const App = () => {

  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState('')
  const [ successMessage, setSuccessMessage ] = useState('')

  useEffect(() => {
    numberService
    .getAll()
    .then(response => setPersons(response.data)
    )}, [])

  const submit = (event) => {
    event.preventDefault()

    let nameHolder = []
    persons.forEach(persona => nameHolder.push(persona.name))
    const match = persons.find(persona => persona.name === newName)

    if (match !== undefined) {
      let result = window.confirm(`${newName} is already present in the phonebook. Do you want to update the entry?`)
      if (result)
        update(match.id)
    }
    else {

      const newEntry = {name: newName, number: newNumber, id: (persons.length===0)? 1 : persons[persons.length - 1].id +1}

      numberService
      .create(newEntry)
      .then(response => {
        setPersons(persons.concat(newEntry))
        setNewName('')
        setNewNumber('')
        setSuccessMessage(`${response.data.name} has been added.`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
      })
    }
  }

  const update = id => {
    const entry = persons.find(person => person.name === newName)
    
    const updatedEntry = {...entry, number: newNumber}

    numberService
    .update(id, updatedEntry)
    .then(response => {
      setPersons(persons.map(person => person.name !== newName ? person : response.data))
      setNewName('')
      setNewNumber('')
      setSuccessMessage(`${response.data.name} has been updated.`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    })
    .catch(error => {
      console.log(error)
      setErrorMessage(
        `${error} was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    })
  }

  const cancelEntry = (event) => {
    const reference = event.target.attributes.idref.value
    const match = persons.find(person => person.id == reference)
    
    let result = window.confirm(`${match.name} is going to be deleted. Do you wish to continue?`)

    if (result) {
      numberService
      .cancel(reference)
      .then(response => {
        setPersons(persons.filter(person => person.id != reference))
        setSuccessMessage(`${match.name} has been deleted.`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  const peopleToShow = (filter.trim() !== '') 
  ? persons.filter(person => person.name.toLowerCase().includes(filter))
  : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification className="error" message={errorMessage} />
      <Notification className="success" message={successMessage} />
      <Filter value={filter} onChange={handleFilterChange}/>
      <h3>Add a new entry</h3>
      <AddForm onSubmit={submit} nameValue={newName} nameHandle={handleNameChange} phoneValue={newNumber} phoneHandle={handlePhoneChange} />
      <h3>Numbers</h3>
      <PeopleList peopleToShow={peopleToShow} delref={cancelEntry}/>
    </div>
  )
}

export default App
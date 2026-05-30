import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Person = ({ person, deletePerson }) => {
  return <li>{person.name} {person.number} <DeletePersonButton deletePerson={deletePerson} id = {person.id} /></li>
}
const Persons = ({filtered, deletePerson}) => {
  return (
  <ul>
    {filtered.map(person => 
      <Person key={person.name} person={person} deletePerson={deletePerson}/>
    )}
  </ul>
  )
}

const Filter = ({filter, handleFilterChange}) => {
  return (
    <p>
      filter shown with <input 
        type="search"  
        value={filter}
        onChange={handleFilterChange}
      />
    </p>
  )
}

const DeletePersonButton = ({deletePerson, id}) => {
  return (
    <button onClick={() => deletePerson(id)}>
      delete
    </button>
  )
}

const PersonForm = ({addPerson, newName, newNumber, handleNameChange, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
        <div>
          name: 
          <input value={newName} 
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: 
          <input value={newNumber}
          onChange={handleNumberChange}
          />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
      </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    personService
    .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

    const handleNameChange = (event) => {
      setNewName(event.target.value)  
    }

    const handleNumberChange = (event) => {
      setNewNumber(event.target.value)  
    }

    const handleFilterChange = (event) => {
      setFilter(event.target.value)
    }

    const personsToShow = persons.filter(person =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )

    const addPerson = (event) => {
      event.preventDefault()
      const personObject = {
        name: newName,
        number: newNumber
      }
      if (persons.find((person) => person.name === newName) != undefined) {
        const personToUpdate = persons.find((person) => person.name === newName)
        updateNumber(personToUpdate.id, personObject)
      } else {
        personService
          .create(personObject)
            .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))      
            setNewName('')
            setNewNumber('')  
          })
      }
    }

    const deletePerson = (id) => {
      const deletedHuman = persons.find((person) => person.id === id)
      if (window.confirm("Delete " + deletedHuman.name)) {
        personService
          .deleteP(id)
            .then(deletedPerson => {
              setPersons(persons.filter(person => person.id !== deletedPerson.id))
            })
      }
    }

    const updateNumber = (id, personObject) => {
      const updateName = persons.find((person) => person.id === id)
      if (window.confirm(updateName.name + " is allready in the phonebook, replace the old number with a new one?")) {
        personService
          .update(id, personObject)
            .then(updatedPerson => {
              setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))  
              setNewName('')
              setNewNumber('')  
            })
      }
    }

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
        <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
        <Persons filtered={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
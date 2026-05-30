import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Notification from './components/Notification'
import ErrorNotification from './components/Notification'

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
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorNotificationMessage, setErrorNotificationMessage] = useState(null)

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
            setNotificationMessage('Added ' + returnedPerson.name)
            setTimeout(() => {          
              setNotificationMessage(null)        
            }, 5000)
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
              setNotificationMessage('Deleted ' + deletedPerson.name)
              setTimeout(() => {          
              setNotificationMessage(null)  
            }, 5000)
            })
      }
    }

    const updateNumber = (id, personObject) => {
      const updateHuman = persons.find((person) => person.id === id)
      if (window.confirm(updateHuman.name + " is allready in the phonebook, replace the old number with a new one?")) {
        personService
          .update(id, personObject)
            .then(updatedPerson => {
              setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))  
              setNewName('')
              setNewNumber('')  
              setNotificationMessage('Updated ' + updatedPerson.name)
              setTimeout(() => {          
              setNotificationMessage(null)
            }, 5000)
            })
            .catch(error => {
              setErrorNotificationMessage('Information of ' + updateHuman.name + ' has allready been removed from server')
              setPersons(persons.filter(person => person.id !== updateHuman.id))
              console.log('fail')
            })
      }
    }

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={notificationMessage} />
        <ErrorNotification message={errorNotificationMessage} />
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
        <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
        <Persons filtered={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
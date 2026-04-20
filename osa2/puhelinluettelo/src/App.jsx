import { useState } from 'react'

const Person = ({ person }) => {
  return <li>{person.name} {person.number}</li>
}

const Persons = ({filtered}) => {
  return (
  <ul>
    {filtered.map(person => 
      <Person key={person.name} person={person}/>
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
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
      if (persons.find((element) => element.name === newName) != undefined) {
        alert(`${newName} is already added to phonebook`)
      } else {
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
      }
    }

  return (
    <div>
      <h2>Phonebook</h2>
          <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
       <Persons filtered={personsToShow}/>
    </div>
  )

}

export default App
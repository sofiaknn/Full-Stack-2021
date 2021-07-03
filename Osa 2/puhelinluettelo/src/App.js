import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showAll, setShowAll ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')


  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const namesToShow = showAll
   ? persons
   : persons.filter(n => n.name.toLowerCase().includes(newFilter.toLowerCase()))

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const nameObject = {
      name: newName,
      number: newNumber
    }  
    if (persons.some(e => e.name.toLowerCase() === newName.toLowerCase())) {
      const person = persons.find(n => n.name.toLowerCase() === newName.toLowerCase())
      const changedNumber = {...person, number: newNumber}
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(person.id, changedNumber)
          .then(returnedPerson => {
          setPersons(persons.map(person => person.name.toLowerCase() !== newName.toLowerCase() ? person: returnedPerson))
          setMessage(`Updated ${newName}`
          )
          setTimeout(() => {
           setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            `${newName} was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(n => n.name !== newName))
        })
      }
    }
    else {
      personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${newName}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
  }
  const delName = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
      .del(id)
      .then(() => {
      setPersons(persons.filter(person => person.id !== id))
      setMessage(`Deleted ${name}`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      })
      .catch(error => {
        setErrorMessage(`${name} was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }
  const ErrorNotification = ({ errorMessage }) => {
    if (errorMessage === null) {
      return null
    }
  
    return (
      <div className="error">
        {errorMessage}
      </div>
    )
  }
  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="succeed">
        {message}
      </div>
    )
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <ErrorNotification errorMessage={errorMessage} />
      <Filter filter={newFilter} handler={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm submit={addName} name={newName} handlerName={handleNameChange}
      number={newNumber} handlerNumber={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons names={namesToShow} persons={persons} filter={newFilter} click={delName}/>
    </div>
  )

}
const Filter = (props) => {
  console.log(props)
  return (
    <div>filter shown with <input value = {props.filter}
      onChange = {props.handler}/>
    </div>
  )
}
const PersonForm = (props) => {
  return(
    <form onSubmit={props.submit}>
        <div> name: <input value={props.name} 
        onChange={props.handlerName} /> </div>
        <div>number: <input value={props.number} 
        onChange={props.handlerNumber}/></div>
        <div><button type="submit">add</button></div>
      </form>
  )
}
const Persons = (props) => {
  const nameArray = props.names
  return (
    <div>
      {nameArray.map(k =>
       <p key={k.name}>
       {k.name} {k.number} <button onClick={() => {
         {props.click(k.id, k.name)}
       }}>delete</button>
      </p>
      )}
    </div>
  )
}

export default App

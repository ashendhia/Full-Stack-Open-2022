import React from "react"
import { useState } from "react"
import personService from '../services/Person'

const Form = ({ persons, setPersons, notification, setNotification }) => {

  const [newPerson, setNewPerson] = useState(
    {
      name: '',
      phoneNumber: ''
    }
  )

  const handleNameChange = (event) => {
    setNewPerson({ name: event.target.value, phoneNumber: newPerson.phoneNumber })
  }
  const handleNumberChange = (event) => {
    setNewPerson({ name: newPerson.name, phoneNumber: event.target.value })
  }

  const addPerson = (event) => {
    event.preventDefault()
    let exists = false
    let id
    for (let person of persons)
      if (person.name === newPerson.name) {
        exists = true
        id = person.id
      }

    if (!exists) {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotification({
            type: 'green',
            message: `Added ${newPerson.name}`
          })
          setTimeout(() => {
            setNotification({
              type: null,
              message: ''
            })
          }, 5000)
        })
        .catch(error => {
          setNotification({
            type: 'red',
            message: String(error.response.data.error)
          })
          setTimeout(() => {
            setNotification({
              type: null,
              message: ''
            })
          }, 5000)
        })
    }
    else if (exists && (newPerson.phoneNumber === persons.find(person => person.name === newPerson.name).phoneNumber)) {
      alert(`${newPerson.name} is already added to phonebook`)
    }
    else {
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService.update(id, newPerson).then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          setNotification({
            type: 'green',
            message: `Updated ${newPerson.name}`
          })
          setTimeout(() => {
            setNotification({
              type: null,
              message: ''
            })
          }, 5000)
        }
        )
      }
    }
    setNewPerson({ name: '', phoneNumber: '' })
  }
  return (
    <form onSubmit={addPerson}>
      <h3>add a new</h3>
      <div>
        name: <input
          value={newPerson.name}
          onChange={handleNameChange}
        />
      </div>
      <div>
        number: <input
          value={newPerson.phoneNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default Form
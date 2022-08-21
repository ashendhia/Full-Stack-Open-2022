import { useState, useEffect } from 'react'
import personService from './services/Person'
import Filter from './components/Filter'
import Form from './components/Form'
import Numbers from './components/Number'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState({
    type:null,
    message:''
  })

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }


  let reg = RegExp(newFilter, 'i')
  const personsToShow = (newFilter === '')
    ? persons
    : persons.filter(person => reg.test(person.name))

  useEffect(() => {
    personService.
      getAll().
      then(
        initialPersons => setPersons(initialPersons))
  }, [])
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filter={newFilter} handleFilterChange={handleFilterChange} />
      <Form persons={persons} setPersons={setPersons} notification={notification} setNotification={setNotification} />
      <Numbers personsToShow={personsToShow} persons={persons} setPersons={setPersons} notification={notification} setNotification={setNotification} />
    </div>
  )
}

export default App
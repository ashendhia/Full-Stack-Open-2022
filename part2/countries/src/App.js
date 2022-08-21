import { useEffect, useState } from 'react'
import axios from 'axios'

import {Countries, Filter} from './components/Countries'

const App = () => {

  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState({
    state: true,
    index: -1
  })

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
    setShowAll(
      {
        state: true,
        index: -1
      })
  }

  let reg = RegExp(newFilter, 'i')
  const countriesToShow = (newFilter === '')
    ? []
    : countries.filter(country => reg.test(country.name.common))


  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  return (
    <>
      <Filter filter={newFilter} handleFilterChange={handleFilterChange} />
      <Countries countries={countriesToShow} showAll={showAll} setShowAll={setShowAll} />
    </>
  )
}
export default App;

import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = ({ type }) => {

    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const [foundCountry, setFoundCountry] = useState(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const countryREST = await axios.get(`https://restcountries.com/v3.1/name/${value}?fullText=true`)
                setFoundCountry(countryREST.data[0])
            }
            catch (error) {
                setFoundCountry(null)
            }
        }

        fetchData()
    }, [value])

    return {
        filter: {
            type: type,
            value: value,
            onChange: onChange
        },
        foundCountry
    }
}
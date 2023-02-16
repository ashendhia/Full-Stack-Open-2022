import { useEffect, useState } from 'react'
import axios from 'axios'

let token = null

export const useField = (type) => {
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

export const useResource = baseUrl => {

    const [resource, setResource] = useState([])
    const [run, setRun] = useState(true)

    const setToken = newToken => {
        token = `bearer ${newToken}`
    }

    const getAll = async () => {
        const response = await axios.get(baseUrl)
        setResource(response.data)
    }

    const create = async newObject => {
        const config = {
            headers: { Authorization: token },
        }

        const response = await axios.post(baseUrl, newObject, config)
        return response.data
    }

    const update = async (id, newObject) => {
        const response = await axios.put(`${baseUrl}/${id}`, newObject)
        return response.data
    }

    useEffect(() => {
        getAll()
    }, [run])

    return ([
        resource,
        {
            setToken,
            create,
            update,
            run,
            setRun
        }

    ])

}

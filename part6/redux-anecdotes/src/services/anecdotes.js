import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = {
        content,
        votes: 0
    }
    const response = await axios.post(baseUrl, object)
    console.log(response.data)
    return response.data
}

const updateOld = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject).then(response => {
        console.log(response.data)
        return response.data
    })
}

export default {
    getAll,
    createNew,
    updateOld
}
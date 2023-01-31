import { useSelector, useDispatch } from 'react-redux'
import { modifyAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/messageReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => handleClick(anecdote)}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        if (filter === '') {
            return anecdotes
        }
        return anecdotes.filter(anecdote => anecdote.content.includes(filter))
    })
    const dispatch = useDispatch()

    const vote = async (anecdoteToChange) => {
        const changedAnecdote = {
            ...anecdoteToChange,
            votes: anecdoteToChange.votes + 1
        }
        dispatch(modifyAnecdote(changedAnecdote))
        dispatch(setNotification(`you voted '${changedAnecdote.content}'`, 5))
    }

    return (
        <>
            {anecdotes.map(anecdote =>
                <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={vote} />
            )}
        </>
    )
}

export default AnecdoteList

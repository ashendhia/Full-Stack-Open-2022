import { useQuery, useMutation, useQueryClient } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotificationDispatch } from './NotificationContext'
import { getAnecdotes, updateAnecdote } from './requests'

const App = () => {
  const dispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (changedAnecdote) => {
      const oldAnecdotes = queryClient.getQueryData('anecdotes')
      const updatedAnecdotes = oldAnecdotes.map(anecdote =>
        anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote
      )
      updatedAnecdotes.sort((a, b) => (a.votes > b.votes) ? -1 : 1)
      queryClient.setQueryData('anecdotes', updatedAnecdotes)
    }
  })

  const result = useQuery('anecdotes', getAnecdotes, {
    refetchOnWindowFocus: false
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({ type: "NEW_MESSAGE", content: `anecdote '${anecdote.content}' voted` })
    setTimeout(() => {
      dispatch({ type: "NULL" })
    }, 5000)
  }

  const anecdotes = result.data.sort((a, b) => (a.votes > b.votes) ? -1 : 1)

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

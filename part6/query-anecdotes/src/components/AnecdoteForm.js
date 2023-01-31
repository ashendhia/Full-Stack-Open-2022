import { useMutation, useQueryClient } from 'react-query'
import { useNotificationDispatch } from '../NotificationContext'
import { createAnecdote } from '../requests'

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      dispatch({ type: "NEW_MESSAGE", content: `anecdote '${newAnecdote.content}' added` })
      setTimeout(() => {
        dispatch({ type: "NULL" })
      }, 5000)
    },
    onError: () => {
      dispatch({ type: "NEW_MESSAGE", content: 'too short anecdote, must have length 5 or more' })
      setTimeout(() => {
        dispatch({ type: "NULL" })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

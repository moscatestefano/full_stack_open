import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer.js'
import { setNotification } from '../reducers/notificationReducer'

const NewAnecdote = ({createAnecdote, setNotification}) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    createAnecdote(content)
    setNotification(`'${content}' has been added.`, 5)
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

const ConnectedAnecdoteForm = connect(null, { createAnecdote, setNotification })(NewAnecdote)

export default ConnectedAnecdoteForm
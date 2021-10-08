import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer.js'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, index }) => {
    const dispatch = useDispatch()

    const voteHandler = () => {
      dispatch(vote(anecdote))
      dispatch(setNotification(`You voted for '${anecdote.content}'`, 5))
    }

    return (
    <div>
        <h2>Anecdote #{index}</h2>
        <div>
            {anecdote.content}
        </div>
        <div>
            has {anecdote.votes} votes.
            <button onClick={voteHandler}>Vote</button>
        </div>
    </div>
    )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(({filter, anecdotes}) => {
    if ( filter === null ) {
      return anecdotes
    }
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  })

  return(
    anecdotes.sort((a, b) => b.votes - a.votes).map((anecdote, i) => <Anecdote key={anecdote.id} anecdote={anecdote} index={i+1}/>)
  )
}

export default AnecdoteList
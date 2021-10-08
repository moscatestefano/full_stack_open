import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log("STATE", state, "ACTION", action)

  switch(action.type) {
    case 'NEW':
      return state.concat(action.data)
    case 'VOTE': {
      const anecdoteToUpdate = state.find(anecdote => anecdote.id === action.data.id)
      const votedAnecdote = {
        ...anecdoteToUpdate,
        votes: anecdoteToUpdate.votes + 1
      }
      return state.map(anecdote => anecdote.id !== action.data.id ? anecdote : votedAnecdote)
     }
    case 'ON_INIT':
      return action.data
    default:
      return state
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW',
      data: newAnecdote,
    })
  }
}

export const vote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update({...anecdote, votes: anecdote.votes + 1})
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'ON_INIT',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer
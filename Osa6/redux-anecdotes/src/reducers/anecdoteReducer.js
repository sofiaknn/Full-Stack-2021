import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'ADD':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data
    case 'INCREAMENT':
      const { id } = action.data
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : votedAnecdote
      )
    default:
      return state
  }
}

export const voteAnecdote = (votedAnecdote) => {
  return async (dispatch) => {
    const anecdote = {
      ...votedAnecdote,
      votes: votedAnecdote.votes + 1,
    }
    const updatedAnecdote = await anecdoteService.update(anecdote)
    const { id } = updatedAnecdote
    dispatch({
      type: 'INCREAMENT',
      data: { id }
    })
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer
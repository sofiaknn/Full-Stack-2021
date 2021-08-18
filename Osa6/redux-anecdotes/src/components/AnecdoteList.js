import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"

const Anecdote = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
      if (state.filter === null) {
        return state.anecdotes
      }
      return state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
    })
    console.log(anecdotes)

    const vote = (votedAnecdote) => {
        const anecdote = anecdotes.find(a => a.id === votedAnecdote.id)
        dispatch(voteAnecdote(votedAnecdote))
        
        dispatch(setNotification(`You voted ${anecdote.content}`, 5))
    }

    return(
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
    )
}
export default Anecdote
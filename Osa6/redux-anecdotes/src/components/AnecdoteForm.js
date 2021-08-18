import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"

const NewAnecdote = (props) => {

    const add = async (event) => {

        event.preventDefault()
        const anecdote = event.target.anecdote.value
        console.log(anecdote)
        event.target.anecdote.value = ''
        props.addAnecdote(anecdote)

        props.setNotification(`You added ${anecdote}`, 5)

    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={add}>
                <div><input name="anecdote"/></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        filter: state.filter,
    }
}

const mapDispatchToProps = { addAnecdote, setNotification }

const ConnectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(NewAnecdote)
export default ConnectedAnecdoteForm
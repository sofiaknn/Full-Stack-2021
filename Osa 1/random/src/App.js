import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [todos, setTodos] = useState([0, 0, 0, 0, 0, 0, 0])

  const handleUpdate = (index, todo) => {
    const copy = [...todos];
    copy[index] = todo;
    setTodos(copy);
  }

  console.log(todos)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {todos[selected]} votes</div>
      <Button handleClick={() => handleUpdate(selected, todos[selected]+1)} text="vote"/>
      <Button handleClick={() => setSelected(Math.floor(Math.random() * 7))} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[todos.indexOf(Math.max(...todos))]}</div>
      <div>has {todos[todos.indexOf(Math.max(...todos))]} votes</div>
      <div></div>
    </div>
  )
}


export default App
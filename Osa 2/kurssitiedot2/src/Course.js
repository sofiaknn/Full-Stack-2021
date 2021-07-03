import React from 'react'

const Course = (props) => {
  console.log(props)
  const { course } = props
  return(
  <div>
    <Header course={course}/>
    <Content part={course.parts}/>
    <Total parts={course.parts}/>
  </div>
  )
}
const Header = (props) => {
  const { course } = props
  console.log({course}) 
  return (
    <div>
      <h2>{course.name}</h2>
    </div>
  )
}
const Content = (props) => {
  const { part } = props
  return (
    <div>
      <Part parts={part}/>
    </div>
  )
}
const Part = (props) => {
  const { parts } = props
  return (
    <div>
      {parts.map(p =>
        <p key={p.id}>
          {p.name} {p.exercises}
        </p>
      )}
    </div>
  )
}
const Total = (props) => {
  const { parts } = props
  const e = parts.map(p => p.exercises)
  const total = e.reduce((a, b) => a+b, 0)
  return (
    <div>
      <b>total of {total} exercises</b>
    </div>
  )
}

export default Course

import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good +1)} text="good" />
      <Button handleClick={() => setNeutral(neutral +1)} text="neutral" />
      <Button handleClick={() => setBad(bad +1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const StatisticLine = (props) => {
  return (
    <div>
      <div>{props.text} {props.value} {props.mark}</div>
    </div>
  )
}

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
  return (
    <p>No feedback given</p>
  )
  }
  else {
    return(
      <div>
        <table>
          <tbody>
            <tr>
            <td>
              <StatisticLine text="good"/>
              <StatisticLine text="neutral"/>
              <StatisticLine text="bad"/>
              <StatisticLine text="all" />
              <StatisticLine text="average" />
              <StatisticLine text="positive" />
            </td>
            <td>
              <StatisticLine value={props.good}/>
              <StatisticLine value={props.neutral}/>
              <StatisticLine value={props.bad}/>
              <StatisticLine value={props.good + props.neutral + props.bad}/>
              <StatisticLine value={(props.good*1+props.neutral*0+props.bad*-1)/(props.good+props.neutral+props.bad)}/>
              <StatisticLine value={props.good/(props.good+props.bad+props.neutral)*100} mark="%" />
            </td>
          </tr>
          </tbody>
        </table>
      </div> 
    )
  }
}

export default App
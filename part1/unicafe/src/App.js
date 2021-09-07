import React, { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Report = ({text, value}) => <><td>{text}</td><td>{value}</td></>

const Statistics = ({good, neutral, bad}) => {

  const total = good + bad + neutral
  const average = (good / total) - (bad / total)
  const positive = (good / total) * 100

  if (total > 0)
    return (
      <>
        <tr>
          <StatisticsLine text="Total: " value={total} />
        </tr>
        <tr>
          <StatisticsLine text="Average score: " value={average} />
        </tr>    
        <tr>
          <StatisticsLine text="Positive rating(%): " value={positive} />
        </tr>
      </>
    )
  else
      return <tr><td>No feedback given.</td></tr>
}

const StatisticsLine = ({text, value}) => <><td>{text}</td><td>{value}</td></>

const App = () => {

  const [ good, setGood ] = useState(0)
  const [ bad, setBad ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)

  return (
    <div className="App">
      <h1>
        Give feedback
      </h1>

      <Button onClick={() => setGood(good + 1)} text='good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button onClick={() => setBad(bad + 1)} text='bad' />

      <h1>
        Statistics
      </h1>
      <table>
        <tbody>
          <tr>
            <Report text="good" value={good} />
          </tr>
          <tr>
            <Report text="neutral" value={neutral} />
          </tr>
          <tr>
            <Report text="bad" value={bad} />
          </tr>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </tbody>
      </table>
    </div>
  );

}

export default App;

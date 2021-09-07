import React, { useState } from 'react'

const Button = ({clickHandle, text}) => <button onClick={clickHandle}>{text}</button>

const VoteCounter = ({textBefore, votes, textAfter}) => <p>{textBefore} <b>{votes}</b> {textAfter}</p>

const MostVoted = ({totalVotes, anecdotes}) => {
  let highest = 0
  let index = 0

  for (let i = 0; i < totalVotes.length; i++)
    if (totalVotes[i] > highest) {
      highest = totalVotes[i]
      index = i
    }

  if (highest === 0)
    return <p>No anecdote has been voted yet.</p>
  else
    return <p>{anecdotes[index]}</p>
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const emptyArray = Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf, 0)

  const [ selected, setSelected ] = useState(0)
  const [ totalVotes, setVote ] = useState(emptyArray)

  function addVote() {

    const copy = [...totalVotes]
    copy[selected] += 1
    setVote(copy)

  }

  return (
    <div>
      <h1>
        Anecdote of the day
      </h1>
      {anecdotes[selected]}
      <VoteCounter textBefore="This anecdote has been voted" votes={totalVotes[selected]} textAfter="time(s)"/>
      <br />
      <Button clickHandle={() => addVote()} text="vote" />
      <Button clickHandle={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text="next anecdote" />
      <h1>
        Anecdote with most votes
      </h1>
      <MostVoted totalVotes={totalVotes} anecdotes={anecdotes}/>
    </div>
  )
}

export default App
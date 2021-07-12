import React, { useState } from 'react'

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
    ]
    
    const length = anecdotes.length;
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(length).fill(0));

    const randomAnecdote = () => {
        const randomInt = (Math.floor(Math.random() * length));
        setSelected(randomInt)
    }

    const voteAnecdote = () => {
        const copy = { ...votes }
        copy[selected] += 1
        setVotes(copy)
    }

    const getMaxAndIndex = votes => {
        let max = 0
        let index = 0
        console.log(votes.length)
        for (let i = 0; i < length; i++) {
            if (votes[i] > max) {
                max = votes[i]
                index = i
            }
        }
        return [max, index];
    }

    const [max, index] = getMaxAndIndex(votes)
    
    return (
        <div>
            <h2>Anecdote of the day</h2>
            <p>{anecdotes[selected]}</p>
            <p>has {votes[selected]} votes</p>
            <Button handleClick={voteAnecdote}text="vote" />
            <Button handleClick={randomAnecdote} text="next anecdote" />
            <h2>Anecdote with most votes</h2>
            <p>{anecdotes[index]}</p>
            <p>has {max} votes</p>
        </div>
    )
}

export default App
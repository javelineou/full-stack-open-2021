import React, { useState } from 'react'

const Heading = (props) => {
    return (
        <>
            <h1>{props.text}</h1>
        </>
    )
}

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const StatsTable = ({statistics}) => {
    if (statistics.length===0) {
        return <p>no feedback given</p>
    }
    return (
        <>
        <table>
            <tbody>
                {statistics.map( (statistics, index) => {
                    return (
                        <tr key={index}>
                            <td>{statistics.text}</td>
                            <td>{statistics.value}</td>
                        </tr>
                    )
                })}
            </tbody>
            </table>
            </>
        )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const statsArr = []
    const average = useState(0)
    const positive = useState(0)

    const setToGood = newGood => {
        setGood(newGood)
    }
    const setToNeutral = newNeutral => {
        setNeutral(newNeutral)
    }
    const setToBad = newBad => {
        setBad(newBad)
    }
    
    const all = good + neutral + bad
    if (all !== 0) {
        statsArr.push({ text: 'good', value: good })
        statsArr.push({ text: 'neutral', value: neutral })
        statsArr.push({ text: 'bad', value: bad })
        statsArr.push({ text: 'all', value: all })
        let average = (good - bad) / all;
        let positive = (good * 100) / all + '%';
        statsArr.push({ text: 'average', value: average })
        statsArr.push({ text: 'positive', value: positive })
    }
    console.log(good, neutral, bad, all)
    console.log(average, positive)
    console.log(statsArr)

    return (
        <div>
            <Heading text="give feedback" />
            <Button handleClick={() => setToGood(good + 1)} text="good" />
            <Button handleClick={() => setToNeutral(neutral + 1)} text="neutral" />
            <Button handleClick={() => setToBad(bad + 1)} text="bad" />
            <Heading text="statistics" />
            <StatsTable statistics={statsArr} />
        </div>
    )
}

export default App;
import { useState } from 'react'

const History = (props) => {
  if (props.total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <Statistics good = {props.good} neutral = {props.neutral} bad = {props.bad} total = {props.total} average = {props.average} positive = {props.positive} />
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  console.log(props);
  return (
  <div>
    <p>
      <span>good {props.good}</span>
    </p>
    <p>
      <span>neutral {props.neutral}</span>
    </p>
    <p>
      <span>bad {props.bad}</span>
    </p>
     <p>
      <span>all {props.total}</span>
    </p>
    <p>
      <span>average {props.average}</span>
    </p>
    <p>
      <span>positive {props.positive} % </span>
    </p>
  </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = newValue => {
    console.log('good value now', newValue)
    setGood(newValue)
  }

  const setToNeutral = newValue => {
    console.log('neutral value now', newValue)
    setNeutral(newValue)
  }

  const setToBad = newValue => {
    console.log('bad value now', newValue)
    setBad(newValue)
  }

  let total = good + neutral + bad;

  let average = total === 0 ? 0: (good - bad)/(total);

  let positive = total === 0 ? 0: (good / total) * 100;

  return (
    <div>
      <h1> Give feedback </h1>
      <Button onClick={() => setToGood(good + 1)} text="good" />
      <Button onClick={() => setToNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setToBad(bad + 1)} text="bad" />
      <h1> Statistics </h1>
      <History good = {good} neutral = {neutral} bad = {bad} total = {total} average = {average} positive = {positive} />
    </div>
  )
}

export default App
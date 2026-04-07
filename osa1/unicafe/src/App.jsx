import { useState } from 'react'

const Display = props => (
  <span>{props.value}</span>
)

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

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

  return (
    <div>
      <h1> Give feedback </h1>
      <Button onClick={() => setToGood(good + 1)} text="good" />
      <Button onClick={() => setToNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setToBad(bad + 1)} text="bad" />
      <h1> Statistics </h1>
      <p>
        good <Display value={good} />
      </p>
      <p>
        neutral <Display value={neutral} />
      </p>
      <p>
        bad <Display value={bad} />
      </p>
    </div>
  )
}

export default App
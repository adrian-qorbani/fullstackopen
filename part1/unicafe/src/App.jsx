import { useState } from "react";
import './App.css';


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState([]);

  const onClickGood = () => {
    setGood(good + 1);
    setTotal(total + 1);
    setAverage(average.concat(1));
  };

  const onClickNeutral = () => {
    setNeutral(neutral + 1);
    setTotal(total + 1);
    setAverage(average.concat(0));
  };

  const onClickBad = () => {
    setBad(bad + 1);
    setTotal(total + 1);
    setAverage(average.concat(-1));
  };

  const calcAverage = (array) => {
    if (array.length === 0) {
      return "Not Enough Votes.";
    }
    return array.reduce((a, b) => a + b, 0) / array.length;
  };

  const calcPercentage = (array) => {
    if (array.length === 0) {
      return 0;
    }
    const totalNoOfVotes = array.length;
    const positives = array.filter((vote) => vote > 0);
    return (positives.length * 100) / totalNoOfVotes;
  };

  return (
    <>
      <h1>Unicafe</h1>
      <h3>Give Feedback</h3>
      <div>
        <Button handleClick={onClickGood} text="Good" />
        <Button handleClick={onClickNeutral} text="Neutral" />
        <Button handleClick={onClickBad} text="Bad" />
      </div>
      <h3>Statistics</h3>
      <div>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
        <p>Total: {total}</p>
        <p>Average: {calcAverage(average)}</p>
        <p>Percentage: {calcPercentage(average)} %</p>
      </div>
    </>
  );
}

export default App;

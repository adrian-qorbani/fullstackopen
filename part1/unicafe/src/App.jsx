import { useState } from "react";
import "./App.css";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onClickGood = () => {
    console.log(good)
    setGood(good + 1);
  };

  const onClickNeutral = () => {
    console.log(neutral)
    setNeutral(neutral + 1);
  };

  const onClickBad = () => {
    console.log(bad)
    setBad(bad + 1);
  };

  return (
    <>
      <h1>Unicafe</h1>
      <h3>Give Feedback</h3>
      <div className="card">
        <button onClick={() => onClickGood()}>Good</button>
        <button onClick={() => onClickNeutral()}>Neutral</button>
        <button onClick={() => onClickBad()}>Bad</button>
      </div>
      <h3>Statistics</h3>
      <div>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
      </div>
    </>
  );
}

export default App;

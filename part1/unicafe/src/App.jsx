import { useState } from "react";
import "./App.css";

const StatisticLine = ({ data, value }) => {
  return (
    <tr>
      <td>
        {data} {value}
      </td>
    </tr>
  );
};

const Statistics = ({ votes }) => {
  const total = votes.good + votes.neutral + votes.bad;
  const average = (votes.good + votes.bad * -1) / total;
  const positive = votes.good * (100 / total);

  if (total === 0) {
    return (
      <>
        <p>No Feedback Given.</p>
      </>
    );
  }

  return (
    <>
      <table>
        <tbody>
          <StatisticLine data="Good:" value={votes.good} />
          <StatisticLine data="Neutral:" value={votes.neutral} />
          <StatisticLine data="Bad:" value={votes.bad} />
          <StatisticLine data="Total Votes:" value={total} />
          <StatisticLine data="Average:" value={average} />
          <StatisticLine data="Positives:" value={positive} />
        </tbody>
      </table>
    </>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

function App() {
  const [votes, setVote] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleGoodVote = () => {
    setVote({ ...votes, good: votes.good + 1 });
    console.log(votes);
  };

  const handleNeutralVote = () => {
    setVote({ ...votes, neutral: votes.neutral + 1 });
    console.log(votes);
  };

  const handleBadVote = () => {
    setVote({ ...votes, bad: votes.bad + 1 });
    console.log(votes);
  };

  return (
    <>
      <h1>Unicafe</h1>
      <h3>Give Feedback</h3>
      <div>
        <Button handleClick={handleGoodVote} text="Good" />
        <Button handleClick={handleNeutralVote} text="Neutral" />
        <Button handleClick={handleBadVote} text="Bad" />
      </div>
      <h3>Statistics</h3>
      <Statistics votes={votes} />
    </>
  );
}

export default App;

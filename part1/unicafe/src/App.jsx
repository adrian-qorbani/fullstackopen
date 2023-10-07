import { useState } from "react";
import "./App.css";

// Variables
const PAGE_TITLE = "Unicafe";

// Page Title Component
const Title = ({ text }) => <h1>{text}</h1>;

// Page Headers Component
const Header = ({ text }) => <h3>{text}</h3>;

// Page Desc
const PageDesc = () => (
  <h4>
    A Cafeteria Feedback System made in React by Adrian |{" "}
    <a href="https://github.com/adrian-qorbani/fullstackopen/tree/main/part1/unicafe">
      Github Repo
    </a>
  </h4>
);

// Single Statistic Component
const StatisticLine = ({ data, value }) => {
  return data === "Positives:" ? (
    <tr>
      <td>
        {data} {value} %
      </td>
    </tr>
  ) : (
    <tr>
      <td>
        {data} {value}
      </td>
    </tr>
  );
};

// Statistics Component
const Statistics = ({ votes }) => {
  const total = votes.good + votes.neutral + votes.bad;
  const average = (votes.good + votes.bad * -1) / total;
  const positive = votes.good * (100 / total);

  // if there aren't any votes ...
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

// Button Component
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

// App Component
function App() {
  // All three kind of votes used within a useState
  const [votes, setVote] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  // Event Handles defined
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

  // App Render
  return (
    <>
      <Title text={PAGE_TITLE} />
      <PageDesc />
      <Header text="Give Feedback" />
      <Button handleClick={handleGoodVote} text="Good" />
      <Button handleClick={handleNeutralVote} text="Neutral" />
      <Button handleClick={handleBadVote} text="Bad" />
      <Header text="Statistics" />
      <Statistics votes={votes} />
    </>
  );
}

export default App;

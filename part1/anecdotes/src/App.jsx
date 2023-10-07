import { useState } from "react";
import "./App.css";

// Anecdote Renderer Component
const AnecdoteDisplay = ({ index, votes }) => {
  return (
    <>
      <p>{index}</p>
      <p>has {votes} votes</p>
    </>
  );
};

// Button Component
const Button = ({ text, clickHandler }) => (
  <button onClick={clickHandler}>{text}</button>
);

// Page Title Component
const PageTitle = ({ text }) => <h1>{text}</h1>;

// Page Description
const PageDesc = ({ text }) => (
  <h3 className="desc">
    An Anecdote Generator |{" "}
    <a href="https://github.com/adrian-qorbani/fullstackopen/tree/main/part1/anecdotes">
      Github Repo
    </a>
  </h3>
);

function App() {
  // Anecdotes Array
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  // Anecdotes Array Index State
  const [selected, setSelected] = useState(0);
  const [votes, setVote] = useState(Array(anecdotes.length).fill(0));

  // Random Index Chooser
  const randomChooserClick = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));

  // Vote Click Handler
  let voteClickHandler = () => {

    console.log(votes);
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVote(newVotes);

  };

  // Renderer
  return (
    <>
      <PageTitle text="Software Engineering Anecdotes" />
      <PageDesc />
      <div className="card">
        <Button text="Next Anecdote" clickHandler={randomChooserClick} />
        <Button text="Vote" clickHandler={voteClickHandler} />
        <AnecdoteDisplay index={anecdotes[selected]} votes={votes[selected]} />
      </div>
    </>
  );
}

export default App;

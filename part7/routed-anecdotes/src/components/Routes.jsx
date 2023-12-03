import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
// import AnecdoteList from "./AnecdoteList";
import CreateNew from "./CreateNew";
import About from "./About";
import Users from "./Users";

const AppRouters = ({ anecdotes, addNew }) => {
  // Single Anecdote
  const Anecdote = ({ anecdotes }) => {
    const id = useParams().id;
    const note = anecdotes.find((n) => n.id === Number(id));
    return (
      <div>
        <h2>{note.content}</h2>
        <div>{note.author}</div>
      </div>
    );
  };
  // Anecdote List
  const AnecdoteList = ({ anecdotes }) => (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <>
      <Routes>
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdotes={anecdotes} />}
        />
        <Route
          path="/anecdotes"
          element={<AnecdoteList anecdotes={anecdotes} />}
        />
        <Route path="/users" element={<Users />} />
        <Route path="/new" element={<CreateNew addNew={addNew} />} />
        <Route path="/" element={<About />} />
      </Routes>
    </>
  );
};

export default AppRouters;

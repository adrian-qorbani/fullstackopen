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
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material'

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
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {anecdotes.map((anecdote) => (
              <TableRow key={anecdote.id}>
                <TableCell>
                  <Link to={`/anecdotes/${anecdote.id}`}>
                    {anecdote.content}
                  </Link>{" "}
                </TableCell>
                <TableCell>{anecdote.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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

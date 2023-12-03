import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AnecdoteList from "./AnecdoteList";
import CreateNew from "./CreateNew";
import About from "./About";

const AppRouters = ({anecdotes, addNew}) => {
  
  return (
    <>
      <Routes>
        <Route
          path="/anecdotes"
          element={<AnecdoteList anecdotes={anecdotes} />}
        />
        <Route path="/new" element={<CreateNew addNew={addNew} />} />
        <Route path="/" element={<About />} />
      </Routes>
    </>
  );
};

export default AppRouters;

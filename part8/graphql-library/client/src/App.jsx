import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import "./App.css";
import Authors from "./components/Authors";

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const App = () => {
  const result = useQuery(ALL_AUTHORS);
  // console.log(result.data)
  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Authors authors={result.data.allAuthors} />
    </>
  );
};

export default App;

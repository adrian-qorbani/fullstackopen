import Authors from "./components/Authors";
import "./App.css";
import Books from "./components/Books";
import BookForm from "./components/BookForm";

const App = () => {
  return (
    <>
      <BookForm />
      <Authors />
      <Books />
    </>
  );
};

export default App;

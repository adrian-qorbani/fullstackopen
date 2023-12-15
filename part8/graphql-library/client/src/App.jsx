import Authors from "./components/Authors";
import "./App.css";
import Books from "./components/Books";
import BookForm from "./components/BookForm";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";

const App = () => {
  const padding = {
    padding: 6,
  };

  return (
    <Router>
      <div className="navbar">
        <Link style={padding} to="/">
          HOME
        </Link>
        <Link style={padding} to="/authors">
          AUTHORS
        </Link>
        <Link style={padding} to="/books">
          LIBRARY
        </Link>
        <Link style={padding} to="/bookform">
          ADD BOOK
        </Link>
        <Link style={padding} to="/login">
          Log In
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/bookform" element={<BookForm />} />
        <Route path="/login" element={<Books />} />
      </Routes>

      {/* <BookForm />
      <Authors />
      <Books /> */}
      <div>
        <i>Library Collection App, Mahdi GH. 2023</i>
      </div>
    </Router>
  );
};

export default App;

import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useApolloClient } from "@apollo/client";

import { LOGIN } from "./utils/queries";

import Authors from "./components/Authors";
import "./App.css";
import Books from "./components/Books";
import BookForm from "./components/BookForm";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Notify from "./components/Notify";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Profile from "./components/Profile";

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const client = useApolloClient();

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setErrorMessage(error.graphQLErrors[0].message);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    },
  });

  useEffect(() => {
    if (result.data) {
      console.log("result data:", result.data);
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
    }
  }, [result.data]);

  const handleLogin = async (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  const padding = {
    padding: 10,
  };

  return (
    <>
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

          {token === null ? (
            <Link style={padding} to="/login">
              Log In
            </Link>
          ) : (
            <>
              {" "}
              |{" "}
              <Link style={padding} to="/bookform">
                Add Book
              </Link>{" "}
              <Link style={padding} to="/profile">
                User Profile
              </Link>{" "}
              <a style={padding} onClick={() => logout()}>
                Log Out
              </a>
            </>
          )}
        </div>
        <Notify errorMessage={errorMessage} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/books" element={<Books />} />
          <Route path="/bookform" element={<BookForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/login"
            element={
              <LoginForm
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
                submit={handleLogin}
              />
            }
          />
        </Routes>

        <Footer />
        <a style={padding} onClick={() => logout()}>
          Log Out
        </a>
      </Router>{" "}
    </>
  );
};

export default App;

import { Link } from "react-router-dom";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <>
      <div>
        <Link style={padding} to="/">
          HOME
        </Link>{" "}
        |{" "}
        <Link style={padding} to="/anecdotes">
          ANECDOTES
        </Link>{" "}
        |{" "}
        <Link style={padding} to="/new">
          NEW ANECDOTE
        </Link>{" "}
        |{" "}
        <Link style={padding} to="/users">
          USERS
        </Link>
      </div>
      <div>
        <h1>Software Engineering Anecdotes</h1>
      </div>
    </>
  );
};

export default Menu;

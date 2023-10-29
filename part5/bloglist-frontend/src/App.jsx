import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  // const [blogs, setBlogs] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogListAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    // console.log("logging in with", username, password);

    try {
      const user = await loginService.login({ username, password });
      console.log(`${user.name} successfully logged in.`);
      // console.log(user)
      window.localStorage.setItem(
        "loggedBlogListAppUser",
        JSON.stringify(user)
      );

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Invalid credentials.");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username:
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password:
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const addBlog = async (event) => {
    event.preventDefault();

    try {
      const blog = await blogService.create({ title, author, url });
      setAuthor("");
      setTitle("");
      setUrl("");
      setBlogs(blogs.concat(blog));
    } catch (exception) {
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        <label>
          title:
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          author:
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          url:
          <input value={url} onChange={({ target }) => setUrl(target.value)} />
        </label>
      </div>
      <button type="submit">Save</button>
    </form>
  );

  const userCp = () => {
    return (
      <div>
        <p>{user.name} logged in.</p>
        <button
          onClick={() => {
            window.localStorage.clear();
            window.location.reload(true);

          }}
        >
          Log Out
        </button>
      </div>
    );
  };

  const blogList = () => {
    return (
      <div>
        <h3>Blogs</h3>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2>Favorite Blog List</h2>
      {!user && loginForm()}
      <Notification message={errorMessage} />
      {user && (
        <div>
          {/* <p>{user.name} logged in.</p>  */}
          {userCp()}
          {blogForm()}
          {blogList()}
        </div>
      )}{" "}
    </div>
  );
};

export default App;

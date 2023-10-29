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

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    // console.log("logging in with", username, password);

    try {
      const user = await loginService.login({ username, password });
      console.log(`${user.name} successfully logged in.`);
      // console.log(user)
      blogService.setToken(user.token)
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

  const addBlog = () => {
    
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <label>
        title:
        <input value={newTitle} onChange={handleBlogChange} />
      </label>
      <label>
        author:
        <input value={newAuthor} onChange={handleBlogChange} />
      </label>
      <label>
        url:
        <input value={newUrl} onChange={handleBlogChange} />
      </label>
      <button type="submit">Save</button>
    </form>
  );

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
          <p>{user.name} logged in.</p>
          {blogList()}
        </div>
      )}{" "}
    </div>
  );
};

export default App;

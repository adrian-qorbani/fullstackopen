import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/Login";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import "./style.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [loginVisible, setLoginVisible] = useState(false);

  const blogFormRef = useRef();

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

    try {
      const user = await loginService.login({ username, password });
      console.log(`${user.name} successfully logged in.`);
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

  // const loginForm = () => (
  //   <form onSubmit={handleLogin}>
  //     <div>
  //       Username:
  //       <input
  //         type="text"
  //         value={username}
  //         name="Username"
  //         onChange={({ target }) => setUsername(target.value)}
  //       />
  //     </div>
  //     <div>
  //       Password:
  //       <input
  //         type="password"
  //         value={password}
  //         name="Password"
  //         onChange={({ target }) => setPassword(target.value)}
  //       />
  //     </div>
  //     <button type="submit">login</button>
  //   </form>
  // );

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>Login</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>Cancel</button>
        </div>
      </div>
    );
  };

  // const addBlog = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const blog = await blogService.create({ title, author, url });
  //     setAuthor("");
  //     setTitle("");
  //     setUrl("");
  //     setBlogs(blogs.concat(blog));
  //     setErrorMessage("new blog added.");
  //     setTimeout(() => {
  //       setErrorMessage("");
  //     }, 5000);
  //   } catch (exception) {
  //     setTimeout(() => {
  //       setErrorMessage("");
  //     }, 5000);
  //   }
  // };

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
    });
  };

  // const blogForm = () => (
  //   <form onSubmit={addBlog}>
  //     <div>
  //       <label>
  //         title:
  //         <input
  //           value={title}
  //           onChange={({ target }) => setTitle(target.value)}
  //         />
  //       </label>
  //     </div>
  //     <div>
  //       <label>
  //         author:
  //         <input
  //           value={author}
  //           onChange={({ target }) => setAuthor(target.value)}
  //         />
  //       </label>
  //     </div>
  //     <div>
  //       <label>
  //         url:
  //         <input value={url} onChange={({ target }) => setUrl(target.value)} />
  //       </label>
  //     </div>
  //     <button type="submit">Save</button>
  //   </form>
  // );

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
          <div class="blog">
            <Blog key={blog.id} blog={blog} />
          </div>
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
          {userCp()}
          <Togglable buttonLabel="Add Blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogList()}
        </div>
      )}{" "}
    </div>
  );
};

export default App;

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

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      await blogService.create(blogObject).then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setErrorMessage("new blog added.");
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      });
    } catch (exception) {
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  const likeBlog = async (id, blogObject) => {
    await blogService.update(id, blogObject).then((returnedBlog) => {
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
    });
  };

  // const deleteBlog = async (id) => {
  //   await blogService.delete(id).then((returnedBlog) => {
  //     setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
  //   });
  // };

  const deleteBlog = async (targetBlog) => {
    try {
      if (window.confirm(`Are you sure to delete ${targetBlog.title}?`)) {
        blogService.blogDelete(targetBlog.id);
        setErrorMessage(`'${targetBlog.title}' was successfully deleted.`);
        setBlogs(blogs.filter((blog) => blog.id !== targetBlog.id));
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    } catch (exception) {
      setErrorMessage(`Unable to delete ${targetBlog.title}.`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const userCp = () => {
    return (
      <div>
        <p>
          <span className="cp">{user.name}</span> logged in.
        </p>
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
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <div key={blog.id} className="blog">
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={likeBlog}
                deleteBlog={deleteBlog}
              />
            </div>
          ))}
      </div>
    );
  };

  return (
    <div>
      <h1>Favorite Blog List</h1>
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

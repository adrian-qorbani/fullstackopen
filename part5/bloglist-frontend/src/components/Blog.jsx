import { useState } from "react";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    console.log(`you clicked`);
    setVisible(!visible);
  };

  const likePost = () => {
    console.log(`post liked.`);
  };

  const removeBlog = () => {
    console.log(`post removed.`);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 10,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const btnLabel = visible ? "Hide" : "Show";

  return (
    // <div>
    //   {blog.title} <span className="written">written by</span> {blog.author}{" "}
    //   <button onClick={toggleVisibility}>show</button>
    // </div>
    <div style={blogStyle} className="blog">
      <div>
        <p>
          {blog.title} <span className="written">written by</span> {blog.author}{" "}
          <button onClick={toggleVisibility}>{btnLabel}</button>
        </p>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>
          {/* {blogObject.likes}{" "}
          <button id="like-button" onClick={likePost}>
            Like
          </button> */}
        </p>
        <button id="remove" onClick={removeBlog}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default Blog;

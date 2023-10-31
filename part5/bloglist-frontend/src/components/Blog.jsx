import { useState } from "react";

const Blog = ({ blog , updateBlog, deleteBlog}) => {
  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? "" : "none" };
  const [blogObject, setBlogObject] = useState(blog);
  const [user, setUser] = useState(blogObject.user.username);

  const toggleVisibility = () => {
    console.log(`you clicked`);
    setVisible(!visible);
  };
  
  const likePost = () => {
    console.log(`post liked.`);
    const likedPost = { ...blog, likes: blog.likes + 1 };
    console.log(likedPost.id, likedPost)
    updateBlog(likedPost.id, likedPost);
    setBlogObject(likedPost);
  };

  const removeBlog = () => {
    console.log(`post removed.`);

    const targetBlog = { ...blog};
    // console.log(deleteBlog)
    deleteBlog(targetBlog)

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
    <div style={blogStyle} className="blog">
      <div>
        <p>
          {blog.title} <span className="written">written by</span> {blog.author}{" "}
          <button onClick={toggleVisibility}>{btnLabel}</button>
        </p>
        <p></p>
      </div>
      <div style={showWhenVisible}>
        <a href={blog.url}>{blog.url}</a>
        <p>
          {blogObject.likes}{" "}
          <button id="like-button" onClick={likePost}>
            ❤ like
          </button>
        </p>
        added by <span className="written">{user}</span>{" "}
        <button id="remove" onClick={removeBlog}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default Blog;


import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <label>
          title:
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label>
          author:
          <input
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </label>
        <label>
          url:
          <input value={url} onChange={(event) => setUrl(event.target.value)} />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default BlogForm;

// const BlogForm = ({ onSubmit, handleTitleChange, handleAuthorChange, handleUrlChange, titleValue, authorValue, urlValue }) => {
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <div>
//           <label>
//             title:
//             <input
//               value={titleValue}
//               onChange={handleTitleChange}
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             author:
//             <input
//               value={authorValue}
//               onChange={handleAuthorChange}
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             url:
//             <input
//               value={urlValue}
//               onChange={handleUrlChange}
//             />
//           </label>
//         </div>
//         <button type="submit">Add</button>
//       </form>
//     </div>
//   );
// };

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

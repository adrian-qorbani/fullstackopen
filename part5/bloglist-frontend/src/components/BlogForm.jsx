const BlogForm = ({ onSubmit, handleTitleChange, handleAuthorChange, handleUrlChange, titleValue, authorValue, urlValue }) => {
  // return (
  //   <div>
  //     <h2>Add a new blog</h2>

  //     <form onSubmit={onSubmit}>
  //       <input
  //         value={value}
  //         onChange={handleChange}
  //       />
  //       <button type="submit">save</button>
  //     </form>
  //   </div>
  // )

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            title:
            <input
              value={titleValue}
              onChange={handleTitleChange}
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input
              value={authorValue}
              onChange={handleAuthorChange}
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input
              value={urlValue}
              onChange={handleUrlChange}
            />
          </label>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default BlogForm
import { useState } from "react";
import { useField } from "../hooks";

const CreateNew = (props) => {
  // const [content, setContent] = useState("");
  // const [author, setAuthor] = useState("");
  // const [info, setInfo] = useState("");
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          {/* <input
            type={content.type}
            value={content.value}
            onChange={content.onChange}
          /> */}
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default CreateNew;

const Authors = ({ authors }) => {

  const tableStyle = {
    border: "1px solid #ddd",
    borderCollapse: "collapse",
    width: "100%",
  };
  const thStyle = {
    border: "1px solid #ddd",
    backgroundColor: "#f2f2f2",
    padding: "8px",
    textAlign: "left",
  };
  const tdStyle = {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  };

  return (
<div>
      <h2>Authors</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Born</th>
            <th style={thStyle}>Book Count</th>
          </tr>
        </thead>
        <tbody>
          {authors.map(author =>
            <tr key={author.name}>
              <td style={tdStyle}>{author.name}</td>
              <td style={tdStyle}>{author.born}</td>
              <td style={tdStyle}>{author.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Authors;

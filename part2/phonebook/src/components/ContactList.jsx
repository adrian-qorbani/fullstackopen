const ContactList = ({ persons, showPerson, onClickDelete }) => {
  return (
    <div>
      <div id="wrapper">
        <h1>Contact List</h1>
        <table id="keywords" cellSpacing="0" cellPadding="0">
          <thead>
            <tr>
              <th>
                <span>Name</span>
              </th>
              <th>
                <span>Number</span>
              </th>
              <th>
                <span>Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {persons
              .filter((person) => {
                return showPerson.toLowerCase() === ""
                  ? person
                  : person.name.toLowerCase().includes(showPerson);
              })
              .map((person) => (
                <tr key={person.id}>
                  <td className="lalign">{person.name}</td>
                  <td>{person.number}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => onClickDelete(person.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
        <footer id="footer">
          <p>
            Created and designed by <a href="">Adrian Ghorbani</a> 2023 |{" "}
            <a href=""> Source Code</a>
          </p>{" "}
        </footer>
    </div>
  );
};
export default ContactList;

const ContactList = ({ persons, showPerson, onClickDelete }) => {
  return (
    <div>
      {persons
        .filter((person) => {
          return showPerson.toLowerCase() === ""
            ? person
            : person.name.toLowerCase().includes(showPerson);
        })
        .map((person) => (
            <div key={person.id}>
              {person.name} * {person.number}
              <button onClick={() => onClickDelete(person.id)}>delete</button>
            </div>
        ))}
    </div>
  );
};

export default ContactList;

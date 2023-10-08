const ContactList = ({persons, showPerson}) => {
  return (
    <div>
      {persons
        .filter((person) => {
          return showPerson.toLowerCase() === ""
            ? person
            : person.name.toLowerCase().includes(showPerson);
        })
        .map((person) => (
          <p key={person.name}>
            {person.name} * {person.number}
          </p>
        ))}
    </div>
  );
};

export default ContactList
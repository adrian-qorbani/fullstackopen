import { useState } from "react";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("Marty Byrd");
  const [newNumber, setNewNumber] = useState("000-000-000");
  const [showPerson, setShowPerson] = useState("");

  // adding new name to form
  const addNewName = (e) => {
    e.preventDefault();
    console.log(newName, newNumber);

    // check for duplicate name
    if (persons.find((x) => x.name == newName)) {
      alert(`${newName} is already added to the phonebook.`);
      return;
    }

    // define a new contact
    const personObject = {
      name: newName,
      number: newNumber,
    };
    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  // on change handlers
  const handleNameInputChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberInputChange = (e) => {
    setNewNumber(e.target.value);
  };
  const handleSearchInputChange = (e) => {
    setShowPerson(e.target.value);
    console.log(e.target.value);
  };

  // filter search
  // const personsToShow = showPerson ? persons : persons.filter(persons => persons.name === showPerson)
  // const personsToShow = persons.filter(persons => persons.name === showPerson)

  // renderer
  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        Search: <input value={showPerson} onChange={handleSearchInputChange} />
      </div>
      <h2>Add new contact:</h2>
      <form onSubmit={addNewName}>
        <div>
          Name: <input value={newName} onChange={handleNameInputChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberInputChange} />
        </div>
        <div>
          <button type="submit">ADD</button>
        </div>
      </form>
      <h2>Numbers</h2>
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
    </div>
  );
};

export default App;

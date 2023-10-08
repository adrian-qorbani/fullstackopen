import { useState } from "react";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("Marty Byrd");

  // adding new name to form
  const addNewName = (e) => {
    e.preventDefault();
    console.log("on change event listner works");

    const personObject = {
      name: newName
    };
    setPersons(persons.concat(personObject))
    setNewName('')
  };

  // on change handler
  const handleInputChange = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value)
  }

  // renderer
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person =><p key={person.name}>{person.name}</p>)}
      </div>
    </div>
  );
};

export default App;

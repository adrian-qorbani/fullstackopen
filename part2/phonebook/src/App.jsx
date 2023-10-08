import { useState } from "react";
import "./App.css";
import Title from "./components/Title";
import Search from "./components/Search";
import Header from "./components/Header";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

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
  };

  // renderer
  return (
    <div>
      <Title text="Phonebook" />
      <Search
        filteredPerson={showPerson}
        evHandler={handleSearchInputChange}
      />
      <Header text="Add new contact: " />
      <ContactForm
        addNewName={addNewName}
        newName={newName}
        newNumber={newNumber}
        handleNameInputChange={handleNameInputChange}
        handleNumberInputChange={handleNumberInputChange}
      />
      <Header text="Numbers" />
      <ContactList persons={persons} showPerson={showPerson}/>
    </div>
  );
};

export default App;

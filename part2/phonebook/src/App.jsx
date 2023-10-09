import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import personService from "./services/person";
import Title from "./components/Title";
import Search from "./components/Search";
import Header from "./components/Header";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("Marty Byrd");
  const [newNumber, setNewNumber] = useState("000-000-000");
  const [showPerson, setShowPerson] = useState("");

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes')

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
    // setPersons(persons.concat(personObject));
    // setNewName("");
    // setNewNumber("");
    // used axios to save contact to backend
    axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        console.log(response);
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
      })
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

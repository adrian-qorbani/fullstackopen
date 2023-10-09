import { useState, useEffect } from "react";
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
    personService.getAll().then((initialPerson) => {
      setPersons(initialPerson);
    });
  }, []);

  // adding new name to form
  const addNewName = (e) => {
    // Filter contacts to match duplicate names with different number
    const dumPerson = persons.filter((person) => person.name == newName);
    // const updatedPerson = {name:"John",number:"000-412-999", id: 1}
    const updatedPerson = { ...dumPerson[0], number: newNumber };

    e.preventDefault();
    if (persons.find((x) => x.name == newName && x.number == newNumber)) {
      alert(`${newName} is already added to the phonebook.`);
      return;
    } else if (persons.find((x) => x.name == newName)) {
      alert(
        `${newName} is already added to the phonebook with a different number.`
      );
      // ????????????????
      personService
        .update(updatedPerson.id, updatedPerson)
        .then((returnedPerson) => {
          console.log(`${returnedPerson.name} updated.`);
        });
      return;
    }

    // define a new contact
    const personObject = {
      name: newName,
      number: newNumber,
    };

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  // removing a contact from contact list
  const handlePersonDelete = (id) => {
    const filteredPerson = persons.filter((person) => person.id === id);
    if (window.confirm(`Do you want to delete ${filteredPerson[0].name}?`)) {
      personService.personDelete(filteredPerson[0].id);
      console.log(`${filteredPerson[0].name} is removed.`);
    }
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
      <Search filteredPerson={showPerson} evHandler={handleSearchInputChange} />
      <Header text="Add new contact: " />
      <ContactForm
        addNewName={addNewName}
        newName={newName}
        newNumber={newNumber}
        handleNameInputChange={handleNameInputChange}
        handleNumberInputChange={handleNumberInputChange}
      />
      <Header text="Numbers" />
      <ContactList
        persons={persons}
        showPerson={showPerson}
        onClickDelete={handlePersonDelete}
      />
    </div>
  );
};

export default App;

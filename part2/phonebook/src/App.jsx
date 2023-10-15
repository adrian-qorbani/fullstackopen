import { useState, useEffect, useReducer } from "react";
import "./App.css";
import personService from "./services/person";
import Title from "./components/Title";
import Search from "./components/Search";
import Header from "./components/Header";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showPerson, setShowPerson] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [update, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    personService.getAll().then((initialPerson) => {
      setPersons(initialPerson);
    });
  }, [update]);

  // adding new name to form
  const addNewName = (e) => {
    const filterPerson = persons.filter((person) => person.name == newName);
    const updatedPerson = { ...filterPerson[0], number: newNumber };

    e.preventDefault();
    if (persons.find((x) => x.name == newName && x.number == newNumber)) {
      setErrorMessage(`${newName} is already added to the phonebook.`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return;
    } else if (persons.find((x) => x.name == newName)) {
      setErrorMessage(`${newName} is already added to the phonebook with a different number. Updating ...`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      personService
        .update(updatedPerson.id, updatedPerson)
        .then((returnedPerson) => {
          console.log(`${returnedPerson.name} updated.`);
        })
        .catch(() => {
          setErrorMessage(`${newName} is already removed from the phonebook.`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });

      // force update to refresh the component
      forceUpdate();
      return;
    }

    // define a new contact
    const personObject = {
      name: newName,
      number: newNumber,
    };

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setErrorMessage(`${newName} added successfully.`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      setNewName("");
      setNewNumber("");
    }).catch((error) => {
      setErrorMessage(`${error.response.data.error}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000)
    });
  };

  // removing a contact from contact list
  const handlePersonDelete = (id) => {
    const filteredPerson = persons.filter((person) => person.id === id);
    if (window.confirm(`Do you want to delete ${filteredPerson[0].name}?`)) {
      personService.personDelete(filteredPerson[0].id);
      // console.log(`${filteredPerson[0].name} is removed.`);
      setErrorMessage(`${filteredPerson[0].name} is removed.`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      forceUpdate();
    }
    return;
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
      <div>
        <Title text="Phonebook" />{" "}
      </div>
      <Search filteredPerson={showPerson} evHandler={handleSearchInputChange} />
      <br />
      <Notification message={errorMessage} />
      <ContactForm
        addNewName={addNewName}
        newName={newName}
        newNumber={newNumber}
        handleNameInputChange={handleNameInputChange}
        handleNumberInputChange={handleNumberInputChange}
      />
      <ContactList
        persons={persons}
        showPerson={showPerson}
        onClickDelete={handlePersonDelete}
      />
    </div>
  );
};

export default App;

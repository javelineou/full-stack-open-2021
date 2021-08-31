import axios from "axios";
import React, { useState, useEffect } from "react";
import personService from "./services";

const Notification = ({ message, type }) => {
  if (message === null) return null;
  if (type === "error") {
    return <div className="error">{message}</div>;
  } else if (type === "notif") {
    return <div className="notif">{message}</div>;
  } else {
    return <div className="update">{message}</div>;
  }
};

const Filter = ({ newSearch, handleSearchChange }) => {
  return (
    <div>
      filter shown with{" "}
      <input value={newSearch} onChange={handleSearchChange} />
    </div>
  );
};

const Display = ({ array, newSearch, deletePerson }) => {
  //console.log(array);
  const filteredPersons =
    newSearch === ""
      ? array
      : array.filter((person) =>
          person.name
            .toLocaleLowerCase()
            .includes(newSearch.toLocaleLowerCase())
        );
  return (
    <div>
      {filteredPersons.map((array) => (
        <p key={array.id}>
          {array.name} {array.number}
          <button onClick={() => deletePerson(array.id)}>delete</button>
        </p>
      ))}
    </div>
  );
};

const PersonForm = ({
  addName,
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [notifMsg, setNotifMsg] = useState(null);
  const [typeNotif, setTypeNotif] = useState("");

  useEffect(() => {
    //console.log("effect");
    personService.getAll().then((response) => {
      //console.log("promise fullfiled");
      setPersons(response.data);
    });
  }, []);

  const replaceNumber = (newNumber) => {
    const wantToReplace = persons.find((array) => array.name === newName);
    const changedNumber = { ...wantToReplace, number: newNumber };

    personService.update(changedNumber, wantToReplace.id);
    setNewName("");
    setNewNumber("");
  };

  const addName = (event) => {
    event.preventDefault();

    if (persons.find((element) => element.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, do you want to replace the old number with a new one?`
        )
      ) {
        replaceNumber(newNumber);
        setTypeNotif("update");
        setNotifMsg(`${newName}'s number has been replaced.`);
        setTimeout(() => setNotifMsg(null), 5000);
        //window.location.reload();
      } else {
        setNewName("");
        setNewNumber("");
      }
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      };

      personService.create(nameObject).then((response) => {
        setPersons(persons.concat(response.data));
        setTypeNotif("notif");
        setNotifMsg(`${newName}'s number has been added.`);
        setTimeout(() => setNotifMsg(null), 5000);
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const deletePerson = (idKey) => {
    if (window.confirm("Are you sure?")) {
      const url = `http://localhost:3001/persons/${idKey}`;
      const wantToDelete = persons.find((array) => array.id === idKey);

      axios
        .delete(url, wantToDelete)
        .catch((error) => {
          setTypeNotif("error");
          setNotifMsg(
            `Information of ${wantToDelete.name} has already been removed from server.`
          );
          setTimeout(() => setNotifMsg(null), 5000);
        })
        .then(() => {
          setTypeNotif("notif");
          setNotifMsg(`${wantToDelete.name}'s number has been deleted`);
          setTimeout(() => setNotifMsg(null), 5000);
        });
    }
    //window.location.reload();
  };

  const handleNameChange = (event) => {
    //console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    //console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    //console.log(event.target.value);
    setNewSearch(event.target.value);
  };

  return (
    <div>
      <Notification message={notifMsg} type={typeNotif} />
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <br />
      <h3>Add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Display
        array={persons}
        newSearch={newSearch}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;

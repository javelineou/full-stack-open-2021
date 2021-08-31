import React, { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./Weather";

const Filter = ({ newSearch, handleSearchChange }) => {
  return <input value={newSearch} onChange={handleSearchChange} />;
};

const OneCountry = ({ theCountry }) => {
  return (
    <div>
      <h2>{theCountry.name}</h2>
      <p>capital {theCountry.capital}</p>
      <p>population {theCountry.population}</p>
      <h3>languages</h3>
      <ul>
        {theCountry.languages.map((language) => {
          return <li key={language.iso639_2}>{language.name}</li>;
        })}
      </ul>
      <img src={theCountry.flag} alt={theCountry.flag} width="200" />
      <Weather country={theCountry} />
    </div>
  );
};

const ShowButton = ({ country }) => {
  const [showCountry, setShowCountry] = useState(false);
  return (
    <div>
      <button onClick={() => setShowCountry(!showCountry)}>
        {showCountry ? "hide" : "show"}
      </button>
      {showCountry ? <OneCountry theCountry={country} /> : null}
    </div>
  );
};

const Display = ({ array, newSearch }) => {
  const filteredCountry =
    newSearch === ""
      ? array
      : array.filter((country) =>
          country.name
            .toLocaleLowerCase()
            .includes(newSearch.toLocaleLowerCase())
        );
  //console.log(filteredCountry);
  if (filteredCountry.length === 1) {
    return <OneCountry theCountry={filteredCountry[0]} />;
  } else if (filteredCountry.length < 10) {
    return (
      <div>
        {filteredCountry.map((country) => (
          <div key={country.name}>
            {country.name} <ShowButton country={country} />
          </div>
        ))}
      </div>
    );
  } else {
    return <p>Too many matches, specify another filter</p>;
  }
};

const App = () => {
  const [country, setCountry] = useState([]);
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    //console.log("effect");
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      //console.log("promise fulfilled");
      setCountry(response.data);
    });
  }, []);
  //console.log(country);

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);
    //console.log(event.target.value);
  };

  return (
    <div>
      find countries
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <Display array={country} newSearch={newSearch} />
    </div>
  );
};
export default App;

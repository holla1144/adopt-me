import React, { useContext, useEffect, useState } from "react";
import isNode from "is-node";
import pf, { ANIMALS } from "petfinder-client";

import ThemeContext from "./ThemeContext";
import useDropdown from "./useDropdown";
import Results from "./Results";

let petFinder;
if (!isNode) {
  petFinder = pf({
    key: process.env.API_KEY,
    secret: process.env.API_SECRET
  });
}

const SearchParams = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [pets, setPets] = useState([]);
  const [location, setLocation] = useState("Lansing, MI");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);

  async function requestPets() {
    console.log("request pets called");
    const res = await petFinder.pet.find({
      location,
      breed,
      animal,
      output: "full"
    });

    console.log(res);

    setPets(res.petfinder.pets.pet);
  }

  useEffect(() => {
    setBreed("");
    setBreeds([]);
    document.title = animal;
    petFinder.breed
      .list({ animal })
      .then(res => {
        setBreeds(res.petfinder.breeds.breed);
      })
      .catch(e => console.log(e));

    return () => {
      document.title = "Adopt Me!";
    };
  }, [animal]);

  return (
    <div className="search-params">
      <form
        onSubmit={e => {
          e.preventDefault();
          alert("submit");
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            onChange={e => setLocation(e.target.value)}
            id="location"
            value={location}
            placeholder="Location"
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <label htmlFor="theme">
          <select
            id="theme"
            value={theme}
            onBlur={e => setTheme(e.target.value)}
            onChange={e => setTheme(e.target.value)}
          >
            <option value="darkblue">Dark Blue</option>
            <option value="peru">Peru</option>
            <option value="mediumaquamarine">Medium Aquamarine</option>
            <option value="rebeccapurple">Rebecca Purple</option>
          </select>
        </label>
        <button
          onClick={() => alert("clicked")}
          style={{ backgroundColor: theme }}
        >
          Submit
        </button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;

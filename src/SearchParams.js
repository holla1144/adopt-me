import React, { useEffect, useState } from "react";

import pf, { ANIMALS } from "petfinder-client";
import useDropdown from "./useDropdown";
import Results from "./Results";

const petFinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

const SearchParams = () => {
  const [pets, setPets] = useState([]);
  const [location, setLocation] = useState("Lansing, MI");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);

  async function requestPets() {
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
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;

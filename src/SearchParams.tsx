import { RouteComponentProps } from "@reach/router";
import pf, {ANIMALS, Pet} from "petfinder-client";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState
} from "react";

import Results from "./Results";
import ThemeContext from "./ThemeContext";
import useDropdown from "./useDropdown";

if (!process.env.API_KEY || !process.env.API_SECRET) {
  throw new Error("No API keys available, what's wrong with you?");
}

const petFinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

const SearchParams: FunctionComponent<RouteComponentProps> = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [pets, setPets] = useState([] as Pet[]);
  const [location, setLocation] = useState("Lansing, MI");
  const [breeds, setBreeds] = useState([] as string[]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);

  async function requestPets() {
    const res = await petFinder.pet.find({
      animal,
      breed,
      location,
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
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;

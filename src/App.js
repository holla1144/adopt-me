import React from "react";
import ReactDOM from "react-dom";

import SearchParams from "./SearchParams";
// import Pet from "./Pet";

const App = () => {
  return (
    <div>
      <h1>Adopt Me!</h1>
      <SearchParams />
    </div>
  );
  // return React.createElement(
  //   "div",
  //   {},
  //   React.createElement("h1", { id: "brand" }, "Adopt Me!"),
  //   [
  //     React.createElement(Pet, {
  //       name: "Luna",
  //       animal: "Dog",
  //       breed: "Havanese"
  //     }),
  //     React.createElement(Pet, {
  //       name: "Pepper",
  //       animal: "Bird",
  //       breed: "Cockatiel"
  //     }),
  //     React.createElement(Pet, { name: "Doink", animal: "Cat", breed: "Mixed" })
  //   ]
  // );
};

ReactDOM.render(<App />, document.getElementById("root"));

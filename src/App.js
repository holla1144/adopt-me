import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";

import Details from "./Details";
import Navbar from "./Navbar";
import SearchParams from "./SearchParams";
import ThemeContext from "./ThemeContext";

const App = () => {
  const theme = useState("darkBlue");

  return (
    <React.StrictMode>
      <ThemeContext.Provider value={theme}>
        <div>
          <Navbar />
          <Router>
            <SearchParams path="/" />
            <Details path="/details/:id" />
          </Router>
        </div>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

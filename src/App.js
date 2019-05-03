import React, { useState } from "react";
import { Router } from "@reach/router";

import Details from "./Details";
import SearchParams from "./SearchParams";
import ThemeContext from "./ThemeContext";

const App = () => {
  const theme = useState("darkBlue");

  return (
    <React.StrictMode>
      <ThemeContext.Provider value={theme}>
        <div>
          <h1>Adopt Me!</h1>
          <Router>
            <SearchParams path="/" />
            <Details path="/details/:id" />
          </Router>
        </div>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

export default App;

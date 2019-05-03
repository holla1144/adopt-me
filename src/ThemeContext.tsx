import { createContext, Dispatch, SetStateAction } from "react";

const ThemeContext = createContext<[string, Dispatch<SetStateAction<string>>]>([
  "green",
  obj => obj
]);

export default ThemeContext;

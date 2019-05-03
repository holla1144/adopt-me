import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useState
} from "react";

const useDropdown = (
  label: string,
  defaultState: string,
  options: string[]
) => {
  const [state, setState] = useState(defaultState);
  const id = `use-dropdown-${label.replace(" ", "").toLowerCase()}`;

  const Dropdown = () => {
    return (
      <label htmlFor={id}>
        {label}
        <select
          id={id}
          value={state}
          onBlur={e => setState(e.target.value)}
          onChange={e => setState(e.target.value)}
          disabled={!options.length}
        >
          <option />
          {options.map(selectOption => (
            <option key={selectOption} value={selectOption}>
              {selectOption}
            </option>
          ))}
        </select>
      </label>
    );
  };

  return [state, Dropdown, setState] as [
    string,
    FunctionComponent,
    Dispatch<SetStateAction<string>>
  ];
};

export default useDropdown;

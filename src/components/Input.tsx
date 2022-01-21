import React, { useState } from "react";
import Anime from "react-anime";
import logo from "../logo.svg";

const Input = (): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>("");
  return (
    <div>
      <input
        type="text"
        className="text-black"
        value={inputValue}
        onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
          setInputValue(ev.target.value);
          console.log(inputValue);
        }}
      />
      <button onClick={() => setInputValue(String(Number(inputValue) * 2))}>
        {" "}
        2x{" "}
      </button>
    </div>
  );
};

export default Input;

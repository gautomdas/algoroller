import React, { useState } from "react";
import Anime from "react-anime";
import logo from "../logo.svg";

type BetAmountProps = {
  amount: number;
};

function BetAmount({ amount }: BetAmountProps) {
  const [bet, setBet] = useState<string>("100.00");

  return (
    <div className="BetAmount">
      <div className="flex w-full  mt-2 mb-2 text-base ">
        <input
          className=" pl-5 text-white font-semibold bg-black rounded-l focus:shadow-outline opacity-100 basis-1/2 outline-none"
          type="number"
          placeholder="1000.00"
          value={bet}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
            setBet(ev.target.value);
            console.log(bet);
          }}
        />
        <div className="flex flex-grow rounded-r bg-black items-center">
          <button
            className="bg-navy-400 hover:bg-navy-200 font-medium p-2 px-3 rounded flex-grow m-2"
            onClick={() => setBet("")}
          >
            Clear
          </button>
          <button
            className="bg-navy-400 hover:bg-navy-200 font-semibold p-2 px-3 rounded flex-grow m-2"
            onClick={() => setBet(String(Number(bet) * 0.5))}
          >
            1/2x
          </button>
          <button
            className="bg-navy-400 hover:bg-navy-200 font-semibold p-2 px-3 rounded flex-grow m-2"
            onClick={() => setBet(String(Number(bet) * 2))}
          >
            2x
          </button>
          <button
            className="bg-navy-400 hover:bg-navy-200 font-medium p-2 px-3 rounded flex-grow m-2"
            onClick={() => setBet(String(Number(9999999.0)))}
          >
            Max
          </button>
        </div>
      </div>
      <div className="flex flex-row w-full space-x-8 mt-4 mb-2 text-base ">
        <button className="basis-1/3 py-4 px-4 font-bold bg-red-500 hover:bg-red-300 rounded flex">
          <div>Red</div>
          <span className="grow inline-block align-end ">
            <div className="flex justify-end">2x</div>
          </span>
        </button>
        <button className="basis-1/3 py-4 px-4 font-bold bg-green-500 hover:bg-green-300 rounded flex">
          <div>Green</div>
          <span className="grow inline-block align-end ">
            <div className="flex justify-end">14x</div>
          </span>
        </button>
        <button className="basis-1/3 py-4 px-4 font-bold bg-gray-900 hover:bg-gray-700 rounded flex">
          <div>Black</div>
          <span className="grow inline-block align-end ">
            <div className="flex justify-end">2x</div>
          </span>
        </button>
      </div>
    </div>
  );
}

export default BetAmount;

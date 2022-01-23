import React, { useState } from "react";
import Anime from "react-anime";
import logo from "../logo.svg";
import { RecoilRoot, atom, selector } from "recoil";
import SubmitAmount from "./SubmitAmount";
import AddBet from "./AddBet";

import { useRecoilState, useRecoilValue } from "recoil";
import { betState } from "../store";

type BetAmountProps = {
  amount: number;
};

function BetAmount({ amount }: BetAmountProps) {
  const [bet, setBet] = useRecoilState(betState);

  return (
    <div className="BetAmount">
      <div className="flex w-full  mt-2 mb-2 text-base ">
        <input
          className=" pl-5 text-white font-semibold bg-black rounded-l focus:shadow-outline opacity-100 basis-1/2 outline-none"
          type="number"
          placeholder="1000.00"
          value={String(bet)}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
            setBet(Number(ev.target.value));
            console.log(bet);
          }}
        />
        <div className="invisible md:visible flex flex-grow rounded-r bg-black items-center">
          <button
            className="bg-navy-400 hover:bg-navy-200 font-medium p-2 px-3 rounded flex-grow m-2"
            onClick={() => {
              setBet(Number(0));
            }}
          >
            Clear
          </button>
          <button
            className="bg-navy-400 hover:bg-navy-200 font-semibold p-2 px-3 rounded flex-grow m-2"
            onClick={() => {
              setBet(Number(bet) * 0.5);
            }}
          >
            1/2x
          </button>
          <button
            className="bg-navy-400 hover:bg-navy-200 font-semibold p-2 px-3 rounded flex-grow m-2"
            onClick={() => {
              setBet(Number(bet) * 2);
            }}
          >
            2x
          </button>
          <button
            className="bg-navy-400 hover:bg-navy-200 font-medium p-2 px-3 rounded flex-grow m-2"
            onClick={() => {
              setBet(Number(9999999.0));
            }}
          >
            Max
          </button>
        </div>
      </div>
      <SubmitAmount />
      <AddBet />
    </div>
  );
}

export default BetAmount;

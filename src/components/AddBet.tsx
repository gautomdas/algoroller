import { useState, useEffect } from "react";
import { algodClient } from "../utils/connection";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { Accounts } from "@randlabs/myalgo-connect";

import { useRecoilState, useRecoilValue } from "recoil";
import {
  colorState,
  position,
  positionSelector,
  paramsSelector,
  accountsSelector,
} from "../store";
import { Account, SuggestedParams } from "algosdk";

import algosdk from "algosdk";

import { connection } from "../utils/connection";
import BetAmount from "./BetAmount";

function AddBet() {
  const [color, setColor] = useRecoilState(colorState);
  const pos: position = useRecoilValue(positionSelector);
  const params: SuggestedParams = useRecoilValue(paramsSelector);
  const account: Accounts = useRecoilValue(accountsSelector);

  function renderColor(param: number, isBg = false): string {
    if (isBg) {
      switch (param) {
        case 1:
          return "red-500";
        case 2:
          return "gray-900";
        case 3:
          return "green-500";
        default:
          return "";
      }
    }
    switch (param) {
      case 1:
        return "red";
      case 2:
        return "black";
      case 3:
        return "green";
      default:
        return "";
    }
  }

  function isValid(): boolean {
    if (pos.betAmount == 0 || renderColor(pos.colorChoosen) === "") {
      return false;
    }
    return true;
  }

  // You can use async/await or any function that returns a Promise
  const makeBet = async (sender: string, betAmount: number) => {
    let payTxn = algosdk.makePaymentTxnWithSuggestedParams(
      sender,
      algosdk.getApplicationAddress(58668101),
      betAmount,
      undefined,
      undefined,
      params
    );
    let callTxn = algosdk.makeApplicationNoOpTxn(sender, params, 58668101, [
      new Uint8Array([pos.colorChoosen - 1]),
    ]); // replace 58668101 with mainnet appid later, bet_type is int from 0-2
    let group = algosdk.assignGroupID([payTxn, callTxn]);

    let signedPayTxn = await connection.signTransaction(payTxn.toByte());
    let signedCallTxn = await connection.signTransaction(callTxn.toByte());

    console.log(signedPayTxn);
    console.log(signedCallTxn);

    let finalTxn = await algodClient
      .sendRawTransaction([signedPayTxn.blob, signedCallTxn.blob])
      .do();

    console.log(finalTxn);
  };

  return (
    <div className="AddBet pt-2">
      <div className="flex flex-row w-full mt-4 mb-2 text-base items-center">
        Currently Betting
        <div className="font-bold mx-2">{pos.betAmount}</div> on
        <div
          className={
            "font-bold ml-2 bg-" +
            renderColor(pos.colorChoosen, true) +
            " py-1.5 px-3 rounded"
          }
        >
          {renderColor(pos.colorChoosen)}
        </div>
        <span className="grow inline-block align-middle ">
          <div className="flex justify-end ">
            {" "}
            <button
              onClick={() => {
                if (isValid()) {
                  console.log(params);
                  makeBet(account.address, 10000);
                }
              }}
              className={
                isValid()
                  ? "bg-blue-500 hover:bg-blue-200 shadow-2x rounded py-1.5 px-3 "
                  : "bg-gray-600 cursor-not-allowed text-gray-400 rounded py-1.5 px-3 "
              }
            >
              Submit and Sign Transaction
            </button>
          </div>
        </span>
      </div>
    </div>
  );
}

export default AddBet;

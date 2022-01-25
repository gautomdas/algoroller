import React, { useState } from "react";
import Anime from "react-anime";
import logo from "../logo.svg";
import { RecoilRoot, atom, selector } from "recoil";


import { useRecoilState, useRecoilValue } from "recoil";
import { colorState, position, positionSelector } from "../store";

import MyAlgoConnect from '@randlabs/myalgo-connect';


const algoWallet = new MyAlgoConnect();

async function connectToMyAlgo() {
  try {
    const accounts = await algoWallet.connect();
    const addresses = accounts.map(account => account.address);
    
  } catch (err) {
    console.error(err);
  }
}

function AddBet() {


  const [color, setColor] = useRecoilState(colorState);
  const pos: position = useRecoilValue(positionSelector);

  function renderColor(param: number, isBg = false) {
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

  return (

    <div className="AddBet pt-2">
      <div className="flex flex-row w-full mt-4 mb-2 text-base items-center">
        Currently Wagering a Bet of
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
        .
        <span className="grow inline-block align-middle ">
          <div className="flex justify-end ">
            {" "}


            {/* <AlgoButton wallet={MyAlgoWallet} onChange={console.log('test')} />
            <SwitchNet/>
            <AlgoAppCallWTxn
              appId={58668101}
              appArgs={[]}
              receiver='JWBGE63RZAPIGG7KZDURNKUJDUL6GOEG7Z6OKRWGXW2HVAJ5UWAUYLLKTE'
              amount={50000}
              note=''
              index={0} /> */}


            <button onClick={() => connectToMyAlgo()} className="bg-blue-500 rounded  py-1.5 px-3 " >
              Submit and Sign Transaction
            </button>
          </div>
        </span>
      </div>
    </div>
  );
}

export default AddBet;

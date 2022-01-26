import { useState, useEffect } from "react";
import { algodClient } from "../utils/connection";

import { useRecoilState, useRecoilValue } from "recoil";
import { colorState, position, positionSelector } from "../store";

import algosdk from "algosdk";

let timeoutResolution: NodeJS.Timeout | null = null;

function AddBet() {
  const [color, setColor] = useRecoilState(colorState);
  const pos: position = useRecoilValue(positionSelector);
  const [params, setParams] = useState<algosdk.SuggestedParams>();

  const getTransactionParams = async (): Promise<void> => {
    try {
      const params = await algodClient.getTransactionParams().do();
      setParams(params);
    } catch (err) {
      console.error(err);
    }
    timeoutResolution = setTimeout(getTransactionParams, 10000);
  };

  useEffect(() => {
    if (timeoutResolution) clearTimeout(timeoutResolution);
    getTransactionParams();
  });

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
            <button className="bg-blue-500 rounded  py-1.5 px-3 ">
              Submit and Sign Transaction
            </button>
          </div>
        </span>
      </div>
    </div>
  );
}

export default AddBet;

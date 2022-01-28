import { useRecoilState, useRecoilValue } from "recoil";
import {
  colorState,
  position,
  positionSelector,
  paramsSelector,
} from "../store";
import { SuggestedParams } from "algosdk";

function SubmitAmount() {
  const [color, setColor] = useRecoilState(colorState);
  const pos: position = useRecoilValue(positionSelector);

  return (
    <div className="SubmitAmount">
      <div className="flex flex-row w-full space-x-8 mt-4 mb-2 text-base ">
        <button
          className="basis-1/3 shadow py-4 px-4 font-bold bg-red-500 hover:bg-red-300 rounded flex"
          onClick={() => {
            setColor(1);
          }}
        >
          <div>Red</div>
          <span className="grow inline-block align-end ">
            <div className="flex justify-end">2x</div>
          </span>
        </button>
        <button
          className="basis-1/3 shadow py-4 px-4 font-bold bg-green-500 hover:bg-green-300 rounded flex"
          onClick={(_) => {
            setColor(3);
          }}
        >
          <div>Green</div>
          <span className="grow inline-block align-end ">
            <div className="flex justify-end">14x</div>
          </span>
        </button>
        <button
          className="basis-1/3 shadow py-4 px-4 font-bold bg-gray-900 hover:bg-gray-700 rounded flex"
          onClick={() => {
            setColor(2);
          }}
        >
          <div>Black</div>
          <span className="grow inline-block align-end ">
            <div className="flex justify-end">2x</div>
          </span>
        </button>
      </div>
    </div>
  );
}

export default SubmitAmount;

import React from "react";
import BetAmount from "./BetAmount";

import Anime from "react-anime";

type RouletteProps = {
  title: string;
};

function Board() {
  function renderColor(param: string): string {
    switch (param) {
      case "red":
        return "red-500";
      case "black":
        return "black";
      case "green":
        return "green-500";
      default:
        return "";
    }
  }

  function convertRemToPixels(rem: number): number {
    return (
      rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
    );
  }

  const board = [
    { number: "1", color: "red" },
    { number: "14", color: "black" },
    { number: "2", color: "red" },
    { number: "13", color: "black" },
    { number: "3", color: "red" },
    { number: "12", color: "black" },
    { number: "4", color: "red" },
    { number: "0", color: "green" },
    { number: "11", color: "black" },
    { number: "5", color: "red" },
    { number: "10", color: "black" },
    { number: "6", color: "red" },
    { number: "9", color: "black" },
    { number: "7", color: "red" },
    { number: "8", color: "black" },
  ];

  const size = convertRemToPixels(5) * 15;
  console.log("size: " + size);

  return (
    <div className="flex">
      {board.map((slot) => (
        <div
          className={
            "Tile box-content h-20 w-20 text-center flex-shrink-0 flex flex-col justify-center items-center bg-" +
            renderColor(slot.color)
          }
        >
          <div>
            <span className="font-bold text-xl">{slot.number}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Roulette({ title }: RouletteProps) {
  function renderColor(param: string): string {
    switch (param) {
      case "red":
        return "red-500";
      case "black":
        return "black";
      case "green":
        return "green-500";
      default:
        return "";
    }
  }

  function convertRemToPixels(rem: number): number {
    return (
      rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
    );
  }

  const board = [
    { number: "1", color: "red" },
    { number: "14", color: "black" },
    { number: "2", color: "red" },
    { number: "13", color: "black" },
    { number: "3", color: "red" },
    { number: "12", color: "black" },
    { number: "4", color: "red" },
    { number: "0", color: "green" },
    { number: "11", color: "black" },
    { number: "5", color: "red" },
    { number: "10", color: "black" },
    { number: "6", color: "red" },
    { number: "9", color: "black" },
    { number: "7", color: "red" },
    { number: "8", color: "black" },
    { number: "1", color: "red" },
    { number: "14", color: "black" },
    { number: "2", color: "red" },
    { number: "13", color: "black" },
    { number: "3", color: "red" },
    { number: "12", color: "black" },
    { number: "4", color: "red" },
    { number: "0", color: "green" },
    { number: "11", color: "black" },
    { number: "5", color: "red" },
    { number: "10", color: "black" },
    { number: "6", color: "red" },
    { number: "9", color: "black" },
    { number: "7", color: "red" },
    { number: "8", color: "black" },
  ];

  const size = convertRemToPixels(5) * 15;
  console.log("size: " + size);

  return (
    <div className="Roulette shadow-lg rounded max-w-xl">
      <div className="p-5 rounded-t bg-navyLight-400">
        <div className="text-navy-200">Bet Amount</div>
        <BetAmount amount={3} />
      </div>
      <div className="py-20 rounded-b bg-black bg-opacity-60 text-white flex overflow-hidden">
        <Anime easing="linear" translateX="-1200" loop={true}>
          {Board()}
          {Board()}
        </Anime>
      </div>
    </div>
  );
}

export default Roulette;

import React, { useEffect, useState } from "react";
import Anime from "react-anime";
import logo from "../logo.svg";

import MyAlgoConnect from "@randlabs/myalgo-connect";
import MyAlgo, { Accounts } from "@randlabs/myalgo-connect";

type NavbarProps = {
  title: string;
  connection: MyAlgoConnect;
  onComplete(accounts: Accounts[]): void;
};

function Navbar({ title, connection, onComplete }: NavbarProps) {
  const [accounts, setAccounts] = useState<Accounts[]>([]);

  const onClearResponse = (): void => {
    setAccounts([]);
  };

  const connectToMyAlgo = async (): Promise<void> => {
    try {
      const accounts = await connection.connect();

      setAccounts(accounts);
      onComplete(accounts);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="Navbar h-30 flex py-10 md:space-x-6 items-center">
      <div className="logo md:w-16 w-24">
        <Anime
          easing="easeInOutExpo"
          duration={2000}
          delay={2000}
          loop={true}
          //delay={(el: number, index: number) => index * 240}
          className=""
          rotate="1turn"
        >
          <img src={logo} className="logoSVG object-contain" alt="logo" />
        </Anime>
      </div>
      <p className="text-white font-bold md:text-4xl invisible md:visible">
        {title}
      </p>
      <span className="grow inline-block align-middle ">
        <div className="flex justify-end">
          <div>
            <button
              onClick={connectToMyAlgo}
              className={
                !accounts.length
                  ? "flex flex-row items-center bg-navy-300 hover:bg-navy-200 text-white text-sm md:text-base font-normal py-2 px-4 rounded shadow-lg"
                  : "flex flex-row items-center bg-blue-500 hover:bg-blue-200  text-white text-sm md:text-base font-normal py-2 px-4 rounded shadow-lg"
              }
            >
              <img
                className="object-cover h-4 pr-2"
                src="../icons/link.png"
                alt="link"
              />
              {accounts.length
                ? "Connected to: " + accounts[0].name
                : "Connect Wallet"}
            </button>
          </div>
        </div>
      </span>
    </div>
  );
}

export default Navbar;

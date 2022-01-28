import React from "react";
import Navbar from "./components/Navbar";
import Roulette from "./components/Roulette";
import { useEffect, useState } from "react";
import { Accounts } from "@randlabs/myalgo-connect";
import algosdk from "algosdk";
import { algodClient, connection } from "./utils/connection";

import { useRecoilState } from "recoil";
import { accountsState, paramsState } from "./store";

let timeoutResolution: NodeJS.Timeout | null = null;

function App() {
  const [params, setParams] = useRecoilState<algosdk.SuggestedParams>(paramsState);
  const [accounts, setAccounts] = useRecoilState<Accounts[]>(accountsState);


  const onCompleteConnect = (accounts: Accounts[]): void => {
    setAccounts(accounts);
  };

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
  }, [accounts]);

  return (
    <div className="App bg-navy-500 flex flex-col h-screen px-10 lg:px-32 xl:px-64 text-white">
      <header className="App-header">
        {/* font family: https://fonts.adobe.com/fonts/objektiv */}
        <link rel="stylesheet" href="https://use.typekit.net/oym8nhu.css" />
      </header>
      <Navbar
        title="algoroller"
        connection={connection}
        onComplete={onCompleteConnect}
      />
      <div className="xl:px-32 2xl:px-48 flex flex-grow pt-12">
        <Roulette title="new" />
      </div>
    </div>
  );
}

export default App;

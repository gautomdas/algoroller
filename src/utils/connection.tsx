import algosdk from "algosdk";
import MyAlgoConnect from "@randlabs/myalgo-connect";

const connection = new MyAlgoConnect();

const algodClient = new algosdk.Algodv2(
  "",
  "https://api.testnet.algoexplorer.io",
  ""
);

export function validateAddress(address: string): boolean {
  if (typeof address !== "string") {
    return false;
  }

  return algosdk.isValidAddress(address);
}

export { connection, algodClient };

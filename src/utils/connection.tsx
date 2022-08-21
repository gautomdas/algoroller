import algosdk from "algosdk";
import MyAlgoConnect from "@randlabs/myalgo-connect";

const connection = new MyAlgoConnect();

const algodClient = new algosdk.Algodv2(
  "",
  // "https://algoindexer.algoexplorerapi.io/",
  "https://node.testnet.algoexplorerapi.io",
  ""
);

export function validateAddress(address: string): boolean {
  if (typeof address !== "string") {
    return false;
  }

  return algosdk.isValidAddress(address);
}

export { connection, algodClient };

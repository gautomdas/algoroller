import { atom, selector } from "recoil";
import { Accounts } from "@randlabs/myalgo-connect";
import { SuggestedParams } from "algosdk";

export const betState = atom({
  key: "betState", // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});

export const colorState = atom({
  key: "colorState", // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});

export const accountsState = atom({
  key: "accountsState", // unique ID (with respect to other atoms/selectors)
  default: [] as Accounts[], // default value (aka initial value)
});

export const paramsState = atom({
  key: "paramsState", // unique ID (with respect to other atoms/selectors)
  default: {} as SuggestedParams, // default value (aka initial value)
});

export const paramsSelector = selector({
  key: "paramSState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => get(paramsState),
});

export interface position {
  betAmount: number;
  // 1 for Red 2 for Black 3 for Green
  colorChoosen: number;
}

export const positionSelector = selector({
  key: "positionState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }): position => {
    const betAmount: number = get(betState);
    const colorChoosen: number = get(colorState);

    return { betAmount, colorChoosen };
  },
});

# algoroller Project

algoroller is a full stack app for playing roulette on the Algorand blockchain. The front-end uses TypeScript, React, and Recoil while in the backend —on the blockchain— the contract uses PyTeal and TEAL to make an interactive app that creates verifiable random numbers.



A preview below: 

![Preview](https://s6.gifyu.com/images/preview.gif)



Section for development and additions.

### Suggested Workflow

Keep track of what issue you're working on on the issues tab and check Projects for a view of all the features.

## Getting Started

To start project run: 

```
yarn install
yarn start
```

To add non-typescript packages, add the following line in the `decs.d.ts` file:
```
declare module "myModule";
```


## Fonts

```
Objektiv Mk1 Italic

font-family: objektiv-mk1, sans-serif;

font-weight: 400;

font-style: italic;


Objektiv Mk1 Regular

font-family: objektiv-mk1, sans-serif;

font-weight: 400;

font-style: normal;


Objektiv Mk1 Bold

font-family: objektiv-mk1, sans-serif;

font-weight: 700;

font-style: normal;


Objektiv Mk1 Bold Italic

font-family: objektiv-mk1, sans-serif;

font-weight: 700;

font-style: italic;


Objektiv Mk2 Italic

font-family: objektiv-mk2, sans-serif;

font-weight: 400;

font-style: italic;


Objektiv Mk2 Regular

font-family: objektiv-mk2, sans-serif;

font-weight: 400;

font-style: normal;


Objektiv Mk2 Bold

font-family: objektiv-mk2, sans-serif;

font-weight: 700;

font-style: normal;


Objektiv Mk2 Bold Italic

font-family: objektiv-mk2, sans-serif;

font-weight: 700;

font-style: italic;


Objektiv Mk3 Italic

font-family: objektiv-mk3, sans-serif;

font-weight: 400;

font-style: italic;


Objektiv Mk3 Regular

font-family: objektiv-mk3, sans-serif;

font-weight: 400;

font-style: normal;


Objektiv Mk3 Bold Italic

font-family: objektiv-mk3, sans-serif;

font-weight: 700;

font-style: italic;


Objektiv Mk3 Bold

font-family: objektiv-mk3, sans-serif;

font-weight: 700;

font-style: normal;
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

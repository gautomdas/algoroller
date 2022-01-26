import Navbar from "./components/Navbar";
import Roulette from "./components/Roulette";

function App() {
  return (
    <div className="App bg-navy-500 flex flex-col h-screen px-10 lg:px-32 xl:px-64 text-white">
      <header className="App-header">
        {/* font family: https://fonts.adobe.com/fonts/objektiv */}
        <link rel="stylesheet" href="https://use.typekit.net/oym8nhu.css" />
      </header>
      <Navbar title="algoroller" />
      <div className="xl:px-32 2xl:px-48 flex flex-grow pt-12">
        <Roulette title="new" />
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";
import Header from "./components/Header";
import CountryForm from "./components/CountryForm";
import Footer from "./components/Footer";
import CountryTable from "./components/CountryTable";

function App() {
  const [count, setCount] = useState(0);
  // showTable 0 [no data], 1 [countries list] , 2 [country details]
  const [showTable, setShowTable] = useState(1);

  const addCountEventHandler = (e) => {
    e.preventDefault();
    setCount((count) => count + 1);
    // setShowTable(true)
  };

  return (
    <>
      <Header />
      <CountryForm addCount={addCountEventHandler} count={count} />
      <CountryTable tableVisibility={showTable}/>
      <Footer />
    </>
  );
}

export default App;

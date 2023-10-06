import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Unicafe</h1>
      <h3>Give Feedback</h3>
      <div className="card">
        <button>Good</button>
        <button>Neutral</button>
        <button>Bad</button>
      </div>
      <h3>Statistics</h3>
      <div>
        <p>Good:</p>
        <p>Neutral:</p>
        <p>Bad:</p>
      </div>
    </>
  );
}

export default App;

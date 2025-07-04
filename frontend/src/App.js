import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard"; // Import Dashboard.js

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Avatar Evolution Dashboard</h1>
      </header>

      {/* Include the Dashboard component */}
      <Dashboard />
    </div>
  );
}

export default App;

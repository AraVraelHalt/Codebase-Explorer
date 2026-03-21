import React from 'react';
import "./App.css";
import FileUpload from "./components/FileUpload";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1> Codebase Explorer</h1>
      <FileUpload />
    </div>
  );
}

export default App;

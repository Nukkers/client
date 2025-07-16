import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000")
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Basic Client-server app</h1>
      <p>Message from backend:{message}</p>
    </div>
  );
}

export default App;


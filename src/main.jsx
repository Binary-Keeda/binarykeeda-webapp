import React from 'react';
import ReactDOM from 'react-dom/client';

console.log("Mounting App"); // Confirm this shows in console

ReactDOM.createRoot(document.getElementById('root')).render(
  <h1 style={{ color: "red" }}>Hello Test</h1>
);

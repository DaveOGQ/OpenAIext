import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Assuming there is an element with id 'root' in your HTML
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

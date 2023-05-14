import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ModalsProvider } from "@contexts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ModalsProvider>
      <App />
    </ModalsProvider>
  </React.StrictMode>
);

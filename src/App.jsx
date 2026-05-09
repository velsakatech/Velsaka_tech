// src/App.jsx

import React from "react";
import AppRouter from "./Routes/AppRouter";
import CookieBanner from "./components/CookieBanner";

function App() {
  return (
    <>
      <AppRouter />
      <CookieBanner />
    </>
  );
}

export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";

import CrudPage from "./pages/Crud";
import AuthPage from "./pages/Auth";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<CrudPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </header>
    </div>
  );
};

export default App;

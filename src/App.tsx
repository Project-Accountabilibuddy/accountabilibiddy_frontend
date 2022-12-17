import React, { useEffect, useState } from "react";

import { Route, Routes, useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

import CrudPage from "./pages/Crud";
import AuthPage from "./pages/Auth";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  Auth.currentAuthenticatedUser({ bypassCache: true })
    .then((user) => {
      console.log({ user });
      setUser(user);
    })
    .catch((err) => {
      console.log({ err });
    });

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

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

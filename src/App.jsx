import React from "react";
import Home from "./Pases/Home/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./Pases/Login/Login";
import Player from "./Pases/Player/Player";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </div>
  );
};

export default App;

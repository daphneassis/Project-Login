import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./components/UserContext"
import Register from "./components/Register";
import Home from "./components/Home";
import Login from "./components/Login";
import Password from "./components/Password";

function App() {
  return (
    <div>
      <BrowserRouter>
        <UserProvider>
          <Routes>
          <Route path="/" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/password" element={<Password />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}
export default App;
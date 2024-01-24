import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import {Route} from "react-router-dom";
import {Home} from "./components/Home";


function App() {
  return (
    <div>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Register />} />
      <Route path="/home" element= { <Home/>} />
      <Route path="/login" element= { <Login/>} />
    </Routes>
</BrowserRouter>
    </div>
  );
}

export default App;

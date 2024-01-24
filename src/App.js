import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import {Route} from "react-router-dom";
import {Home} from "./components/Home";
import {Password} from "./components/Password";


function App() {
  return (
    <div>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Register />} />
      <Route path="/home" element= {<Home/>} />
      <Route path="/login" element= {<Login/>} />
      <Route path="/password" element= {<Password/>} />
    </Routes>
</BrowserRouter>
    </div>
  );
}

export default App;

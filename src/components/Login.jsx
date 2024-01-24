import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext"


    const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const { updateUser } = useUser();
    const navigate = useNavigate();

    async function login(event) {
        event.preventDefault();
        if (!email || !password) {
          alert("Por favor, preencha email e senha");
          return;
      }
        try {
          await axios.post("http://localhost:8080/api/user/login", {
            email: email,
            password: password,
            }).then((res) => 
            {
             console.log(res.data);
             
             if (res.data.message == "Email não encontrado") 
             {
               alert("Email não encontrado");
             } 
             else if(res.data.message == "Sucesso no Login")
             { 
            
              const userRole = localStorage.getItem("userRole");
              const userName = localStorage.getItem("userName");
              console.log("UserRole:", userRole);
              console.log("Username:", userName);
              
              updateUser({
                email,
                password,
        
        
              });
                navigate("/home");
              }
                
              else 
             { 
                alert("Email e senha não correspondem");
             }
          }, fail => {
           console.error(fail); 
  });
        }
 
         catch (err) {
          alert(err);
        }
      
      }

  return (
    <div>
            <div className="container">
            <div className="row">
                <h2>Login</h2>
             <hr/>
             </div>
             <div className="row">
             <div className="col-sm-6">
 
            <form>
        <div className="form-group">
          <label>Email</label>
          <input type="email"  className="form-control" id="email" placeholder="Digite o email"
          
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          
          />
        </div>
        <div className="form-group">
            <label>Senha</label>
            <input type="password"  className="form-control" id="password" placeholder="Digite a senha"
            
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            
            />
          </div>
                  <button type="submit" className="btn btn-primary" onClick={login} >Login</button>
              </form>
            </div>
            </div>
            </div>
     </div>
   
  )
}
export default Login; 

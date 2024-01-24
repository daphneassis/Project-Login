import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  async function save(event) {
    event.preventDefault();

    if (!username || !email || !password || !cpf || !role) {
      alert("Todos os campos devem ser preenchidos.");
      return;
    }
    if (role.toUpperCase() !== "ADMIN" && role.toUpperCase() !== "USER") {
      alert("A permissão só pode ser ADMIN ou USER.");
      return;
    }

    try {
    const response = await axios.post("http://localhost:8080/api/user/save", {
      email: email,
      password: password,
      username: username,
      cpf: cpf,
      role: role,
    });

      const data = response.data;
      console.log(data);
  
      if (data.status) {
        alert("Cadastro realizado com sucesso!");
        localStorage.setItem("userRole", role);
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Erro ao realizar cadastro:", error);
      alert("Erro ao realizar cadastro. Por favor, tente novamente.");
    }
  }
  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="container mt-4" >
    <div className="card">
            <h1>Cadastro do Usuário</h1>
    
    <form>
        <div className="form-group">
          <label>Nome</label>
          <input type="text"  className="form-control" id="username" placeholder="Digite o nome"
          
          value={username}
          onChange={(event) => {
            setUserName(event.target.value);
          }}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="text"  className="form-control" id="email" placeholder="Digite o email"
          
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          
          />
 
        </div>
        <div className="form-group">
            <label>Senha</label>
            <input type="text"  className="form-control" id="password" placeholder="Digite a sua senha"
            
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            
            />
          </div>

          <div className="form-group">
          <label>CPF</label>
          <input type="text"  className="form-control" id="cpf" placeholder="Digite o cpf"
          
          value={cpf}
          onChange={(event) => {
            setCpf(event.target.value);
          }}
          
          />
 
        </div>

        <div className="form-group">
          <label>Permissão</label>
          <input type="permission"  className="form-control" id="permission" placeholder="Digite USER ou ADMIN"
          
          value={role}
          onChange={(event) => {
            setRole(event.target.value);
          }}
          
          />
 
        </div>
        <button type="submit" className="btn btn-primary mt-4" onClick={save} >Salvar</button>
      </form>

      <div className="mt-2">
          <p>Já é cadastrado?</p>
          <button className="btn btn-secondary" onClick={goToLogin}>
            Faça login aqui
          </button>
        </div>

    </div>
    </div>


  )
}

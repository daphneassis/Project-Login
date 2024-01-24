import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import { useUser } from "./UserContext";

 const Home = () => {
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const { user } = useUser();

  const userName = localStorage.getItem("userName");
  console.log("userName:", userName);


  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole === "ADMIN") {
      setShowButton(true);
    }
  }, []);

  useEffect(() => {
    if (user.role === "ADMIN") {
      setShowButton(true);
    }
  }, [user.role]);


  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/user/delete/${userId}`);
      if (response.data.message) {
        alert(response.data.message);
        const updatedUserList = userList.filter((user) => user.userId !== userId);
        setUserList(updatedUserList);
            console.log(`Usuário com ID ${userId} deletado com sucesso.`);
            alert("Sucesso ao deletar o usuário!")
          } else {
            console.error("Erro ao deletar usuário.");
          }
        } catch (error) {
          console.error(`Erro ao deletar usuário: ${error.message}`);
        

          alert("Erro ao deletar usuário. Por favor, tente novamente.");
        }
      };
    

  const handleListUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/user/listUsers");
      setUserList(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao buscar usuários.');
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Hola Mundo</h1>
      <div style={{ marginBottom: '10px' }}>
      {showButton && <button onClick={handleListUsers}>Listar Usuários</button>}
    </div>
    <div>
      <Link to="/password">
        <button>Trocar a minha Senha</button>
      </Link>
    </div>

      {error && <p>{error}</p>}

      {userList.length > 0 && (
        <div>
          <h2>Lista de Usuários</h2>

          <ul>
      {userList.map((user) => (
        <li key={user.userId}>
          {user.username} - {user.email}- {user.cpf}- {user.role}
          {showButton && (
            <button onClick={() => handleDeleteUser(user.userId)}>
              deletar
            </button>
          )}
        </li>
      ))}
    </ul>
        </div>
      )}
    </div>
  )
}
export default Home;
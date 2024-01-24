import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Home = () => {
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole === "ADMIN") {
      setShowButton(true);
    }
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/api/user/delete/${userId}`);
            const updatedUserList = userList.filter((user) => user.userId !== userId);
      setUserList(updatedUserList);
            console.log(`Usuário com ID ${userId} deletado com sucesso.`);
    } catch (error) {
      console.error(`Erro ao deletar usuário: ${error.message}`);
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
      {showButton && <button onClick={handleListUsers}>Listar Usuários</button>}

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
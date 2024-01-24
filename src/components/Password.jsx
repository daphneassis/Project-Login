import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Password = () => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const savePassword = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/user/changepass", {
        oldPass: oldPass,
        newPass: newPass,
      });

      console.log(response.data);

      if (response.data.message === "Erro na atualização de senha") {
        alert("Senha não encontrada");
      } else if (response.data.message === "Sucesso: nova senha cadastrada!") {
        setShowConfirmation(true);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar a senha. Por favor, tente novamente.");
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <h2>Atualização de senha:</h2>
          <hr />
        </div>
        <div className="row">
          <div className="col-sm-6">
            {!showConfirmation ? (
              <form>
                <div className="form-group">
                  <label>Senha Atual</label>
                  <input
                    type="password"
                    className="form-control"
                    id="oldPass"
                    placeholder="Digite a sua senha atual"
                    value={oldPass}
                    onChange={(event) => {
                      setOldPass(event.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Nova senha:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPass"
                    placeholder="Digite a sua nova senha"
                    value={newPass}
                    onChange={(event) => {
                      setNewPass(event.target.value);
                    }}
                  />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleConfirmation}>
                  Atualizar
                </button>
              </form>
            ) : (
              <div>
                <h3>Confirme os Dados:</h3>
                <p>Senha Atual: {oldPass}</p>
                <p>Nova Senha: {newPass}</p>
                <button type="button" className="btn btn-success" onClick={savePassword}>
                  Confirmar
                </button>
                <button type="button" className="btn btn-danger" onClick={handleCancel}>
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
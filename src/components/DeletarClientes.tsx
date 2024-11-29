import React, { useEffect, useState } from "react";
import { listarClientes, excluirCliente, Cliente } from "../api/ClienteService";

const ExcluirCliente: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    listarClientes()
      .then(setClientes)
      .catch((err) => console.error("Erro ao listar clientes:", err));
  }, []);

  const handleDelete = (id: number | undefined) => {
    if (id) {
      excluirCliente(id)
        .then(() => setClientes(clientes.filter((cliente) => cliente.id !== id)))
        .catch((err) => console.error("Erro ao excluir cliente:", err));
    }
  };

  return (
    <div>
        <h2 className="my-4">Excluir Clientes</h2>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nome</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nome}</td>
                <td>
                  {/* Replacing button with Bootstrap icon */}
                  <button
                    className="btn btn-link text-danger"
                    onClick={() => handleDelete(cliente.id)}
                    aria-label="Excluir Cliente"
                  >
                    <i className="bi bi-person-dash" style={{ fontSize: '24px' }}></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExcluirCliente;

import React, { useState, useEffect } from "react";
import { listarClientes, atualizarCliente, Cliente } from "../api/ClienteService";

const AtualizarClientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [cliente, setCliente] = useState<Cliente>({
    id: 0,
    nome: "",
    email: "",
    nomeSocial: "",
    endereco: {
      bairro: "",
      cidade: "",
      codigoPostal: "",
      estado: "",
      numero: "",
      rua: "",
      informacoesAdicionais: "",
    },
    telefones: [
      {
        ddd: "",
        numero: "",
      },
    ],
  });

  useEffect(() => {
    listarClientes()
      .then(setClientes)
      .catch((err) => console.error("Erro ao listar clientes:", err));
  }, []);

  const handleAtualizar = async () => {
    try {
      if (!cliente.id) {
        alert("Por favor, insira o ID do cliente para atualizar.");
        return;
      }

      const clienteAtualizado = await atualizarCliente(cliente.id, cliente);
      alert(`Cliente atualizado com sucesso: ${clienteAtualizado.nome}`);
    } catch (error) {
      console.error("Erro ao atualizar o cliente:", error);
      alert("Erro ao tentar atualizar o cliente.");
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Atualizar Cliente</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAtualizar();
        }}
      >

        <div className="mb-3">
          <label htmlFor="id" className="form-label">ID do Cliente</label>
          <select
            id="id"
            className="form-control"
            value={cliente.id || ""}
            onChange={(e) => {
              const selectedId = Number(e.target.value);
              const selectedCliente = clientes.find((c) => c.id === selectedId);
              if (selectedCliente) {
                setCliente(selectedCliente);
              }
            }}
          >
            <option value="">Selecione o ID</option>
            {clientes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.id} - {c.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Nome */}
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome</label>
          <input
            type="text"
            id="nome"
            className="form-control"
            placeholder="Nome"
            value={cliente.nome}
            onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Email"
            value={cliente.email}
            onChange={(e) => setCliente({ ...cliente, email: e.target.value })}
          />
        </div>

        {/* Nome Social */}
        <div className="mb-3">
          <label htmlFor="nomeSocial" className="form-label">Nome Social</label>
          <input
            type="text"
            id="nomeSocial"
            className="form-control"
            placeholder="Nome Social"
            value={cliente.nomeSocial || ""}
            onChange={(e) => setCliente({ ...cliente, nomeSocial: e.target.value })}
          />
        </div>

        {/* Endereco Fields */}
        <div className="mb-3">
          <label htmlFor="bairro" className="form-label">Bairro</label>
          <input
            type="text"
            id="bairro"
            className="form-control"
            placeholder="Bairro"
            value={cliente.endereco?.bairro || ""}
            onChange={(e) =>
              setCliente({
                ...cliente,
                endereco: { ...cliente.endereco!, bairro: e.target.value },
              })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="cidade" className="form-label">Cidade</label>
          <input
            type="text"
            id="cidade"
            className="form-control"
            placeholder="Cidade"
            value={cliente.endereco?.cidade || ""}
            onChange={(e) =>
              setCliente({
                ...cliente,
                endereco: { ...cliente.endereco!, cidade: e.target.value },
              })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="estado" className="form-label">Estado</label>
          <input
            type="text"
            id="estado"
            className="form-control"
            placeholder="Estado"
            value={cliente.endereco?.estado || ""}
            onChange={(e) =>
              setCliente({
                ...cliente,
                endereco: { ...cliente.endereco!, estado: e.target.value },
              })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="numero" className="form-label">Número</label>
          <input
            type="text"
            id="numero"
            className="form-control"
            placeholder="Número"
            value={cliente.endereco?.numero || ""}
            onChange={(e) =>
              setCliente({
                ...cliente,
                endereco: { ...cliente.endereco!, numero: e.target.value },
              })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="codigoPostal" className="form-label">Código Postal</label>
          <input
            type="text"
            id="codigoPostal"
            className="form-control"
            placeholder="Código Postal"
            value={cliente.endereco?.codigoPostal || ""}
            onChange={(e) =>
              setCliente({
                ...cliente,
                endereco: { ...cliente.endereco!, codigoPostal: e.target.value },
              })
            }
          />
        </div>


        <div className="mb-3">
           <button type="button" onClick={handleAtualizar} className="btn btn-dark">
           <i className="bi bi-person-fill-up"></i> Atualizar Cliente
           </button>
        </div>

      </form>
      </div>
  );
};

export default AtualizarClientes;

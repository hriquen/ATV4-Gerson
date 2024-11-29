import React, { useState } from "react";
import { cadastrarCliente, Cliente } from "../api/ClienteService";

const CadastroCliente: React.FC = () => {
  const [cliente, setCliente] = useState<Cliente>({
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    cadastrarCliente(cliente)
      .then(() => alert("Cliente cadastrado com sucesso!"))
      .catch((err) => console.error("Erro ao cadastrar cliente:", err));
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h1 className="mb-4">Cadastrar Cliente</h1>
      <div className="mb-3">
        <label className="form-label">Nome</label>
        <input
          type="text"
          className="form-control"
          value={cliente.nome}
          onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          value={cliente.email}
          onChange={(e) => setCliente({ ...cliente, email: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Nome Social</label>
        <input
          type="text"
          className="form-control"
          value={cliente.nomeSocial || ""}
          onChange={(e) =>
            setCliente({ ...cliente, nomeSocial: e.target.value })
          }
        />
      </div>
      <h3>Endereço</h3>
      {["rua", "numero", "bairro", "cidade", "estado", "codigoPostal", "informacoesAdicionais"].map(
        (field, index) => (
          <div className="mb-3" key={index}>
            <label className="form-label">
              {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type="text"
              className="form-control"
              value={cliente.endereco?.[field as keyof typeof cliente.endereco] || ""}
              onChange={(e) =>
                setCliente({
                  ...cliente,
                  endereco: {
                    ...cliente.endereco!,
                    [field]: e.target.value,
                  },
                })
              }
            />
          </div>
        )
      )}
      <h3>Telefones</h3>
{(cliente.telefones || []).map((telefone, index) => (
  <div className="mb-3 row" key={index}>
    <div className="col-md-2">
      <label className="form-label">DDD</label>
      <input
        type="text"
        className="form-control"
        value={telefone.ddd}
        onChange={(e) => {
          const novosTelefones = [...(cliente.telefones || [])];
          novosTelefones[index].ddd = e.target.value;
          setCliente({ ...cliente, telefones: novosTelefones });
        }}
      />
    </div>
    <div className="col-md-10">
      <label className="form-label">Número</label>
      <input
        type="text"
        className="form-control"
        value={telefone.numero}
        onChange={(e) => {
          const novosTelefones = [...(cliente.telefones || [])];
          novosTelefones[index].numero = e.target.value;
          setCliente({ ...cliente, telefones: novosTelefones });
        }}
      />
    </div>
  </div>
))}

      <button
        type="button"
        className="btn btn-secondary mb-3"
        onClick={() =>
          setCliente({
            ...cliente,
            telefones: [...(cliente.telefones || []), { ddd: "", numero: "" }],
          })
        }
      >
        Adicionar Telefone
      </button>
      <button type="submit" className="btn btn-primary">
        Cadastrar
      </button>
    </form>
  );
};

export default CadastroCliente;

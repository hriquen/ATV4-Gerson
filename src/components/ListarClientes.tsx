import React, { useEffect, useState } from "react";
import { listarClientes, Cliente } from "../api/ClienteService";

const ListarClientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    console.log("Executando useEffect para listar clientes...");
    listarClientes()
      .then((dados) => {
        console.log("Clientes recebidos no componente:", dados);
        setClientes(dados);
      })
      .catch((erro) => console.error("Erro ao listar clientes:", erro));
  }, []);
  
  
  

  return (
    <div>
      <h1>Lista de Clientes</h1>
      {clientes.length === 0 ? (
        <p>Nenhum cliente encontrado.</p>
      ) : (
        <ul>
          {clientes.map((cliente) => (
            <li key={cliente.id}>
              <strong>{cliente.nome}</strong> - {cliente.email || "Sem e-mail"}
              <br />
              <strong>Nome Social:</strong> {cliente.nomeSocial || "Não informado"}
              <br />
              <strong>Endereço:</strong>{" "}
              {cliente.endereco
                ? `${cliente.endereco.rua}, ${cliente.endereco.numero}, ${cliente.endereco.bairro}, ${cliente.endereco.cidade} - ${cliente.endereco.estado}`
                : "Não informado"}
              <br />
              <strong>Telefones:</strong>{" "}
              {cliente.telefones
                ? cliente.telefones
                    .map((telefone) => `(${telefone.ddd}) ${telefone.numero}`)
                    .join(", ")
                : "Não informado"}
              <br />
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListarClientes;

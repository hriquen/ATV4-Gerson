import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListarClientes from "./components/ListarClientes";
import CadastrarCliente from "./components/CriarClientes";
import AtualizarCliente from "./components/AtualizarClientes";
import ExcluirCliente from "./components/DeletarClientes";
import Navbar from "./components/NavBar"; 

function App() {
  const navLinks = [
    { label: "Listar Clientes", path: "/" },
    { label: "Cadastrar Cliente", path: "/cadastrar" },
    { label: "Atualizar Cliente", path: "/atualizar" },
    { label: "Excluir Cliente", path: "/excluir" },
  ];

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar links={navLinks} />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ListarClientes />} />
            <Route path="/cadastrar" element={<CadastrarCliente />} />
            <Route path="/atualizar" element={<AtualizarCliente />} />
            <Route path="/excluir" element={<ExcluirCliente />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

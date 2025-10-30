import React, { useState } from "react";
import Page from "../components/Page";
import Table from "../components/Table";
// import UsuarioCadastrarModal from "../components/modals/UsuarioCadastrar";

export default function Home() {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Page title="Home" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Usuários</h1>

        {/* <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          type="button"
        >
          Cadastrar Usuário
        </button> */}
      </div>
    </>
  );
}

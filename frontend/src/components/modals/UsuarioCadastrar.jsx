import React, { useState } from "react";
import CustomInput from "../CustomInput";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UsuarioCadastrar({ isOpen, onClose }) {
  const [form, setForm] = useState({
    nome: "",
    usuario: "",
    senha: "",
    confirmar_senha: "",
    ativo: 1,
  });

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:81/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome,
          usuario: form.usuario,
          senha: form.senha,
          ativo: 1,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.mensagem || "Erro ao cadastrar usuário");
      }

      toast.success("Usuário cadastrado com sucesso!", {
        type: "success",
        position: "top-center",
        autoClose: 1000,
      });

      setTimeout(() => {
        onClose();
      }, 2500);
    } catch (err) {
      console.error(err);
      setErro("Não foi possível cadastrar o usuário.");
      toast.error("❌ Falha ao cadastrar o usuário!", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const senhasIguais =
    form.senha.trim() !== "" &&
    form.confirmar_senha.trim() !== "" &&
    form.senha === form.confirmar_senha;

  const modalClasses = isOpen
    ? "opacity-100 scale-100 transition-all duration-300 ease-out"
    : "opacity-0 scale-95 transition-all duration-300 ease-in pointer-events-none";

  if (!isOpen) return null;

  return (
    <>
      <ToastContainer />
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-[2px] p-4 transition-all duration-300 ease-out"
        onClick={onClose}
      >
        <div
          className={`bg-white rounded-xl shadow-2xl w-full max-w-2xl md:max-w-3xl transform ${modalClasses}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800">
              Cadastrar Novo Usuário
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out p-1 rounded-full hover:bg-gray-50"
              aria-label="Fechar Modal"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CustomInput
                label="Nome Completo"
                name="nome"
                value={form.nome}
                onChange={handleChange}
              />
              <CustomInput
                label="Nome de Usuário"
                name="usuario"
                value={form.usuario}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <CustomInput
                label="Senha"
                name="senha"
                placeholder="Digite a senha"
                type="password"
                value={form.senha}
                onChange={handleChange}
              />
              <CustomInput
                label="Confirmar Senha"
                name="confirmar_senha"
                placeholder="Digite a senha novamente"
                type="password"
                value={form.confirmar_senha}
                onChange={handleChange}
              />
              {!senhasIguais && form.confirmar_senha !== "" && (
                <p className="text-sm text-red-500 col-span-3">
                  As senhas não coincidem.
                </p>
              )}
            </div>

            {erro && <p className="text-red-500 text-sm">{erro}</p>}

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-150 ease-in-out text-sm font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={!senhasIguais || loading}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition duration-150 ease-in-out shadow-md hover:shadow-lg
                  ${
                    senhasIguais && !loading
                      ? "text-white bg-green-600 hover:bg-green-700"
                      : "text-gray-400 bg-gray-200 cursor-not-allowed"
                  }`}
              >
                {loading ? "Enviando..." : "Cadastrar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

import React, { useState, useEffect, FormEvent } from "react";
import { Modal } from "../Modal";
import Button from "../../../ui/button/Button";
import Checkbox from "../../../form/input/Checkbox";
import Input from "../../../form/input/InputField";
import Label from "../../../form/Label";

interface NovoUsuario {
  nome: string;
  usuario: string;
  senha: string;
  confirmar_senha: string;
  ativo: number;
}

interface UsuarioCadastrarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (novoUsuario: NovoUsuario) => void;
}

export const UsuarioCadastrarModal: React.FC<UsuarioCadastrarModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [nome, setNome] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar_senha, setConfirmarSenha] = useState("");
  const [ativo, setAtivo] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setNome("");
      setUsuario("");
      setSenha("");
      setConfirmarSenha("");
      setAtivo(true);
    }
  }, [isOpen]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (senha !== confirmar_senha) return; // bloqueia envio se senhas diferentes

    const novoUsuario: NovoUsuario = {
      nome,
      usuario,
      senha,
      confirmar_senha,
      ativo: ativo ? 1 : 0,
    };
    onSubmit(novoUsuario);
    onClose();
  };

  // Definir status booleano de erro ou sucesso
  const isError = senha && confirmar_senha && senha !== confirmar_senha;
  const isSuccess = senha && confirmar_senha && senha === confirmar_senha;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Cadastrar Novo Usuário"
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="success" type="submit" form="form-cadastrar-usuario">
            Salvar
          </Button>
        </>
      }
    >
      <form
        id="form-cadastrar-usuario"
        onSubmit={handleSubmit}
        className="grid grid-cols-12 gap-4"
      >
        <div className="md:col-span-8 md:ml-6">
          <Label htmlFor="nome" required>
            Nome Completo
          </Label>
          <Input
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="md:col-span-4 flex items-center pt-6">
          <Checkbox checked={ativo} onChange={setAtivo} label="Ativo" />
        </div>

        <div className="md:col-span-4 md:ml-6">
          <Label htmlFor="usuario" required>
            Usuário
          </Label>
          <Input
            id="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>

        <div className="md:col-span-4">
          <Label htmlFor="senha" required>
            Senha
          </Label>
          <Input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            error={!!isError}
            success={!!isSuccess}
            required
          />
        </div>

        <div className="md:col-span-4 md:mr-2">
          <Label htmlFor="confirmar_senha" required>
            Confirmar Senha
          </Label>
          <Input
            id="confirmar_senha"
            type="password"
            value={confirmar_senha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            error={!!isError}
            success={!!isSuccess}
            required
          />
          {isError && (
            <span className="mt-1 text-sm text-red-600 dark:text-red-400">
              As senhas não coincidem.
            </span>
          )}
          {isSuccess && (
            <span className="mt-1 text-sm text-green-600 dark:text-green-400">
              As senhas coincidem.
            </span>
          )}
        </div>
      </form>
    </Modal>
  );
};

import React, { useEffect, useState, FormEvent } from "react";
import { Modal } from "./Modal";
import Button from "../../ui/button/Button";
import Checkbox from "../../form/input/Checkbox";
import Input from "../../form/input/InputField";
import Label from "../../form/Label";

export interface UsuarioParaEditar {
  id_usuario: number;
  nome: string;
  usuario: string;
  ativo: number;
}

interface EditarUsuarioPayload {
  id_usuario: number;
  nome: string;
  usuario: string;
  ativo: number;
  senha?: string;
}

interface UsuarioEditarModalProps {
  isOpen: boolean;
  onClose: () => void;
  usuario?: UsuarioParaEditar | null;
  onSubmit: (payload: EditarUsuarioPayload) => void;
}

export const UsuarioEditarModal: React.FC<UsuarioEditarModalProps> = ({
  isOpen,
  onClose,
  usuario,
  onSubmit,
}) => {
  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [ativo, setAtivo] = useState(true);
  const [alterarSenha, setAlterarSenha] = useState(false);
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  useEffect(() => {
    if (isOpen && usuario) {
      setNome(usuario.nome ?? "");
      setLogin(usuario.usuario ?? "");
      setAtivo((usuario.ativo ?? 1) === 1);
      setAlterarSenha(false);
      setSenha("");
      setConfirmarSenha("");
    }
  }, [isOpen, usuario]);

  if (!usuario) return null;

  // Validação de senha igual ao cadastrar
  const isError =
    alterarSenha && senha && confirmarSenha && senha !== confirmarSenha;
  const isSuccess =
    alterarSenha && senha && confirmarSenha && senha === confirmarSenha;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Bloqueia se for para alterar senha e estiver diferente
    if (alterarSenha && senha !== confirmarSenha) return;

    const payload: EditarUsuarioPayload = {
      id_usuario: usuario.id_usuario,
      nome,
      usuario: login,
      ativo: ativo ? 1 : 0,
    };

    if (alterarSenha && senha.trim().length > 0) {
      payload.senha = senha;
    }

    onSubmit(payload);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Editar Usuário"
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" form="form-editar-usuario">
            Salvar alterações
          </Button>
        </>
      }
    >
      <form
        id="form-editar-usuario"
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
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>

        <div className="md:col-span-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="senha" required>
              Senha
            </Label>
            <Checkbox
              checked={alterarSenha}
              onChange={setAlterarSenha}
              label="Alterar senha"
            />
          </div>

          {/* Campo Senha */}
          <Input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder={alterarSenha ? "Digite a nova senha" : "••••••••"}
            disabled={!alterarSenha}
            error={!!isError}
            success={!!isSuccess}
            required={false}
          />
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Deixe em branco para manter a senha atual.
          </p>
        </div>
        <div className="md:col-span-4 md:mr-2">
          {/* Campo Confirmar Senha (só mostra se marcar alterar senha) */}
          {alterarSenha && (
            <>
              <Label htmlFor="confirmarSenha" required>
                Confirmar Nova Senha
              </Label>
              <Input
                id="confirmarSenha"
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                error={!!isError}
                success={!!isSuccess}
                placeholder="Confirma a nova senha"
                required={false}
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
            </>
          )}
        </div>
      </form>
    </Modal>
  );
};

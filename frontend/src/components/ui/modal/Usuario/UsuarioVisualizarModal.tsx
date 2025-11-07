import Button from "../../button/Button";
import { Modal } from "../Modal";

export interface Usuario {
  id_usuario: number;
  nome: string;
  usuario: string;
  ativo: number;
}

interface VisualizarUsuarioPayload {
  id_usuario: number;
  nome: string;
  usuario: string;
  ativo: number;
}

interface UsuarioVisualizarModalProps {
  isOpen: boolean;
  onClose: () => void;
  usuario?: Usuario | null;
  onSubmit: (payload: VisualizarUsuarioPayload) => void;
}

export const UsuarioVisualizarModal: React.FC<UsuarioVisualizarModalProps> = ({
  isOpen,
  onClose,
  usuario,
}) => {
  if (!usuario) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Visualizar Usuário"
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-12 gap-4 m-2">
        <div className="col-span-6">
          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
            Nome Completo
          </p>
          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
            {usuario.nome}
          </p>
        </div>
        <div className="col-span-3">
          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
            Usuário
          </p>
          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
            {usuario.usuario}
          </p>
        </div>
        <div className="col-span-3">
          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
            Senha
          </p>
          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
            ••••••••
          </p>
        </div>
      </div>
    </Modal>
  );
};

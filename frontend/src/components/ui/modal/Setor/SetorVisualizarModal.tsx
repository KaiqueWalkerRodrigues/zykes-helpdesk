import Button from "../../button/Button";
import { Modal } from "../Modal";

export interface Setor {
  id_setor: number;
  nome: string;
}

interface VisualizarSetorPayload {
  id_setor: number;
  nome: string;
}

interface SetorVisualizarModalProps {
  isOpen: boolean;
  onClose: () => void;
  setor?: Setor | null;
  onSubmit: (payload: VisualizarSetorPayload) => void;
}

export const SetorVisualizarModal: React.FC<SetorVisualizarModalProps> = ({
  isOpen,
  onClose,
  setor,
}) => {
  if (!setor) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Visualizar Setor"
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
            Nome do Setor
          </p>
          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
            {setor.nome}
          </p>
        </div>
      </div>
    </Modal>
  );
};

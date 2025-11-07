import Button from "../../button/Button";
import { Modal } from "../Modal";

export interface Cargo {
  id_cargo: number;
  nome: string;
}

interface VisualizarCargoPayload {
  id_cargo: number;
  nome: string;
}

interface CargoVisualizarModalProps {
  isOpen: boolean;
  onClose: () => void;
  cargo?: Cargo | null;
  onSubmit: (payload: VisualizarCargoPayload) => void;
}

export const CargoVisualizarModal: React.FC<CargoVisualizarModalProps> = ({
  isOpen,
  onClose,
  cargo,
}) => {
  if (!cargo) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Visualizar Cargo"
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
            Nome do Cargo
          </p>
          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
            {cargo.nome}
          </p>
        </div>
      </div>
    </Modal>
  );
};

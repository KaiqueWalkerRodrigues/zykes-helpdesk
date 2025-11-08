import Button from "../../button/Button";
import { Modal } from "../Modal";

export interface Empresa {
  id_empresa: number;
  nome: string;
}

interface VisualizarEmpresaPayload {
  id_empresa: number;
  nome: string;
}

interface EmpresaVisualizarModalProps {
  isOpen: boolean;
  onClose: () => void;
  empresa?: Empresa | null;
  onSubmit: (payload: VisualizarEmpresaPayload) => void;
}

export const EmpresaVisualizarModal: React.FC<EmpresaVisualizarModalProps> = ({
  isOpen,
  onClose,
  empresa,
}) => {
  if (!empresa) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Visualizar Empresa"
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
            Nome da Empresa
          </p>
          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
            {empresa.nome}
          </p>
        </div>
      </div>
    </Modal>
  );
};

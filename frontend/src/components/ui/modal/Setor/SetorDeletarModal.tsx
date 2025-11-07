import React, { useState } from "react";
import { Modal } from "../Modal";
import Button from "../../../ui/button/Button";

interface SetorDeletarModalProps {
  isOpen: boolean;
  onClose: () => void;
  setor?: { id_setor: number; nome: string };
  onConfirm: (id_setor: number) => Promise<void>;
}

export const SetorDeletarModal: React.FC<SetorDeletarModalProps> = ({
  isOpen,
  onClose,
  setor,
  onConfirm,
}) => {
  const [loading, setLoading] = useState(false);

  if (!setor) return null;

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm(setor.id_setor);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Deletar Setor" size="sm">
      <div className="p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Confirmar exclusão
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Tem certeza que deseja excluir o usuário{" "}
          <span className="font-medium">{setor.nome}</span>? Esta ação não
          poderá ser desfeita.
        </p>

        <div className="mt-6 flex items-center justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirm} disabled={loading}>
            Excluir
          </Button>
        </div>
      </div>
    </Modal>
  );
};

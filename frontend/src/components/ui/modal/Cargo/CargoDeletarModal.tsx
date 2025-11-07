import React, { useState } from "react";
import { Modal } from "../Modal";
import Button from "../../../ui/button/Button";

interface CargoDeletarModalProps {
  isOpen: boolean;
  onClose: () => void;
  cargo?: { id_cargo: number; nome: string };
  onConfirm: (id_cargo: number) => Promise<void>;
}

export const CargoDeletarModal: React.FC<CargoDeletarModalProps> = ({
  isOpen,
  onClose,
  cargo,
  onConfirm,
}) => {
  const [loading, setLoading] = useState(false);

  if (!cargo) return null;

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm(cargo.id_cargo);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Deletar Cargo" size="sm">
      <div className="p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Confirmar exclusão
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Tem certeza que deseja excluir o usuário{" "}
          <span className="font-medium">{cargo.nome}</span>? Esta ação não
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

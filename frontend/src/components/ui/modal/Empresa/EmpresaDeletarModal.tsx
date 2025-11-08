import React, { useState } from "react";
import { Modal } from "../Modal";
import Button from "../../../ui/button/Button";

interface EmpresaDeletarModalProps {
  isOpen: boolean;
  onClose: () => void;
  empresa?: { id_empresa: number; nome: string };
  onConfirm: (id_empresa: number) => Promise<void>;
}

export const EmpresaDeletarModal: React.FC<EmpresaDeletarModalProps> = ({
  isOpen,
  onClose,
  empresa,
  onConfirm,
}) => {
  const [loading, setLoading] = useState(false);

  if (!empresa) return null;

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm(empresa.id_empresa);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Deletar Empresa" size="sm">
      <div className="p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Confirmar exclusão
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Tem certeza que deseja excluir a empresa{" "}
          <span className="font-medium">{empresa.nome}</span>? Esta ação não
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

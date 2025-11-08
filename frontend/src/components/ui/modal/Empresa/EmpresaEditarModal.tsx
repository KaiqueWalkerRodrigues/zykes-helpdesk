import React, { useEffect, useState, FormEvent } from "react";
import { Modal } from "../Modal";
import Button from "../../../ui/button/Button";
import Input from "../../../form/input/InputField";
import Label from "../../../form/Label";

export interface EmpresaParaEditar {
  id_empresa: number;
  nome: string;
}

interface EditarEmpresaPayload {
  id_empresa: number;
  nome: string;
}

interface EmpresaEditarModalProps {
  isOpen: boolean;
  onClose: () => void;
  empresa?: EmpresaParaEditar | null;
  onSubmit: (payload: EditarEmpresaPayload) => void;
}

export const EmpresaEditarModal: React.FC<EmpresaEditarModalProps> = ({
  isOpen,
  onClose,
  empresa,
  onSubmit,
}) => {
  const [nome, setNome] = useState("");

  useEffect(() => {
    if (isOpen && empresa) {
      setNome(empresa.nome ?? "");
    }
  }, [isOpen, empresa]);

  if (!empresa) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const payload: EditarEmpresaPayload = {
      id_empresa: empresa.id_empresa,
      nome,
    };

    onSubmit(payload);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Editar Empresa"
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" form="form-editar-empresa">
            Salvar alterações
          </Button>
        </>
      }
    >
      <form
        id="form-editar-empresa"
        onSubmit={handleSubmit}
        className="grid grid-cols-12 gap-4"
      >
        <div className="md:col-span-8 md:ml-6">
          <Label htmlFor="nome" required>
            Nome da Empresa
          </Label>
          <Input
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
      </form>
    </Modal>
  );
};

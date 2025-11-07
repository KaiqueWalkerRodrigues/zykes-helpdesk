import React, { useEffect, useState, FormEvent } from "react";
import { Modal } from "../Modal";
import Button from "../../../ui/button/Button";
import Input from "../../../form/input/InputField";
import Label from "../../../form/Label";

export interface SetorParaEditar {
  id_setor: number;
  nome: string;
}

interface EditarSetorPayload {
  id_setor: number;
  nome: string;
}

interface SetorEditarModalProps {
  isOpen: boolean;
  onClose: () => void;
  setor?: SetorParaEditar | null;
  onSubmit: (payload: EditarSetorPayload) => void;
}

export const SetorEditarModal: React.FC<SetorEditarModalProps> = ({
  isOpen,
  onClose,
  setor,
  onSubmit,
}) => {
  const [nome, setNome] = useState("");

  useEffect(() => {
    if (isOpen && setor) {
      setNome(setor.nome ?? "");
    }
  }, [isOpen, setor]);

  if (!setor) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const payload: EditarSetorPayload = {
      id_setor: setor.id_setor,
      nome,
    };

    onSubmit(payload);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Editar Setor"
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" form="form-editar-setor">
            Salvar alterações
          </Button>
        </>
      }
    >
      <form
        id="form-editar-setor"
        onSubmit={handleSubmit}
        className="grid grid-cols-12 gap-4"
      >
        <div className="md:col-span-8 md:ml-6">
          <Label htmlFor="nome" required>
            Nome do Setor
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

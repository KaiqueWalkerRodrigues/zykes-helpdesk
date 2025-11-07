import React, { useEffect, useState, FormEvent } from "react";
import { Modal } from "../Modal";
import Button from "../../../ui/button/Button";
import Input from "../../../form/input/InputField";
import Label from "../../../form/Label";

export interface CargoParaEditar {
  id_cargo: number;
  nome: string;
}

interface EditarCargoPayload {
  id_cargo: number;
  nome: string;
}

interface CargoEditarModalProps {
  isOpen: boolean;
  onClose: () => void;
  cargo?: CargoParaEditar | null;
  onSubmit: (payload: EditarCargoPayload) => void;
}

export const CargoEditarModal: React.FC<CargoEditarModalProps> = ({
  isOpen,
  onClose,
  cargo,
  onSubmit,
}) => {
  const [nome, setNome] = useState("");

  useEffect(() => {
    if (isOpen && cargo) {
      setNome(cargo.nome ?? "");
    }
  }, [isOpen, cargo]);

  if (!cargo) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const payload: EditarCargoPayload = {
      id_cargo: cargo.id_cargo,
      nome,
    };

    onSubmit(payload);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Editar Cargo"
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" form="form-editar-cargo">
            Salvar alterações
          </Button>
        </>
      }
    >
      <form
        id="form-editar-cargo"
        onSubmit={handleSubmit}
        className="grid grid-cols-12 gap-4"
      >
        <div className="md:col-span-8 md:ml-6">
          <Label htmlFor="nome" required>
            Nome do Cargo
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

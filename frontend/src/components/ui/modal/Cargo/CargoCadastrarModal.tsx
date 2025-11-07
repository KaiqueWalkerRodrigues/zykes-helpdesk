import React, { useState, useEffect, FormEvent } from "react";
import { Modal } from "../Modal";
import Button from "../../../ui/button/Button";
import Input from "../../../form/input/InputField";
import Label from "../../../form/Label";

interface NovoCargo {
  nome: string;
}

interface CargoCadastrarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (novoCargo: NovoCargo) => void;
}

export const CargoCadastrarModal: React.FC<CargoCadastrarModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [nome, setNome] = useState("");

  useEffect(() => {
    if (isOpen) {
      setNome("");
    }
  }, [isOpen]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const novoCargo: NovoCargo = {
      nome,
    };
    onSubmit(novoCargo);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Cadastrar Novo Cargo"
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="success" type="submit" form="form-cadastrar-cargo">
            Salvar
          </Button>
        </>
      }
    >
      <form
        id="form-cadastrar-cargo"
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

import React, { useState, useEffect, FormEvent } from "react";
import { Modal } from "../Modal";
import Button from "../../../ui/button/Button";
import Input from "../../../form/input/InputField";
import Label from "../../../form/Label";

interface NovoSetor {
  nome: string;
}

interface SetorCadastrarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (novoSetor: NovoSetor) => void;
}

export const SetorCadastrarModal: React.FC<SetorCadastrarModalProps> = ({
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

    const novoSetor: NovoSetor = {
      nome,
    };
    onSubmit(novoSetor);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Cadastrar Novo Setor"
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="success" type="submit" form="form-cadastrar-setor">
            Salvar
          </Button>
        </>
      }
    >
      <form
        id="form-cadastrar-setor"
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

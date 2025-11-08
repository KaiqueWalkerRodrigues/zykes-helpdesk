import React, { useState, useEffect, FormEvent } from "react";
import { Modal } from "../Modal";
import Button from "../../../ui/button/Button";
import Input from "../../../form/input/InputField";
import Label from "../../../form/Label";

interface NovoEmpresa {
  nome: string;
}

interface EmpresaCadastrarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (novoEmpresa: NovoEmpresa) => void;
}

export const EmpresaCadastrarModal: React.FC<EmpresaCadastrarModalProps> = ({
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

    const novoEmpresa: NovoEmpresa = {
      nome,
    };
    onSubmit(novoEmpresa);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Cadastrar Novo Empresa"
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="success" type="submit" form="form-cadastrar-empresa">
            Salvar
          </Button>
        </>
      }
    >
      <form
        id="form-cadastrar-empresa"
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

<?php
require_once __DIR__ . '/../models/Usuario.php';

class UsuarioController
{
    private $usuario;

    public function __construct($db)
    {
        $this->usuario = new Usuario($db);
    }

    public function listar()
    {
        $stmt = $this->usuario->listar();
        $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($usuarios);
    }

    public function cadastrar($data)
    {
        $this->usuario->nome = $data['nome'] ?? null;
        $this->usuario->usuario = $data['usuario'] ?? null;
        $this->usuario->senha = $data['senha'] ?? null;
        $this->usuario->ativo = $data['ativo'] ?? null;
        $this->usuario->created_at = $data['created_at'] ?? null;
        $this->usuario->updated_at = $data['updated_at'] ?? null;
        $this->usuario->deleted_at = $data['deleted_at'] ?? null;

        if ($this->usuario->cadastrar()) {
            http_response_code(201);
            echo json_encode(["mensagem" => "Usuario criado com sucesso"]);
        } else {
            http_response_code(400);
            echo json_encode(["mensagem" => "Erro ao criar usuario"]);
        }
    }

    public function editar($data)
    {
        $this->usuario->id_usuario = $data['id_usuario'] ?? null;
        $this->usuario->nome = $data['nome'] ?? null;
        $this->usuario->usuario = $data['usuario'] ?? null;
        $this->usuario->senha = $data['senha'] ?? null;
        $this->usuario->ativo = $data['ativo'] ?? null;
        $this->usuario->created_at = $data['created_at'] ?? null;
        $this->usuario->updated_at = $data['updated_at'] ?? null;
        $this->usuario->deleted_at = $data['deleted_at'] ?? null;

        if ($this->usuario->editar()) {
            echo json_encode(["mensagem" => "Usuário editado com sucesso"]);
        } else {
            echo json_encode(["mensagem" => "Erro ao editar usuario"]);
        }
    }

    public function deletar($id)
    {
        $this->usuario->id_usuario = $id;
        if ($this->usuario->deletar()) {
            echo json_encode(["mensagem" => "Usuário excluído"]);
        } else {
            echo json_encode(["mensagem" => "Erro ao excluir o usuario"]);
        }
    }
}

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
        $etag = $this->usuario->gerarEtag();
        header('ETag: ' . $etag);
        header('Cache-Control: no-cache');
        header('Access-Control-Expose-Headers: ETag');

        $ifNoneMatch = $_SERVER['HTTP_IF_NONE_MATCH'] ?? '';
        if ($ifNoneMatch === $etag) {
            http_response_code(304);
            return;
        }

        $stmt = $this->usuario->listar();
        $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($usuarios);
    }

    public function cadastrar($data)
    {
        if (empty($data['nome']) || empty($data['usuario']) || empty($data['senha'])) {
            http_response_code(400);
            echo json_encode(["mensagem" => "Dados obrigatórios não fornecidos"]);
            return;
        }

        $this->usuario->nome = $data['nome'];
        $this->usuario->usuario = $data['usuario'];
        $this->usuario->senha = password_hash($data['senha'], PASSWORD_DEFAULT);
        $this->usuario->ativo = isset($data['ativo']) ? $data['ativo'] : 1;
        $this->usuario->created_at = date('Y-m-d H:i:s');
        $this->usuario->updated_at = date('Y-m-d H:i:s');
        $this->usuario->deleted_at = null;

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
        if (empty($data['id_usuario'])) {
            http_response_code(400);
            echo json_encode(["mensagem" => "id_usuario é obrigatório"]);
            return;
        }

        $this->usuario->id_usuario = (int)$data['id_usuario'];

        $this->usuario->nome    = $data['nome']    ?? '';
        $this->usuario->usuario = $data['usuario'] ?? '';
        $this->usuario->ativo   = isset($data['ativo']) ? (int)$data['ativo'] : 1;

        if (isset($data['senha']) && trim($data['senha']) !== '') {
            $this->usuario->senha = password_hash($data['senha'], PASSWORD_DEFAULT);
        } else {
            $this->usuario->senha = null;
        }

        if ($this->usuario->editar()) {
            echo json_encode(["mensagem" => "Usuário editado com sucesso"]);
        } else {
            http_response_code(400);
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

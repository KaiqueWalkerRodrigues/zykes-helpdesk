<?php
require_once __DIR__ . '/../models/Cargo.php';

class CargoController
{
    private $cargo;

    public function __construct($db)
    {
        $this->cargo = new Cargo($db);
    }

    public function listar()
    {
        $etag = $this->cargo->gerarEtag();
        header('ETag: ' . $etag);
        header('Cache-Control: no-cache');
        header('Access-Control-Expose-Headers: ETag');

        $ifNoneMatch = $_SERVER['HTTP_IF_NONE_MATCH'] ?? '';
        if ($ifNoneMatch === $etag) {
            http_response_code(304);
            return;
        }

        $stmt = $this->cargo->listar();
        $cargos = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($cargos);
    }

    public function cadastrar($data)
    {
        if (empty($data['nome'])) {
            http_response_code(400);
            echo json_encode(["mensagem" => "Dados obrigatórios não fornecidos"]);
            return;
        }

        $this->cargo->nome = $data['nome'];
        $this->cargo->created_at = date('Y-m-d H:i:s');
        $this->cargo->updated_at = date('Y-m-d H:i:s');
        $this->cargo->deleted_at = null;

        if ($this->cargo->cadastrar()) {
            http_response_code(201);
            echo json_encode(["mensagem" => "Cargo criado com sucesso"]);
        } else {
            http_response_code(400);
            echo json_encode(["mensagem" => "Erro ao criar cargo"]);
        }
    }

    public function editar($data)
    {
        if (empty($data['id_cargo'])) {
            http_response_code(400);
            echo json_encode(["mensagem" => "id_cargo é obrigatório"]);
            return;
        }

        $this->cargo->id_cargo = (int)$data['id_cargo'];
        $this->cargo->nome    = $data['nome']    ?? '';

        if ($this->cargo->editar()) {
            echo json_encode(["mensagem" => "Cargo editado com sucesso"]);
        } else {
            http_response_code(400);
            echo json_encode(["mensagem" => "Erro ao editar cargo"]);
        }
    }


    public function deletar($id)
    {
        $this->cargo->id_cargo = $id;
        if ($this->cargo->deletar()) {
            echo json_encode(["mensagem" => "Cargo excluído"]);
        } else {
            echo json_encode(["mensagem" => "Erro ao excluir o cargo"]);
        }
    }
}

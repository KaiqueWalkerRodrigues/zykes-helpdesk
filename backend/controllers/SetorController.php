<?php
require_once __DIR__ . '/../models/Setor.php';

class SetorController
{
    private $setor;

    public function __construct($db)
    {
        $this->setor = new Setor($db);
    }

    public function listar()
    {
        $etag = $this->setor->gerarEtag();
        header('ETag: ' . $etag);
        header('Cache-Control: no-cache');
        header('Access-Control-Expose-Headers: ETag');

        $ifNoneMatch = $_SERVER['HTTP_IF_NONE_MATCH'] ?? '';
        if ($ifNoneMatch === $etag) {
            http_response_code(304);
            return;
        }

        $stmt = $this->setor->listar();
        $setores = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($setores);
    }

    public function cadastrar($data)
    {
        if (empty($data['nome'])) {
            http_response_code(400);
            echo json_encode(["mensagem" => "Dados obrigatórios não fornecidos"]);
            return;
        }

        $this->setor->nome = $data['nome'];
        $this->setor->created_at = date('Y-m-d H:i:s');
        $this->setor->updated_at = date('Y-m-d H:i:s');
        $this->setor->deleted_at = null;

        if ($this->setor->cadastrar()) {
            http_response_code(201);
            echo json_encode(["mensagem" => "Setor criado com sucesso"]);
        } else {
            http_response_code(400);
            echo json_encode(["mensagem" => "Erro ao criar setor"]);
        }
    }

    public function editar($data)
    {
        if (empty($data['id_setor'])) {
            http_response_code(400);
            echo json_encode(["mensagem" => "id_setor é obrigatório"]);
            return;
        }

        $this->setor->id_setor = (int)$data['id_setor'];
        $this->setor->nome    = $data['nome']    ?? '';

        if ($this->setor->editar()) {
            echo json_encode(["mensagem" => "Setor editado com sucesso"]);
        } else {
            http_response_code(400);
            echo json_encode(["mensagem" => "Erro ao editar setor"]);
        }
    }


    public function deletar($id)
    {
        $this->setor->id_setor = $id;
        if ($this->setor->deletar()) {
            echo json_encode(["mensagem" => "Setor excluído"]);
        } else {
            echo json_encode(["mensagem" => "Erro ao excluir o setor"]);
        }
    }
}

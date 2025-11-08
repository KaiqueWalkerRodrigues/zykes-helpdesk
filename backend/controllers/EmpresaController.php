<?php
require_once __DIR__ . '/../models/Empresa.php';

class EmpresaController
{
    private $empresa;

    public function __construct($db)
    {
        $this->empresa = new Empresa($db);
    }

    public function listar()
    {
        $etag = $this->empresa->gerarEtag();
        header('ETag: ' . $etag);
        header('Cache-Control: no-cache');
        header('Access-Control-Expose-Headers: ETag');

        $ifNoneMatch = $_SERVER['HTTP_IF_NONE_MATCH'] ?? '';
        if ($ifNoneMatch === $etag) {
            http_response_code(304);
            return;
        }

        $stmt = $this->empresa->listar();
        $empresas = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($empresas);
    }

    public function cadastrar($data)
    {
        if (empty($data['nome'])) {
            http_response_code(400);
            echo json_encode(["mensagem" => "Dados obrigatórios não fornecidos"]);
            return;
        }

        $this->empresa->nome = $data['nome'];
        $this->empresa->created_at = date('Y-m-d H:i:s');
        $this->empresa->updated_at = date('Y-m-d H:i:s');
        $this->empresa->deleted_at = null;

        if ($this->empresa->cadastrar()) {
            http_response_code(201);
            echo json_encode(["mensagem" => "Empresa criado com sucesso"]);
        } else {
            http_response_code(400);
            echo json_encode(["mensagem" => "Erro ao criar empresa"]);
        }
    }

    public function editar($data)
    {
        if (empty($data['id_empresa'])) {
            http_response_code(400);
            echo json_encode(["mensagem" => "id_empresa é obrigatório"]);
            return;
        }

        $this->empresa->id_empresa = (int)$data['id_empresa'];
        $this->empresa->nome    = $data['nome']    ?? '';

        if ($this->empresa->editar()) {
            echo json_encode(["mensagem" => "Empresa editado com sucesso"]);
        } else {
            http_response_code(400);
            echo json_encode(["mensagem" => "Erro ao editar empresa"]);
        }
    }


    public function deletar($id)
    {
        $this->empresa->id_empresa = $id;
        if ($this->empresa->deletar()) {
            echo json_encode(["mensagem" => "Empresa excluído"]);
        } else {
            echo json_encode(["mensagem" => "Erro ao excluir o empresa"]);
        }
    }
}

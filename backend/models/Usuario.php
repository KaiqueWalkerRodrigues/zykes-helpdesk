<?php
class Usuario
{
    private $conn;
    private $table = "usuarios";

    public $id_usuario;
    public $nome;
    public $usuario;
    public $senha;
    public $ativo;
    public $created_at;
    public $updated_at;
    public $deleted_at;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function buscar()
    {
        $query = "SELECT * FROM {$this->table} WHERE id_usuario=:id_usuario";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_usuario", $this->id_usuario);
        return $stmt->execute();
    }

    public function listar()
    {
        $query = "SELECT * FROM {$this->table}";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function cadastrar()
    {
        $query = "INSERT INTO {$this->table} (nome, usuario, senha, ativo, created_at, updated_at, deleted_at) VALUES (:nome, :usuario, :senha, :ativo, :created_at, :updated_at, :deleted_at)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nome", $this->nome);
        $stmt->bindParam(":usuario", $this->usuario);
        $stmt->bindParam(":senha", $this->senha);
        $stmt->bindParam(":ativo", $this->ativo);
        $stmt->bindParam(":created_at", $this->created_at);
        $stmt->bindParam(":updated_at", $this->updated_at);
        $stmt->bindParam(":deleted_at", $this->deleted_at);
        return $stmt->execute();
    }

    public function editar()
    {
        $query = "UPDATE {$this->table} SET nome=:nome, usuario=:usuario, senha=:senha, ativo=:ativo, created_at=:created_at, updated_at=:updated_at, deleted_at=:deleted_at WHERE id_usuario=:id_usuario";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nome", $this->nome);
        $stmt->bindParam(":usuario", $this->usuario);
        $stmt->bindParam(":senha", $this->senha);
        $stmt->bindParam(":ativo", $this->ativo);
        $stmt->bindParam(":created_at", $this->created_at);
        $stmt->bindParam(":updated_at", $this->updated_at);
        $stmt->bindParam(":deleted_at", $this->deleted_at);
        $stmt->bindParam(":id_usuario", $this->id_usuario);
        return $stmt->execute();
    }

    public function deletar()
    {
        $query = "DELETE FROM {$this->table} WHERE id_usuario=:id_usuario";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_usuario", $this->id_usuario);
        return $stmt->execute();
    }
}

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
        $query = "SELECT * FROM {$this->table} WHERE deleted_at IS NULL";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function cadastrar()
    {
        $sql = "INSERT INTO {$this->table}
            (nome, usuario, senha, ativo, created_at, updated_at, deleted_at)
            VALUES (:nome, :usuario, :senha, :ativo, NOW(6), NOW(6), :deleted_at)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':nome', trim($this->nome));
        $stmt->bindParam(':usuario', $this->usuario);
        $stmt->bindParam(':senha', $this->senha);
        $stmt->bindParam(':ativo', $this->ativo, PDO::PARAM_INT);
        $stmt->bindValue(':deleted_at', null, PDO::PARAM_NULL);
        return $stmt->execute();
    }

    public function editar()
    {
        $sets = [
            "nome = :nome",
            "usuario = :usuario",
            "ativo = :ativo",
            "updated_at = NOW(6)",
        ];
        $temSenha = ($this->senha !== null && $this->senha !== '');
        if ($temSenha) $sets[] = "senha = :senha";

        $sql = "UPDATE {$this->table} SET " . implode(", ", $sets) . " WHERE id_usuario = :id_usuario";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':nome', $this->nome);
        $stmt->bindParam(':usuario', $this->usuario);
        $ativoInt = (int)$this->ativo;
        $stmt->bindParam(':ativo', $ativoInt, PDO::PARAM_INT);
        if ($temSenha) $stmt->bindParam(':senha', $this->senha);
        $stmt->bindParam(':id_usuario', $this->id_usuario, PDO::PARAM_INT);
        return $stmt->execute();
    }

    public function deletar()
    {
        $sql = "UPDATE {$this->table}
            SET deleted_at = NOW(6), updated_at = NOW(6)
            WHERE id_usuario = :id_usuario";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id_usuario', $this->id_usuario, PDO::PARAM_INT);
        return $stmt->execute();
    }

    public function gerarEtag(): string
    {
        $sql = "SELECT
              SHA1(CONCAT_WS('|',
                COALESCE(GREATEST(MAX(updated_at), MAX(deleted_at)), '1970-01-01 00:00:00.000000'),
                COUNT(*),
                COALESCE(SUM(CRC32(CONCAT_WS('#',
                    id_usuario, nome, usuario, ativo,
                    IFNULL(updated_at,''), IFNULL(deleted_at,''))))
                ,0)
              )) AS tag
            FROM {$this->table}
            WHERE deleted_at IS NULL";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        $etag = $stmt->fetchColumn();
        return '"' . $etag . '"';
    }
}

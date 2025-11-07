<?php
class Setor
{
    private $conn;
    private $table = "setores";

    public $id_setor;
    public $nome;
    public $created_at;
    public $updated_at;
    public $deleted_at;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function buscar()
    {
        $query = "SELECT * FROM {$this->table} WHERE id_setor=:id_setor";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_setor", $this->id_setor);
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
            (nome, created_at, updated_at, deleted_at)
            VALUES (:nome, NOW(6), NOW(6), :deleted_at)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':nome', trim($this->nome));
        $stmt->bindValue(':deleted_at', null, PDO::PARAM_NULL);
        return $stmt->execute();
    }

    public function editar()
    {
        $sets = [
            "nome = :nome",
            "updated_at = NOW(6)",
        ];

        $sql = "UPDATE {$this->table} SET " . implode(", ", $sets) . " WHERE id_setor = :id_setor";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':nome', $this->nome);
        $stmt->bindParam(':id_setor', $this->id_setor, PDO::PARAM_INT);
        return $stmt->execute();
    }

    public function deletar()
    {
        $sql = "UPDATE {$this->table}
            SET deleted_at = NOW(6), updated_at = NOW(6)
            WHERE id_setor = :id_setor";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id_setor', $this->id_setor, PDO::PARAM_INT);
        return $stmt->execute();
    }

    public function gerarEtag(): string
    {
        $sql = "SELECT
              SHA1(CONCAT_WS('|',
                COALESCE(GREATEST(MAX(updated_at), MAX(deleted_at)), '1970-01-01 00:00:00.000000'),
                COUNT(*),
                COALESCE(SUM(CRC32(CONCAT_WS('#',
                    id_setor, nome,
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

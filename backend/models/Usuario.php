<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

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

    private $chaveJWT = "zyk3s";

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

    public function buscarPorToken($token)
    {
        $query = "
        SELECT id_usuario 
        FROM usuarios_tokens_jwt 
        WHERE token = :token 
          AND revogado = 0 
          AND expira_em > NOW()
        LIMIT 1
    ";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':token', $token);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$result) {
            return null;
        }

        $id_usuario = $result['id_usuario'];

        $queryUser = "
        SELECT 
            id_usuario,
            nome,
            usuario,
            ativo,
            created_at,
            updated_at
        FROM usuarios
        WHERE id_usuario = :id_usuario
        LIMIT 1
    ";

        $stmtUser = $this->conn->prepare($queryUser);
        $stmtUser->bindParam(':id_usuario', $id_usuario);
        $stmtUser->execute();

        return $stmtUser->fetch(PDO::FETCH_ASSOC);
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

    public function login($usuario, $senha)
    {
        $sql = "SELECT * FROM {$this->table}
                WHERE usuario = :usuario
                AND deleted_at IS NULL
                AND ativo = 1
                LIMIT 1";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':usuario', $usuario);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user || !password_verify($senha, $user['senha'])) {
            http_response_code(401);
            echo json_encode(["mensagem" => "Usuário ou senha inválidos"]);
            return false;
        }

        $agora = time();
        $expira = $agora + (60 * 60 * 2);

        $payload = [
            'iss' => 'zykes_helpdesk',
            'iat' => $agora,
            'exp' => $expira,
            'data' => [
                'id_usuario' => $user['id_usuario'],
                'nome' => $user['nome'],
                'usuario' => $user['usuario']
            ]
        ];

        $jwt = JWT::encode($payload, $this->chaveJWT, 'HS256');

        $sqlInsert = "INSERT INTO usuarios_tokens_jwt (id_usuario, token, expira_em, created_at)
                    VALUES (:id_usuario, :token, FROM_UNIXTIME(:expira), NOW(6))";
        $stmtInsert = $this->conn->prepare($sqlInsert);
        $stmtInsert->bindParam(':id_usuario', $user['id_usuario']);
        $stmtInsert->bindParam(':token', $jwt);
        $stmtInsert->bindParam(':expira', $expira);
        $stmtInsert->execute();

        echo json_encode([
            "success" => true,
            "token" => $jwt,
            "expira_em" => date('Y-m-d H:i:s', $expira),
            "usuario" => [
                "id_usuario" => $user['id_usuario'],
                "nome" => $user['nome'],
                "usuario" => $user['usuario']
            ]
        ]);

        return true;
    }

    public function logout($token)
    {
        if (!$token) {
            http_response_code(400);
            echo json_encode(["mensagem" => "Token não informado"]);
            return false;
        }

        $sql = "UPDATE usuarios_tokens_jwt 
            SET revogado = 1, updated_at = NOW(6)
            WHERE token = :token AND revogado = 0";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':token', $token);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            echo json_encode(["success" => true, "mensagem" => "Logout realizado com sucesso"]);
            return true;
        } else {
            http_response_code(404);
            echo json_encode(["mensagem" => "Token inválido ou já revogado"]);
            return false;
        }
    }

    public function validar_token($token)
    {
        if (!$token) {
            http_response_code(401);
            echo json_encode(["valido" => false, "erro" => "Token ausente"]);
            return false;
        }

        try {
            $dados = JWT::decode($token, new Key($this->chaveJWT, "HS256"));
            $id_usuario = $dados->data->id_usuario;

            $sql = "SELECT * FROM usuarios_tokens_jwt
                WHERE token = :token
                AND revogado = 0
                AND expira_em > NOW()
                LIMIT 1";

            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':token', $token);
            $stmt->execute();
            $registroToken = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$registroToken) {
                http_response_code(401);
                echo json_encode([
                    "valido" => false,
                    "erro" => "Token expirado ou revogado"
                ]);
                return false;
            }

            // 3 — Token válido
            echo json_encode([
                "valido" => true,
                "usuario" => [
                    "id_usuario" => $dados->data->id_usuario,
                    "nome" => $dados->data->nome,
                    "usuario" => $dados->data->usuario,
                ]
            ]);
            return true;
        } catch (\Exception $e) {
            http_response_code(401);
            echo json_encode([
                "valido" => false,
                "erro" => "Token inválido"
            ]);
            return false;
        }
    }


    public function gerarEtag(): string
    {
        $sql = "SELECT
              SHA1(CONCAT_WS('|',
                COALESCE(GREATEST(MAX(updated_at), MAX(deleted_at)), '1970-01-01 00:00:00.000000'),
                COUNT(*),
                COALESCE(SUM(CRC32(CONCAT_WS('#',
                    id_usuario, nome, usuario, ativo,
                    IFNULL(updated_at,''), IFNULL(deleted_at,'')))),
                0)
              )) AS tag
            FROM {$this->table}
            WHERE deleted_at IS NULL";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        $etag = $stmt->fetchColumn();
        return '"' . $etag . '"';
    }
}

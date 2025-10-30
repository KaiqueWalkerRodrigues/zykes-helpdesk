<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../controllers/UsuarioController.php';

$database = new Database();
$db = $database->getConnection();
$controller = new UsuarioController($db);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents("php://input"), true);

switch ($method) {
    case 'GET':
        $controller->listar();
        break;

    case 'POST':
        $controller->cadastrar($input);
        break;

    case 'PUT':
        $controller->editar($input);
        break;

    case 'DELETE':
        $id_usuario = $_GET['id_usuario'] ?? null;
        $controller->deletar($id_usuario);
        break;

    default:
        http_response_code(405);
        echo json_encode(["mensagem" => "Método não permitido"]);
        break;
}

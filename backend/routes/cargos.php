<?php
// 🔹 Coloque os headers ANTES de qualquer saída
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, If-None-Match, If-Match, If-Modified-Since, Cache-Control, Pragma");
header("Content-Type: application/json; charset=UTF-8");
header("Vary: Origin");

// 🔹 OPTIONS (pré-flight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 🔹 Agora pode importar os arquivos
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../controllers/CargoController.php';

$database = new Database();
$db = $database->getConnection();
$controller = new CargoController($db);

// 🔹 Continuar fluxo normal
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents("php://input"), true);

switch ($method) {
    case 'GET':
        $controller->listar();
        break;

    case 'POST':
        $data = $input ?? $_REQUEST;
        $controller->cadastrar($data);
        break;

    case 'PUT':
        $controller->editar($input);
        break;

    case 'DELETE':
        $id_cargo = $_GET['id_cargo'] ?? null;
        $controller->deletar($id_cargo);
        break;

    default:
        http_response_code(405);
        echo json_encode(["mensagem" => "Método não permitido"]);
        break;
}

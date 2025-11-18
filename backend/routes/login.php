<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../controllers/UsuarioController.php';

$database = new Database();
$db = $database->getConnection();
$controller = new UsuarioController($db);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

$origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
header("Access-Control-Allow-Origin: $origin");
header('Vary: Origin');

$allowedHeaders = 'Content-Type, Authorization, X-Requested-With, If-None-Match, If-Match, If-Modified-Since, Cache-Control, Pragma';
if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']) && $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'] !== '') {
    header('Access-Control-Allow-Headers: ' . $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']);
} else {
    header('Access-Control-Allow-Headers: ' . $allowedHeaders);
}

// Responde a requisições OPTIONS (CORS preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents("php://input"), true);

switch ($method) {
    case 'POST':
        $data = $input ?? $_REQUEST;

        // Se vier um token, desloga
        if (isset($data['token'])) {
            $controller->logout($data);
        }
        // Caso contrário, tenta login
        elseif (isset($data['usuario']) && isset($data['senha'])) {
            $controller->login($data);
        } else {
            http_response_code(400);
            echo json_encode(["mensagem" => "Parâmetros inválidos"]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["mensagem" => "Método não permitido"]);
        break;
}

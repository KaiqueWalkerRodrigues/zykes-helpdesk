<?php
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
if (strpos($uri, '/usuarios') === 0) {
    require_once __DIR__ . '/routes/usuarios.php';
    exit;
}

http_response_code(404);
echo json_encode(["mensagem" => "Rota não encontrada"]);

<?

$host = 'mysql';
$db = 'zykes_hd';
$user = 'zykes_user';
$pass = 'password';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Conectado ao banco com sucesso!";
} catch (PDOException $e) {
    echo "Erro: " . $e->getMessage();
}

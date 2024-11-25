<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "tienda";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

$q = isset($_GET["q"]) ? $_GET["q"] : "";

if (!empty($q)) {
    $q = $conn->real_escape_string($q); 
    $sql = "SELECT * FROM productos WHERE nombre_producto LIKE '%$q%'";
    $result = $conn->query($sql);

    if ($result) {
        $productos = [];
        while ($row = $result->fetch_assoc()) {
            $productos[] = $row;
        }
        echo json_encode($productos);
    } else {
        echo "Error en la consulta: " . $conn->error;
    }
} else {
    echo json_encode([]); 
}

$conn->close();
?>

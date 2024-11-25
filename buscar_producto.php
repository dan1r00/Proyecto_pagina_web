<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mi_tienda"; 

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

$busqueda = $_GET['q']; 

$sql = "SELECT * FROM productos WHERE nombre_producto LIKE '%$busqueda%'";
$resultado = $conn->query($sql);

$productos = [];

if ($resultado->num_rows > 0) {
    while ($row = $resultado->fetch_assoc()) {
        $productos[] = $row;
    }
}

$conn->close();

echo json_encode($productos);
?>

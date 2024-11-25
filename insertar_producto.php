<?php
$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "nombre_de_tu_base_de_datos"; 

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$nombre_producto = $_POST['nombre_producto'];
$precio_producto = $_POST['precio_producto'];
$descripcion_producto = $_POST['descripcion_producto'];

$sql = "INSERT INTO productos (nombre_producto, precio_producto, descripcion_producto)
        VALUES ('$nombre_producto', '$precio_producto', '$descripcion_producto')";

if ($conn->query($sql) === TRUE) {
    echo "Nuevo producto insertado con éxito";
} else {
    echo "Error al insertar el producto: " . $conn->error;
}

$conn->close();
?>

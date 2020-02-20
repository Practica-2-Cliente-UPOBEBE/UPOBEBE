<?php

// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "upobebe";
$usuario   = "root";
$password  = "";

$dni = $_GET["dni"];

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

// Consulta SQL para obtener los datos de los centros.
$sql = "select * from clientes where dni = '".$dni."'";
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));

$fila = mysqli_fetch_assoc($resultados);
if($fila){
    $respuesta["existe"] = 1;
}else{
    $respuesta["existe"] = 0;
}
echo json_encode($respuesta);

mysqli_close($conexion);
?>
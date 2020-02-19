<?php

// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "upobebe";
$usuario   = "root";
$password  = "";

$id = $_GET["ID"];

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

// Consulta SQL para obtener los datos de los centros.
$sql = "select nombre, precio from articulos where id = '".$id."'";
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));

$fila = mysqli_fetch_assoc($resultados);
$respuesta["nombre"] = $fila["nombre"];
$respuesta["precio"] = $fila["precio"];


echo json_encode($respuesta);

mysqli_close($conexion);
?>
<?php

// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "upobebe";
$usuario   = "root";
$password  = "";



// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

// Consulta SQL para obtener los datos de los centros.
$sql = "select * from lineas_ventas where id_venta is null";
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));
$arrayDatos = Array();
while($fila = mysqli_fetch_assoc($resultados)){
    $arrayDatos[] = $fila;
}


if (count($arrayDatos) == 0){
    $respuesta["existe"] = 0;
} else {
    $respuesta["existe"] = 1;
}
$respuesta["datos"] = $arrayDatos;

echo json_encode($respuesta);

mysqli_close($conexion);
?>
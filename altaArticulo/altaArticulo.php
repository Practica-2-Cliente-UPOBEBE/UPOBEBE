<?php

// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "upobebe";
$usuario   = "root";
$password  = "";

// Recojo los datos de entrada
//$datosJSON = $_POST["datos"];
$nombre = $_POST["txtNombreArticulo"];
$descripcion = $_POST["txtDescripcionArticulo"];
$categoria = $_POST["txtCategoriaArticulo"];
$precio = $_POST["txtPrecioArticulo"];
//Decodifico el objeto articulo
//$articulo = json_decode($datosJSON);

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");
mysqli_query($conexion,"utf8");
$sql ="select max(id) + 1 as num from articulos";
$resultado = mysqli_query($conexion,$sql);
$fila = $resultado->fetch_assoc();

$sql = "INSERT INTO articulos VALUES (".$fila["num"].",'$nombre','$descripcion',$categoria,$precio);";
$resultado = mysqli_query($conexion,$sql);

if ($resultado){
    $respuesta["error"] = 0;
    $respuesta["mensaje"] = "Alta realizada"; 
} else {
    $respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error en el proceso de alta: ".mysqli_error($conexion);
}

echo json_encode($respuesta);

mysqli_close($conexion);
?>
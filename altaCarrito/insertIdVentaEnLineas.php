<?php

// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "upobebe";
$usuario   = "root";
$password  = "";
$articulo = $_POST["datos"];
// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

// Consulta SQL para obtener los datos de los centros.
$sql = "SELECT max(id) as id FROM `ventas`";
$resultado = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));
$idVenta = mysqli_fetch_assoc($resultado);

//Modificar cada linea de pedido que esté a null
//$sql2 = "UPDATE `lineas_ventas` SET `id_venta` = '".$idVenta["id"]."' WHERE `lineas_ventas`.`id_venta` is null";
$sql2 ="INSERT lineas_ventas (id_articulo, id_venta) VALUES ('$articulo','".$idVenta["id"]."')";// meter en el array las unidades y luego pasarlo aqui y comprobar que el articulo es el id
$resultado2 = mysqli_query($conexion,$sql2) or die(mysqli_error($conexion));

mysqli_close($conexion);
?>
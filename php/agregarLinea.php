<?php

// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "upobebe";
$usuario   = "root";
$password  = "";


$nombreArt = $_POST["nombreArticulo"];
// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");
mysqli_query($conexion,"utf8");

$c = "SELECT id FROM `articulos` WHERE `nombre` = '".$nombreArt."'";
$a = mysqli_query($conexion,$c);
$x = mysqli_fetch_assoc($a);
$id = $x["id"];

$consulta = "SELECT * FROM `lineas_ventas` WHERE `id_articulo` = '".$id."' AND `id_venta` is null";
$resultado = mysqli_query($conexion,$consulta);

if($fila = mysqli_fetch_assoc($resultado)){
    //Si existe se añade una unidad a la línea
    $unidades = $fila["unidades"] + 1;
    $sqlSumarUnidad = "UPDATE `lineas_ventas` SET `unidades` = '".$unidades."' WHERE `lineas_ventas`.`id_linea` = ".$fila["id_linea"]."";
    if(mysqli_query($conexion,$sqlSumarUnidad)){
        $devolver["mensaje"] = "Se ha añadido una unidad a la línea";
    }else{
        $devolver["mensaje"] = "Error en el proceso: " .mysqli_error($conexion);
    }
    
}else{
    //Si no se añade el artículo con una unidad
    $sql = "INSERT INTO `lineas_ventas` (`id_linea`, `id_articulo`, `id_venta`, `unidades`) VALUES (NULL, '".$id."', NULL, '1');";
    $resultado2 = mysqli_query($conexion,$sql);
    if($resultado2){
        $devolver["mensaje"] = "Se ha añadido un artículo";
    }else{
        $devolver["mensaje"] = "Error en el proceso: " .mysqli_error($conexion);
    }
    
}
echo json_encode($devolver);
mysqli_close($conexion);
?>
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
$sql = "select id_articulo, unidades from lineas_ventas where id_venta =".$_GET["id_venta"]."";
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));

//Nombre del articulo, precio, unidades y total de la linea
$XML ='<?xml version="1.0" encoding="UTF-8"?>';
$XML .='<datos>';
while($fila = mysqli_fetch_assoc($resultados)){
    $precio = mysqli_fetch_assoc(mysqli_query($conexion,"SELECT precio FROM `articulos` WHERE id = '".$fila["id_articulo"]."'"))["precio"];
    $XML .='<linea>';
        $XML .='<nombreArt>'.mysqli_fetch_assoc(mysqli_query($conexion,"SELECT nombre FROM `articulos` WHERE id = '".$fila["id_articulo"]."'"))["nombre"].'</nombreArt>';
        $XML .='<precio>'.$precio.'</precio>';
        $XML .='<unidades>'.$fila["unidades"].'</unidades>';
        $XML .='<totalLinea>'.$fila["unidades"]*$precio.'</totalLinea>';
    $XML .='</linea>';
}

$XML .='</datos>';

// Cabecera de respuesta indicando que el contenido de la respuesta es XML
header("Content-Type: text/xml");
// Para que el navegador no haga cache de los datos devueltos por la página PHP.
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');


echo $XML;

mysqli_close($conexion);
?>
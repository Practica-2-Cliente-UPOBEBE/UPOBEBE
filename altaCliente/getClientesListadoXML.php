<?php

// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "upobebe";
$usuario   = "root";
$password  = "";



// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");
mysqli_query($conexion,"utf8");


$sql = "SELECT * FROM `clientes`";
$resultado = mysqli_query($conexion,$sql);

$XML ='<?xml version="1.0" encoding="UTF-8"?>';
$XML .='<datos>';

while ($fila = mysqli_fetch_assoc($resultado)) {
    $XML .='<cliente>';
        $XML .='<dni>'.$fila["dni"].'</dni>';
        $XML .='<nombre>'.$fila["nombre"].'</nombre>';
        $XML .='<apellidos>'.$fila["apellidos"].'</apellidos>';
        $XML .='<direccion>'.$fila["direccion"].'</direccion>';
        $XML .='<correo>'.$fila["correo"].'</correo>';
        $XML .='<telefono>'.$fila["telefono"].'</telefono>';
    $XML .='</cliente>';
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
<?php

// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "upobebe";
$usuario   = "root";
$password  = "";



// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");
//Datos
$dniCliente = $_POST["dniCliente"];
$dniEmpleado = $_POST["dniEmpleado"];
$fecha = $_POST["fecha"];

// Consulta SQL para obtener los datos de los centros.
$sql = "INSERT INTO `ventas` (`id`, `dni_cliente`, `dni_empleado`, `fecha`) VALUES (NULL, '".$dniCliente."', '".$dniEmpleado."', '".$fecha."')";
$resultado = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));

if($resultado){
    $respuesta["insertado"] = 1;
}else{
    $respuesta["insertado"] = 0;
    $respuesta["mensaje"] = "Error en el proceso de alta: ".mysqli_error($conexion);
}
echo json_encode($respuesta);

mysqli_close($conexion);
?>
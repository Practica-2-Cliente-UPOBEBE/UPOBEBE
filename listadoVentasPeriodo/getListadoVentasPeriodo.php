<?php
// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "upobebe";
$usuario   = "root";
$password  = "";

//$datosJSON = $_GET["fechaInicio"];
//print_r($datosJSON);
//$venta = json_decode($datosJSON);

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");
mysqli_query($conexion,"utf8");

$sql1 = "SELECT ventas.id,clientes.nombre AS cliente,empleados.nombre AS empleado, ventas.fecha, SUM(articulos.precio * lineas_ventas.unidades ) AS total FROM ventas,clientes,empleados,lineas_ventas,articulos 
WHERE ventas.dni_cliente = clientes.dni AND ventas.dni_empleado = empleados.dni AND lineas_ventas.id_venta = ventas.id AND lineas_ventas.id_articulo = articulos.id 
WHERE fecha BETWEEN '".$_GET["fechaInicio"]."' AND '".$_GET["fechaFin"]."'
GROUP BY ventas.id,clientes.nombre ,empleados.nombre , ventas.fecha";

echo $sql1;

$resultado = mysqli_query($conexion,$sql1);

$XML ='<?xml version="1.0" encoding="UTF-8"?>';
$XML .='<datos>';
/*
while ($fila = mysqli_fetch_assoc($resultado)) {
    $XML .='<venta>';
        $XML .='<id>'.$fila["id"].'</id>';
        $XML .='<nombreCli>'.mysqli_fetch_assoc(mysqli_query($conexion,"SELECT nombre FROM `clientes` WHERE dni = '".$fila["dni_cliente"]."'"))["nombre"].'</nombreCli>';
        $XML .='<nombreEmple>'.mysqli_fetch_assoc(mysqli_query($conexion,"SELECT nombre FROM `empleados` WHERE dni = '".$fila["dni_empleado"]."'"))["nombre"].'</nombreEmple>';
        $XML .='<linea>'..'<linea>';
        $XML .='<total>'..'<total>';
        $XML .='<fecha>'.$fila["fecha"].'</fecha>';
    $XML .='</venta>';
}
*/
while($fila = mysqli_fetch_assoc($resultado)){
    $XML .='<venta>';
    $XML .='<id>'.$fila["id"].'</id>';
    $XML .='<nombreCli>'.$fila["cliente"].'</nombreCli>';
    $XML .='<nombreEmple>'.$fila["empleado"].'</nombreEmple>';
    $XML .='<total>'.$fila["total"].'</total>';
    $XML .='<fecha>'.$fila["fecha"].'</fecha>';
    $XML .='</venta>';
}

$XML .='</datos>';

// Cabecera de respuesta indicando que el contenido de la respuesta es XML
header("Content-Type: text/xml");
// Para que el navegador no haga cache de los datos devueltos por la página PHP.
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');


echo $XML;

mysqli_close($conexion);



/*NO borrar

SQL juan 

SELECT ventas.id,clientes.nombre AS cliente,empleados.nombre AS empleado, ventas.fecha, SUM(articulos.precio * lineas_ventas.unidades ) AS total FROM ventas,clientes,empleados,lineas_ventas,articulos 
WHERE ventas.dni_cliente = clientes.dni AND ventas.dni_empleado = empleados.dni AND lineas_ventas.id_venta = ventas.id AND lineas_ventas.id_articulo = articulos.id 
GROUP BY ventas.id,clientes.nombre ,empleados.nombre , ventas.fecha


SELECT LV.id_linea,LV.id_articulo,ARTI.nombre,ARTI.precio,LV.unidades FROM LINEAS_VENTAS LV INNER JOIN ARTICULOS ARTI ON LV.id_articulo=ARTI.id 

SELECT LV.id_linea,LV.id_articulo,ARTI.nombre,ARTI.precio,LV.unidades FROM LINEAS_VENTAS LV INNER JOIN ARTICULOS ARTI ON LV.id_articulo=ARTI.id WHERE LV.id_venta=16 


*/

?>
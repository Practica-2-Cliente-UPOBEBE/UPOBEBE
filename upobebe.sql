-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-02-2020 a las 14:15:19
-- Versión del servidor: 10.1.35-MariaDB
-- Versión de PHP: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `upobebe`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulos`
--

CREATE TABLE `articulos` (
  `id` int(20) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `descripcion` varchar(60) NOT NULL,
  `id_categoria` varchar(20) NOT NULL,
  `precio` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `articulos`
--

INSERT INTO `articulos` (`id`, `nombre`, `descripcion`, `id_categoria`, `precio`) VALUES
(1, 'Carrito Azul', 'Carrito para bebe con soporte para mochila', 'Carros', 200),
(2, 'Biberon-PepaPig', 'Biberón con diseño de los dibujos animados PepePig', 'Alimentacion', 40),
(3, 'Pañales DOMBEBE', 'Pack de pañales para bebes de 0-2 años', 'Textil', 60),
(4, 'Sonajero', 'El mejor pasatiempo para un bebé', 'Juguetes', 5),
(5, 'Cuna', 'Cuna de madera, muy segura', 'Cunas', 105);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `dni` varchar(9) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `apellidos` varchar(25) NOT NULL,
  `direccion` varchar(60) NOT NULL,
  `correo` varchar(30) NOT NULL,
  `telefono` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`dni`, `nombre`, `apellidos`, `direccion`, `correo`, `telefono`) VALUES
('44444444C', 'Cliente Primero', 'Apellidos Cliente Primero', 'Calle Cliente 1', 'cliente1@email.com', 888888888),
('55555555C', 'Cliente Segundo', 'Apellidos Cliente Segundo', 'Calle Cliente 2', 'cliente2@email.com', 999999998),
('66666666C', 'Cliente Tercero', 'Apellidos Clientes Tercer', 'Calle cliente 3', 'cliente3@email.com', 999998888);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `dni` varchar(9) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `apellidos` varchar(25) NOT NULL,
  `salario` double NOT NULL,
  `direccion` varchar(40) NOT NULL,
  `correo` varchar(20) NOT NULL,
  `rol` varchar(20) NOT NULL,
  `telefono` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`dni`, `nombre`, `apellidos`, `salario`, `direccion`, `correo`, `rol`, `telefono`) VALUES
('11111111A', 'Lola', 'Lorenzo Lomas', 1004, 'Calle 1', 'lola@email.com', 'Encargada', 999999999),
('22222222A', 'Juan', 'Rodríguez Tomás', 960, 'Calle 2', 'juan@email.com', 'Dependiente', 888888888),
('33333333A', 'Ana', 'Pérez Ramona', 1200, 'Calle 3', 'ana@email.com', 'Jefa', 777777777);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lineas_ventas`
--

CREATE TABLE `lineas_ventas` (
  `id_linea` int(20) NOT NULL,
  `id_articulo` int(20) NOT NULL,
  `id_venta` int(20) NOT NULL,
  `unidades` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id` int(20) NOT NULL,
  `dni_cliente` varchar(9) NOT NULL,
  `dni_empleado` varchar(9) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `articulos`
--
ALTER TABLE `articulos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`dni`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`dni`);

--
-- Indices de la tabla `lineas_ventas`
--
ALTER TABLE `lineas_ventas`
  ADD PRIMARY KEY (`id_linea`),
  ADD KEY `id_venta` (`id_venta`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `articulos`
--
ALTER TABLE `articulos`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `lineas_ventas`
--
ALTER TABLE `lineas_ventas`
  MODIFY `id_linea` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

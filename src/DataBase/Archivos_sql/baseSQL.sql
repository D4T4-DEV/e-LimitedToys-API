CREATE DATABASE IF NOT EXISTS eLimitedToys_bd;

USE eLimitedToys_bd;

CREATE TABLE IF NOT EXISTS Usuarios (
	id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombres VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    psw_hash VARCHAR(255) NOT NULL,
    nick VARCHAR(255) NOT NULL,
    is_account_paused BOOLEAN DEFAULT FALSE,
    prof_pic LONGTEXT
);

CREATE TABLE IF NOT EXISTS Pais (
	id_pais INT PRIMARY KEY AUTO_INCREMENT,
	pais VARCHAR(255) NOT NULL
);


CREATE TABLE IF NOT EXISTS Ciudad (
	id_ciudad INT PRIMARY KEY AUTO_INCREMENT,
	ciudad VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Colonia (
	id_colonia INT PRIMARY KEY AUTO_INCREMENT,
	colonia VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Codigo_Postal (
	id_codigo_postal INT PRIMARY KEY AUTO_INCREMENT,
	codigo_postal VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Direccion (
	id_direccion INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    calle VARCHAR(255) NOT NULL,
    id_colonia INT,
    id_ciudad INT,
    id_pais INT,
    id_codigo_postal INT,
    referencias VARCHAR(255),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (id_colonia) REFERENCES Colonia(id_colonia),
    FOREIGN KEY (id_ciudad) REFERENCES Ciudad(id_ciudad),
    FOREIGN KEY (id_pais) REFERENCES Pais(id_pais),
    FOREIGN KEY (id_codigo_postal) REFERENCES Codigo_Postal(id_codigo_postal)
);

CREATE TABLE IF NOT EXISTS Productos (
	id_producto INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    marca VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Imagenes_productos (
	id_prod_img INT PRIMARY KEY AUTO_INCREMENT,
    id_producto INT,
    prod_img LONGTEXT NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES Productos(id_producto)
);

CREATE TABLE IF NOT EXISTS Inventario (
	id_inv INT PRIMARY KEY AUTO_INCREMENT,
    id_producto INT,
    precio_producto DECIMAL(10,2),
    precio_envio DECIMAL(10,2),
    existencia INT,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

CREATE TABLE IF NOT EXISTS Ventas (
	id_hist INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    id_producto INT,
    fecha_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

CREATE TABLE IF NOT EXISTS Carrito (
	id_carrito INT PRIMARY KEY AUTO_INCREMENT,
    id_producto INT,
    id_usuario INT,
    cantidad_seleccionada INT,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- DROP DATABASE eLimitedToys_bd;

-- SELECT * FROM Usuarios;

-- SELECT * FROM Direccion;
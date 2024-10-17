/* PROCEDIMIENTO PARA PODER INSERTAR UN NUEVO PRODUCTO*/
DELIMITER //

CREATE PROCEDURE Agregar_nuevo_producto(
    IN p_nombre VARCHAR(255),
    IN p_marca VARCHAR(255),
    IN p_descripcion VARCHAR(255),
    IN p_precio_producto DECIMAL(10, 2),
    IN p_precio_envio DECIMAL(10, 2),
    IN p_existencia INT,
	IN p_prod_imgs LONGTEXT
)
BEGIN
    -- Variables del procedimiento
    DECLARE id_generado_producto INT;
    DECLARE imagen LONGTEXT; -- Usado para almacenar los datos de la imagen que se toma
    DECLARE delimitador CHAR(1) DEFAULT ','; -- Indicador para cortar y tomar el valor de una imagen

    -- Insertar un nuevo producto en "PRODUCTOS"
    INSERT INTO Productos (nombre, marca, descripcion) VALUES (
        p_nombre, 
        p_marca, 
        p_descripcion
    );
    SET id_generado_producto = LAST_INSERT_ID(); -- ID GENERADO DE LA INSERSIÓN

    -- Insertar los datos en el inventario
    INSERT INTO Inventario (id_producto, precio_producto, precio_envio, existencia) VALUES (
        id_generado_producto,
        p_precio_producto, 
        p_precio_envio, 
        p_existencia
    );

    /*
        -- Insertar la imagenes del producto (aplica solo una)
        INSERT INTO Imagenes_productos (id_producto, prod_img) VALUES (
            id_generado_producto, 
            p_prod_imgs
        ); 
    */

    -- Insertar las imagenes del producto (aplica varias pero separadas por comas   ejemplo: dataimgUno,dataimgDos,...)

    WHILE LENGTH(p_prod_imgs) > 0 DO
        SET imagen = SUBSTRING_INDEX(p_prod_imgs, delimitador, 1); -- Obtener la primera imagen y setearla
        INSERT INTO Imagenes_productos (id_producto, prod_img) VALUES (id_generado_producto, imagen); -- Insertar imagen en la tabla
        SET p_prod_imgs = SUBSTRING(p_prod_imgs, LENGTH(imagen) + 2); -- Eliminar la imagen insertada de la cadena
    END WHILE;

END //

DELIMITER ;



/*
-- Ejemplo de uso 
CALL Agregar_nuevo_producto(
    'Producto A',  -- Nombre del producto
    'Marca A',     -- Marca del producto
    'Descripción A', -- Descripción del producto
    100.00,        -- Precio del producto
    10.00,         -- Precio de envío
    50,             -- Existencia
	'dataIMG1.jpg,dataIMG2.jpg,dataIMG3.jpg,dataIMG4.jpg,dataIMG5.jpg' -- Conjunto de imagenes separada por ','
);

*/
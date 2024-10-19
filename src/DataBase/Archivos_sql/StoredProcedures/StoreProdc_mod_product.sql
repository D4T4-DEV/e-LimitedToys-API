/* PROCEDIMIENTO PARA PODER INSERTAR UN NUEVO PRODUCTO*/
DELIMITER //

CREATE PROCEDURE EditarProducto(
    IN p_id_producto INT,
    IN p_nombre VARCHAR(255),
    IN p_marca VARCHAR(255),
    IN p_descripcion VARCHAR(255),
    IN p_precio_producto DECIMAL(10, 2),
    IN p_precio_envio DECIMAL(10, 2),
    IN p_existencia INT,
	IN p_prod_imgs LONGTEXT, 
    OUT mensaje VARCHAR(255)
)
BEGIN
    -- Variables del procedimiento
    DECLARE v_id_producto INT DEFAULT NULL;
    DECLARE imagen LONGTEXT; -- Usado para almacenar los datos de la imagen que se toma
    DECLARE delimitador CHAR(1) DEFAULT ','; -- Indicador para cortar y tomar el valor de una imagen

    -- Checar que existe el producto
    SELECT id_producto INTO v_id_producto
    FROM Productos
    WHERE id_producto = p_id_producto;

    IF v_id_producto IS NOT NULL THEN
        -- Estas acciones las toma siempre y cuando exista el id del producto

        -- Actualizacion de la tabla Productos
        UPDATE Productos SET
        nombre = p_nombre, 
        marca = p_marca, 
        descripcion = p_marca
        WHERE id_producto = p_id_producto;

        -- Actualizacion de la tabla Inventario
        UPDATE Inventario
        SET 
            precio_producto = p_precio_producto,
            precio_envio = p_precio_envio,
            existencia = p_existencia
        WHERE id_producto = p_id_producto;

        -- Eliminamos las imagenes para mejor manejo
        DELETE FROM Imagenes_productos WHERE id_producto = p_id_producto;

        -- Insertar las imagenes del producto (aplica varias pero separadas por comas ejemplo: dataimgUno,dataimgDos,...)
        WHILE LENGTH(p_prod_imgs) > 0 DO
            SET imagen = SUBSTRING_INDEX(p_prod_imgs, delimitador, 1); -- Obtener la primera imagen y setearla
            INSERT INTO Imagenes_productos (id_producto, prod_img) VALUES (p_id_producto, imagen); -- Insertar imagen en la tabla
            SET p_prod_imgs = SUBSTRING(p_prod_imgs, LENGTH(imagen) + 2); -- Eliminar la imagen insertada de la cadena
        END WHILE;

        SET mensaje = 'El producto actualizado';
    ELSE
        SET mensaje = 'El producto no existe';
    END IF;
END //

DELIMITER ;

/*
-- Ejemplo de uso 
CALL EditarProducto(
    2, -- id del producto
    'Producto B',  -- Nombre del producto
    'Marca C',     -- Marca del producto
    'Descripción A', -- Descripción del producto
    100.00,        -- Precio del producto
    10.00,         -- Precio de envío
    50,             -- Existencia
	'dataIMG1.jpg,dataIMG2.jpg,dataIMG3.jpg,dataIMG4.jpg,dataIMG5.jpg' -- Conjunto de imagenes separada por ','
    @mensaje -- mensaje de confirmacion
);

-- Ver el mensaje de salida
SELECT @mensaje;
*/
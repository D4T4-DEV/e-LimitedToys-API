/* PROCEDIMIENTO PARA PODER INSERTAR UN NUEVO PRODUCTO*/
DELIMITER //

CREATE PROCEDURE EliminarProducto(
    IN p_id_producto INT,
    OUT mensaje VARCHAR(255)
)
BEGIN
    -- Variables del procedimiento
    DECLARE v_id_producto INT DEFAULT NULL;

    -- Checar que existe el producto
    SELECT id_producto INTO v_id_producto
    FROM Productos
    WHERE id_producto = p_id_producto;

    IF v_id_producto IS NOT NULL THEN
        -- Estas acciones las toma siempre y cuando exista el id del producto

        -- Eliminamos las imagenes asociadas al producto
        DELETE FROM Imagenes_productos WHERE id_producto = p_id_producto;

        -- Eliminamos de la tabla Productos
        DELETE FROM Productos WHERE id_producto = p_id_producto;

        -- Eliminamos de la tabla Inventario
        DELETE FROM Inventario WHERE id_producto = p_id_producto;

        SET mensaje = 'El producto se ha eliminado';
    ELSE
        SET mensaje = 'El producto no existe';
    END IF;
END //

DELIMITER ;

/*
-- Ejemplo de uso 
CALL EliminarProducto(
    1, -- id del producto
    @mensaje -- mensaje de confirmacion
);

-- Ver el mensaje de salida
SELECT @mensaje;
*/
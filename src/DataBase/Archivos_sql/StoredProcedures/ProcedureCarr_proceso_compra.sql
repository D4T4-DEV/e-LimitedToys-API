DELIMITER //

CREATE PROCEDURE ProcesarCompra(IN in_id_usuario INT, OUT mensaje VARCHAR(255))
BEGIN

    -- Verifixamos antes que exista un carrito con ese usuario (esto para no ejecutar codigo innecesario)
    IF EXISTS (
        SELECT 1
        FROM Carrito
        WHERE id_usuario = in_id_usuario
    ) THEN
            CREATE TEMPORARY TABLE ProductosFaltantes AS 
            SELECT 
                Carrito.id_carrito,
                Carrito.id_producto,
                Carrito.cantidad_seleccionada,
                Inventario.existencia
            FROM 
                Carrito
            JOIN 
                Inventario ON Carrito.id_producto = Inventario.id_producto
            WHERE 
                Carrito.id_usuario = in_id_usuario
                AND Carrito.cantidad_seleccionada > Inventario.existencia;

            IF EXISTS (SELECT 1 FROM ProductosFaltantes) THEN
                    -- Si hay registros, devolver los datos
                    SELECT * FROM ProductosFaltantes;
                ELSE
                        -- Si no hay registros, devolver un mensaje
                        CALL FinalizarCompra(in_id_usuario);
                        SET mensaje = 'Compra finalizada correctamente';
                END IF;
            -- Eliminar la tabla temporal después de su uso
            DROP TEMPORARY TABLE ProductosFaltantes;
    ELSE
        SET mensaje = 'Este usuario no cuenta con productos en el carrito';
    END IF;
END //

DELIMITER ;

/*
	CALL ProcesarCompra(5, @mensaje);
    SELECT @mensaje as mensaje;
*/
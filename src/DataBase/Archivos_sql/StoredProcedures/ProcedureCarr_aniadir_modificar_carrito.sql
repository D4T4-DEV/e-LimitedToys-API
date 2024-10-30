DELIMITER //

CREATE PROCEDURE Agregar_modificar_carrito(
    IN in_id_usuario INT,
    IN in_id_producto INT,
    IN in_cantidad INT,
    OUT mensaje VARCHAR(255)
)
BEGIN
	DECLARE v_exist_prd_in_carrito INT DEFAULT 0; -- variable para guardar el total de los items en el carrito
	DECLARE v_id_carrito INT;
    DECLARE v_existencias_inv INT;
    
    SELECT existencia 
    INTO v_existencias_inv 
    FROM Inventario 
    WHERE id_producto = in_id_producto;
    
	SELECT id_carrito, IFNULL(cantidad_seleccionada, 0)
    INTO v_id_carrito, v_exist_prd_in_carrito
    FROM Carrito 
    WHERE 
    id_usuario = in_id_usuario 
    AND id_producto = in_id_producto;

	-- Verificar Si la cantidad actual y la nueva no excede las del inventario
    IF (v_exist_prd_in_carrito + in_cantidad) <= v_existencias_inv THEN
        IF v_id_carrito IS NOT NULL THEN
            -- Actualizar la cantidad, si existe y no excede la cantidad
            UPDATE Carrito 
            SET cantidad_seleccionada = v_exist_prd_in_carrito + in_cantidad
            WHERE id_usuario = in_id_usuario AND id_producto = in_id_producto;
			SET mensaje = 'Cantidad del producto actualizada en el carrito';
        ELSE
            -- Agregarlo si no existe y no excede la cantidad del inventario
            INSERT INTO Carrito (id_usuario, id_producto, cantidad_seleccionada) 
            VALUES (in_id_usuario, in_id_producto, in_cantidad);
			SET mensaje = 'Producto agregado al carrito';
        END IF;
    ELSE
		SET mensaje = 'Cantidad excede las existencias disponibles en el inventario';
    END IF;
END //

DELIMITER ;

/*
CALL Agregar_modificar_carrito(
    1, -- ID del usuario
    5, -- ID del producto
    0, -- Cantidad seleccionada del producto
    @mensaje -- Mensaje del procedimiento
); -- llamada al procedure, por medio de su ID del producto
SELECT @mensaje; -- Tomamos el mensaje
*/
DELIMITER //

CREATE PROCEDURE FinalizarCompra(IN p_id_usuario INT)
BEGIN
    -- Declara variables para almacenar el id del producto y la cantidad seleccionada
    DECLARE v_id_producto INT;
    DECLARE v_cantidad_seleccionada INT;
	DECLARE v_precio_producto DECIMAL(10,2);
    DECLARE v_precio_envio DECIMAL(10,2);
    
    -- Declara un cursor para obtener los productos en el carrito del usuario y sus cantidades
    DECLARE carrito_cursor CURSOR FOR 
        SELECT id_producto, cantidad_seleccionada FROM Carrito WHERE id_usuario = p_id_usuario;
    
    -- Control de finalización del cursor
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_id_producto = NULL;
    
    -- Abre el cursor
    OPEN carrito_cursor;
    
    -- Bucle para iterar sobre los productos en el carrito
    fetch_loop: LOOP
        -- Obtiene el próximo producto y la cantidad seleccionada en el carrito
        FETCH carrito_cursor INTO v_id_producto, v_cantidad_seleccionada;
        
        -- Si no hay más productos, sale del bucle
        IF v_id_producto IS NULL THEN
            LEAVE fetch_loop;
        END IF;

        -- Se obtienen los precio individuales y de envio de la tabla inventario
        SELECT precio_producto, precio_envio 
        INTO v_precio_producto, v_precio_envio
        FROM Inventario
        WHERE id_producto = v_id_producto;
        
        -- Actualiza la existencia del producto en inventario, restando la cantidad seleccionada
        UPDATE Inventario
        SET existencia = existencia - v_cantidad_seleccionada
        WHERE id_producto = v_id_producto
          AND existencia >= v_cantidad_seleccionada;  -- Evita que la existencia sea negativa
          
		-- Borramos los datos de su carrito por comprarlos
		DELETE FROM Carrito  WHERE id_usuario = p_id_usuario; 
        
        -- Inserta los datos de la compra 
		INSERT INTO Ventas (id_usuario, id_producto, precio_ind, precio_env, cantidad_comprada)
        VALUES (p_id_usuario, v_id_producto, v_precio_producto, v_precio_envio, v_cantidad_seleccionada);
		
    END LOOP;
    
    -- Cierra el cursor
    CLOSE carrito_cursor;
END //

DELIMITER ;
DELIMITER //

CREATE PROCEDURE ObtenerHistorialVentas (
    IN p_id_usuario INT,
    IN p_pagina INT,
    OUT mensaje VARCHAR(255)
)
BEGIN
    DECLARE v_limite INT DEFAULT 5;
    DECLARE v_offset INT DEFAULT (p_pagina - 1) * v_limite;
    DECLARE v_total_ventas INT;

    SELECT COUNT(*) INTO v_total_ventas
    FROM Ventas
    WHERE id_usuario = p_id_usuario; -- Couenta las veces que aparece el id del usuario dentro de la tabla ventas

    IF v_total_ventas = 0 THEN -- y si no a parece el id del usuario en la tabla ventas, se manda el siguiente mensaje
        SET mensaje = 'El usuario no ha comprado nada';
    ELSE -- si si aparece se hacen join para mostrar su historial de compra
		SELECT 
			v.fecha_compra,
			p.nombre AS nombre_producto,
			p.descripcion AS descripcion_producto,
			p.marca,
			(SELECT ip.prod_img -- 
			FROM Imagenes_productos ip 
			WHERE ip.id_producto = p.id_producto 
			LIMIT 1) AS imagen_producto, -- todo esto es para solo seleccionar 1 imagen
			i.precio_producto,
			i.precio_envio
		FROM Ventas v
		JOIN Productos p ON v.id_producto = p.id_producto
		JOIN Inventario i ON p.id_producto = i.id_producto
		WHERE v.id_usuario = p_id_usuario -- aqui se filtra por el id del usuario
		ORDER BY v.fecha_compra DESC
		LIMIT v_limite OFFSET v_offset;
		SET mensaje = 'Ventas encontradas';
    END IF;
    
END //

DELIMITER ;

/*
CALL ObtenerHistorialVentas(
    1, -- llama al usuario con el id 1
    1, -- y la pagina 1 del historial de este mismo
    @mensaje -- y el mensaje para que muestre si encuentra o no al usuario en la tabla ventas
);  
SELECT @mensaje; -- y con el mensaje se avisa si hay o no el usuario
*/
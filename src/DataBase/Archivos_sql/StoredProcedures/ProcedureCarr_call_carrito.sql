DELIMITER //

CREATE PROCEDURE ObtenerCarrito(
    IN idUsuario INT,
    OUT mensaje VARCHAR(255)
)
BEGIN
	DECLARE v_total_item INT; -- variable para guardar el total de los items en el carrito
	SELECT COUNT(*) INTO v_total_item -- cuenta el número de items
    FROM Carrito -- que hay en la tabla carrito
    WHERE id_usuario = idUsuario; -- en base al número de veces que aparece el id del usuario
    
    IF v_total_item = 0 THEN -- si no aparece
		SET mensaje = 'El usuario no tiene carrito'; -- da este mensaje
	ELSE -- si no
		SELECT -- hace los joins para mostrar la lista de los items en el carrito
			c.id_producto,
            c.cantidad_seleccionada,
			p.nombre AS nombre_producto,
			p.descripcion AS descripcion_producto,
			p.marca,
			(SELECT ip.prod_img -- 
			FROM Imagenes_productos ip 
			WHERE ip.id_producto = p.id_producto 
			LIMIT 1) AS imagen_producto, -- todo esto es para solo seleccionar 1 imagen
			i.precio_producto,
			i.precio_envio
		FROM 
            Carrito c
        LEFT JOIN 
            Inventario i ON c.id_producto = i.id_producto
        LEFT JOIN 
            Productos p ON c.id_producto = p.id_producto
        WHERE -- se filtra que solo se muestren los items del id que se busco
			c.id_usuario = idUsuario
        GROUP BY 
            c.id_producto, c.cantidad_seleccionada, p.nombre, p.descripcion, p.marca, i.precio_producto, i.precio_envio, i.existencia;
		SET mensaje = 'Carrito del usuario encontrado';
	END IF;
END //

DELIMITER ;

/*
CALL ObtenerCarrito(
    4, -- id del usuario
    @mensaje -- mensaje a mostrar
);
SELECT @mensaje; -- seleccion al mensaje para que aparesca en mysql
*/
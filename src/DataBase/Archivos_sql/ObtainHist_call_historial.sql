DELIMITER //

CREATE PROCEDURE ObtenerHistorialVentas (
    IN p_id_usuario INT,
    IN p_pagina INT
)
BEGIN
    DECLARE v_limite INT DEFAULT 5;
    DECLARE v_offset INT DEFAULT (p_pagina - 1) * v_limite;

    SELECT 
        v.fecha_compra,
        p.nombre AS nombre_producto,
        p.descripcion AS descripcion_producto,
        p.marca,
        (SELECT ip.prod_img 
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
    
END //

DELIMITER ;

CALL ObtenerHistorialVentas(1, 1); -- llama a la pagina 1 del historial del usuario con el id 1
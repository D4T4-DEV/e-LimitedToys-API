DELIMITER //

CREATE PROCEDURE ObtenerProductosDestacados()
BEGIN
    SELECT 
		p.id_producto,
        p.nombre,
        p.descripcion,
        p.marca,
        GROUP_CONCAT(ip.prod_img SEPARATOR ', ') AS imagenes_producto, -- imágenes agrupadas
        i.precio_producto,
        i.precio_envio,
        i.existencia
    FROM 
        Productos p
    LEFT JOIN 
        Imagenes_productos ip ON p.id_producto = ip.id_producto
    JOIN 
        Inventario i ON p.id_producto = i.id_producto
    WHERE 
        p.is_featured = TRUE -- Solo tomamos los productos destacados
        AND i.existencia > 0 -- y solo tomamos productos con existencia
    GROUP BY 
        p.id_producto, p.nombre, p.descripcion, p.marca, i.precio_producto, i.precio_envio, i.existencia
    ORDER BY 
        RAND() -- Orden aleatorio para destacar productos variados
    LIMIT 12; -- Limite de 12 productos a devolver
END //

DELIMITER ;
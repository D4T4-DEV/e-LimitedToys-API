DELIMITER //

CREATE PROCEDURE ObtenerProductoPorID(
    IN productoID INT -- parámetro para el ID del producto
)
BEGIN
    SELECT 
        p.nombre,
        p.descripcion,
        p.marca,
        GROUP_CONCAT(ip.prod_img SEPARATOR ', ') AS imagenes_producto, -- se utiliza GROUP_CONCAT para mostrar las imágenes en una sola fila
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
        p.id_producto = productoID -- Buscamos por ID y por que cumpla que
        -- AND p.is_product_paused = FALSE -- mo sea un producto pausado (sin stock), no aplicamos esto porque puede ser un historial de compra
    GROUP BY 
        p.id_producto, p.nombre, p.descripcion, p.marca, i.precio_producto, i.precio_envio, i.existencia;

END //

DELIMITER ;

/*
CALL ObtenerProductoPorID(1); -- llamada al procedure, por medio de su ID del producto
*/
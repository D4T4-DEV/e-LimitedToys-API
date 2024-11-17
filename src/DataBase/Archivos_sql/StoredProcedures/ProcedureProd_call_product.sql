DELIMITER //

CREATE PROCEDURE ObtenerProductos(
    IN lista INT -- parámetro llamado lista que sirve para mostrar 15 productos
)
BEGIN
    DECLARE pagina INT;
    SET pagina = (lista - 1) * 15; -- este es el desplazamiento para que la segunda vez inicie en 15

    SELECT 
        p.id_producto,
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
        p.is_product_paused = FALSE -- se filtra los productos pausados (sin stock)
    GROUP BY 
        p.id_producto, p.nombre, p.descripcion, p.marca, i.precio_producto, i.precio_envio, i.existencia
    LIMIT 15 OFFSET pagina;

END //

DELIMITER ;

/*
CALL ObtenerProductos(1); -- llamada al procedure, a la pagina 1 (los primero 15 productos)
*/
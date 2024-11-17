DELIMITER //

CREATE PROCEDURE ObtenerProductosPorFiltro(
    IN lista INT,
    IN texto_de_busqueda VARCHAR(255) -- variable del texto que se va a usar para buscar
)
BEGIN
    DECLARE pagina INT;
    SET pagina = (lista - 1) * 15;  -- este es el desplazamiento para que la segunda vez inicie en 15

    SELECT 
        p.id_producto,
        p.nombre_producto,
        p.descripcion,
        p.marca,
        GROUP_CONCAT(ip.prod_img SEPARATOR ', ') AS imagenes_producto,
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
        p.is_product_paused = FALSE -- se filtran los productos pausados
        AND (
            p.nombre_producto LIKE CONCAT('%', texto_de_busqueda, '%') OR -- concat para encontrar por nombre
            p.marca LIKE CONCAT('%', texto_de_busqueda, '%') OR -- concat para encontrar por marca
            p.descripcion LIKE CONCAT('%', texto_de_busqueda, '%') -- concat para encontrar por descripcion
        )
    GROUP BY 
        p.id_producto, p.nombre_producto, p.descripcion, p.marca, i.precio_producto, i.precio_envio, i.existencia
    LIMIT 15 OFFSET pagina;

END //

DELIMITER ;

/*
CALL ObtenerProductosPorFiltro(
	1, -- numero de pagina
    'Set' -- La busqueda
);
*/
DELIMITER //

CREATE PROCEDURE ObtenerPrecioYMarca()
BEGIN
    -- selecciona las marcas unicas
    SELECT DISTINCT p.marca 
    FROM Productos p;

    -- busca el precio mas alto y mas bajo
    SELECT 
        MAX(i.precio_producto) AS Precio_Maximo,
        MIN(i.precio_producto) AS Precio_Minimo
    FROM Inventario i;
END //

DELIMITER ;

-- CALL ObtenerPrecioYMarca();
DELIMITER //

CREATE TRIGGER checar_si_sera_producto_destacado
AFTER INSERT ON Ventas
FOR EACH ROW
BEGIN
    DECLARE ventas_semana INT;
    DECLARE ventas_totales INT;
    
    -- Cuenta cuantas ventas del producto se realizaron en la ultima semana
    SELECT COUNT(*)
    INTO ventas_semana
    FROM Ventas
    WHERE id_producto = NEW.id_producto
    AND fecha_compra >= NOW() - INTERVAL 1 WEEK; -- Intervalo de tiempo de una semana de la fechas registradas
    
    -- Suma las cantidades de productos vendidos en total (esto puede tambien ocurrir)
    SELECT SUM(cantidad_comprada)
    INTO ventas_totales
    FROM Ventas
    WHERE id_producto = NEW.id_producto
    AND fecha_compra >= NOW() - INTERVAL 1 WEEK; -- Intervalo de tiempo de una semana de la fechas registradas


    -- Si la cantidad de ventas en la semana es mayor o igual a 5 se activa
    IF ventas_semana >= 5 OR  ventas_totales >= 20 THEN
        -- Actualizamos el campo is_featured a TRUE para el producto correspondiente, lo que lo destacara
        UPDATE Productos
        SET is_featured = TRUE
        WHERE id_producto = NEW.id_producto;
    END IF;
END//

DELIMITER ;
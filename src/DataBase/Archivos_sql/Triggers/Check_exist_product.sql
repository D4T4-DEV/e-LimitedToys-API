CREATE TRIGGER checar_existencias_productos_inventario
AFTER  UPDATE ON Inventario
FOR EACH ROW
BEGIN 

    IF NEW.existencia = 0 THEN
        UPDATE Productos
        SET is_product_paused = TRUE
        WHERE id_producto = NEW.id_producto;
    ELSE
        UPDATE Productos
        SET is_product_paused = FALSE
        WHERE id_producto = NEW.id_producto;
    END IF;
END;

/*
    Este trigger se activa antes de cada modificacion
    de la tabla Inventario, haciendo que si este es igual a cero
    el producto ya no se tenga una existencia y por ende se etiquete que 
    el producto esta pausado, el estado pausado es que no se tienen unidades,
    pero posiblemente se puedan en un futuro volver a la venta.
*/
DELIMITER //

CREATE EVENT restablecer_productos_destacados
ON SCHEDULE EVERY 1 WEEK STARTS CURRENT_TIMESTAMP + INTERVAL 1 WEEK
-- Aqui se puede delimitar su culmino, ej. ENDS '2025-01-01 00:00:00'
DO
BEGIN
    -- Restablecemos el campo is_featured a FALSE para todos los productos pasada la semana
    UPDATE Productos
    SET is_featured = FALSE;
END//

DELIMITER ;

-- Para mostrar los eventos programados -> SHOW EVENTS;
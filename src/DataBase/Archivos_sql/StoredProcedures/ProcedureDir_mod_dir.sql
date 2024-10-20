DELIMITER //

CREATE PROCEDURE ModificarDireccion(
    IN i_id_usuario INT,
    IN i_calle VARCHAR(255),
    IN i_referencias VARCHAR(255),
    IN i_pais VARCHAR(255),
    IN i_ciudad VARCHAR(255),
    IN i_colonia VARCHAR(255),
    IN i_codigo_postal VARCHAR(255),
    OUT mensaje VARCHAR(255)
)
BEGIN
    DECLARE v_id_usuario INT;
    DECLARE v_id_pais INT;
    DECLARE v_id_ciudad INT;
    DECLARE v_id_colonia INT;
    DECLARE v_id_codigo_postal INT;

    SELECT id_usuario INTO v_id_usuario
    FROM Usuarios
    WHERE id_usuario = i_id_usuario;

    IF v_id_usuario IS NULL THEN
        SET mensaje = 'El usuario no existe';
    ELSE
        SELECT id_pais INTO v_id_pais
        FROM Pais
        WHERE pais = i_pais;

        IF v_id_pais IS NULL THEN
           INSERT INTO Pais(pais)
           VALUES (i_pais);

           SET v_id_pais = LAST_INSERT_ID();
        END IF;

        SELECT id_ciudad INTO v_id_ciudad
        FROM Ciudad
        WHERE ciudad = i_ciudad;

        IF v_id_ciudad IS NULL THEN
           INSERT INTO Ciudad(ciudad)
           VALUES (i_ciudad);

           SET v_id_ciudad = LAST_INSERT_ID();
        END IF;

        SELECT id_colonia INTO v_id_colonia
        FROM Colonia
        WHERE colonia = i_colonia;

        IF v_id_colonia IS NULL THEN
           INSERT INTO Colonia(colonia)
           VALUES (i_colonia);

           SET v_id_colonia = LAST_INSERT_ID();
        END IF;

        SELECT id_codigo_postal INTO v_id_codigo_postal
        FROM Codigo_Postal
        WHERE codigo_postal = i_codigo_postal;

        IF v_id_codigo_postal IS NULL THEN
           INSERT INTO Codigo_Postal(codigo_postal)
           VALUES (i_codigo_postal);

           SET v_id_codigo_postal = LAST_INSERT_ID();
        END IF;

        UPDATE Direccion
		SET 
			calle = i_calle,
			id_colonia = v_id_colonia,
			id_ciudad = v_id_ciudad,
			id_pais = v_id_pais,
			id_codigo_postal = v_id_codigo_postal,
			referencias = i_referencias
		WHERE id_usuario = v_id_usuario;
        
        SET mensaje = 'Se modifico la direccion';
    END IF;
END //

DELIMITER ;

/*
-- Esto esta relacionado con el ejemplo StoreUsu_add_user.sql
CALL ModificarDireccion(
    1, -- este es el id el cual se va a modificar
    'Calle modificada de ejemplo 123', -- cambio de calle
    'Referencia modificada', -- cambio de referencia
    'México', -- el pais se mantiene
    'Sapopan', -- cambio de ciudad
    'Caucel City', -- cambio de colonia
    '06700', -- se cambia el codigo postal
	@mensaje -- mensaje de confirmacion
);
SELECT @mensaje; -- para mostrar el mensaje
*/
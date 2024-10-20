DELIMITER //

CREATE PROCEDURE InsertarUsuario(
    IN i_nombres VARCHAR(255),
    IN i_apellido VARCHAR(255),
    IN i_email VARCHAR(255),
    IN i_psw_hash VARCHAR(255),
    IN i_nick VARCHAR(255),
    IN i_prof_pic LONGTEXT,
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
    WHERE email = i_email;

    IF v_id_usuario IS NULL THEN
        INSERT INTO Usuarios(nombres, apellido, email, psw_hash, nick, prof_pic)
        VALUES (i_nombres, i_apellido, i_email, i_psw_hash, i_nick, i_prof_pic);
       
        SET v_id_usuario = LAST_INSERT_ID();

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

        INSERT INTO Direccion (id_usuario, calle, id_colonia, id_ciudad, id_pais, id_codigo_postal, referencias)
        VALUES (
            v_id_usuario,
            i_calle,
            v_id_colonia,
            v_id_ciudad,
            v_id_pais,
            v_id_codigo_postal,
            i_referencias
        );
        
        SET mensaje = 'Se inserto un usuario';
    ELSE 
        SET mensaje = 'El usuario existe';
    END IF;

    
END //

DELIMITER ;

/*
CALL InsertarUsuario(
    'Juan', -- nombre
    'Pérez', -- apellido
    'juan.perez@example.com', -- email
    'hashed_password', -- contraseña
    'juap', -- nickname
    'link_a_imagen_de_perfil', -- imagen base64
    'Calle Falsa 123', -- calle
    'Referencia cercana', -- referencia
    'México', -- pais
    'Ciudad de México', -- ciudad
    'Colonia Centro', -- colonia
    '06000', -- codigo_postal
    @mensaje -- mensaje de confirmacion
);
SELECT @mensaje; -- para mostrar el mensaje
*/
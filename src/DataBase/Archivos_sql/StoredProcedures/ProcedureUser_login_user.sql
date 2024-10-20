DELIMITER //

CREATE PROCEDURE IniciarSesion(
    IN i_email VARCHAR(255),
    OUT mensaje VARCHAR(255)
)
BEGIN
    DECLARE v_id_usuario INT;
    DECLARE v_is_paused BOOLEAN;

    SELECT id_usuario, is_account_paused 
    INTO v_id_usuario, v_is_paused
    FROM Usuarios
    WHERE email = i_email;

    IF v_id_usuario IS NULL THEN

        SET mensaje = 'Usuario no encontrado';

    ELSEIF v_is_paused = TRUE THEN

        -- Cuenta "Eliminada" -> Pausada
        SET mensaje = 'El usuario pauso su cuenta, contacte a soporte';

    ELSE
        -- Si no se cumple alguna de las condiciones anteriores se consulta
        -- debido a que si existe la cuenta y esta activada
        SELECT id_usuario, nick, prof_pic, psw_hash 
        FROM Usuarios 
        WHERE email = i_email;
        SET mensaje = 'Devolviendo datos';

    END IF;

END //

DELIMITER ;

/*
CALL IniciarSesion(
    'a@a.com', -- email del usuario
    @mensaje -- mensaje de confirmacion
);
SELECT @mensaje; -- para mostrar el mensaje
*/
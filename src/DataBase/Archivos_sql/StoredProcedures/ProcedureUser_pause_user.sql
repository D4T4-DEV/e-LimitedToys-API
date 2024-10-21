DELIMITER //

CREATE PROCEDURE BorrarCuentaUsuario(
    IN i_id_user VARCHAR(255),
    OUT mensaje VARCHAR(255)
)
BEGIN
    DECLARE v_id_usuario INT;

    SELECT id_usuario INTO v_id_usuario
    FROM Usuarios
    WHERE id_usuario = i_id_user;

    IF v_id_usuario IS NOT NULL THEN

        UPDATE Usuarios SET
        is_account_paused = TRUE
        WHERE id_usuario = i_id_user;

        SET mensaje = 'Se pauso la cuenta del usuario';
    ELSE 
        SET mensaje = 'El usuario no existe';
    END IF;

    
END //

DELIMITER ;

/*
CALL BorrarCuentaUsuario(
    '1' -- id del usuario
    @mensaje -- mensaje de confirmacion
);
SELECT @mensaje; -- para mostrar el mensaje
*/
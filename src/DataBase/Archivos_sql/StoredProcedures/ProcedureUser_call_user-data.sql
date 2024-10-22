DELIMITER //

CREATE PROCEDURE ObtenerDatosUsuario(
    IN i_id_usuario INT
)
BEGIN
    SELECT 
        u.nombres,
        u.apellido,
        u.email,
        u.nick,
        u.prof_pic,
        p.pais,
        c.ciudad,
        co.colonia,
        c_p.codigo_postal,
        d.calle,
        d.referencias
    FROM 
        Usuarios u
    LEFT JOIN 
        Direccion d ON u.id_usuario = d.id_usuario
    LEFT JOIN 
        Pais p ON d.id_pais = p.id_pais
    LEFT JOIN 
        Ciudad c ON d.id_ciudad = c.id_ciudad
    LEFT JOIN 
        Colonia co ON d.id_colonia = co.id_colonia
    LEFT JOIN 
        Codigo_Postal c_p ON d.id_codigo_postal = c_p.id_codigo_postal
    WHERE 
        u.id_usuario = i_id_usuario;
END //

DELIMITER ;

-- CALL ObtenerDatosUsuario(1); -- se obtienen los datos por el id
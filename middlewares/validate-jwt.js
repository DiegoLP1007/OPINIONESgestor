'use strict';

import jwt from 'jsonwebtoken';
import User from '../src/usuarios/usuario.model.js';

export const validarJWT = async (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No hay token en la petición'
        });
    }

    try {
        // Verificar el token usando la SECRET_KEY de tu .env
        const { uid } = jwt.verify(token, process.env.SECRET_KEY);

        // Leer el usuario que corresponde al uid
        const user = await User.findById(uid);

        if (!user || !user.status) {
            return res.status(401).json({
                success: false,
                message: 'Token no válido - usuario no existe o está inactivo'
            });
        }

        // Guardar el usuario en la request para que los controladores lo usen
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: 'Token no válido'
        });
    }
};
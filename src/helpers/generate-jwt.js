'use strict'

import jwt from 'jsonwebtoken'

/**
 * Genera un Token Web de JSON (JWT) para un usuario
 * @param {string} uid - ID único del usuario (Mongo ID)
 * @returns {Promise} - Retorna el token o un error
 */
export const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid }

        // El token expirará en 3 horas. Puedes ajustarlo a '1h', '24h', etc.
        jwt.sign(
            payload,
            process.env.SECRET_KEY,
            { expiresIn: '3h' },
            (err, token) => {
                if (err) {
                    console.error('Error al generar el JWT:', err)
                    reject('No se pudo generar el token')
                } else {
                    resolve(token)
                }
            }
        )
    })
}
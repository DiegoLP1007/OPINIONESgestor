'use strict';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { dbConnection } from './db.js';
import { errorHandler } from '../middlewares/handle-errors.js';
import { validarJWT } from '../middlewares/validate-jwt.js';
import { requestLimit } from '../middlewares/request-limit.js';
import { corsOptions } from './cors-configuration.js';

// Importación de rutas de los módulos creados
import usuarioRoutes from '../src/usuarios/usuario.router.js';
import postsRoutes from '../src/posts/post.router.js';
import commentsRoutes from '../src/comments/comment.router.js';

const BASE_URL = '/opiniones/v1';

const middlewares = (app) => {
    app.use(helmet());
    app.use(cors(corsOptions));
    app.use(requestLimit);
    app.use(validarJWT);
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
    app.use(express.json({ limit: '10mb' }));
    app.use(morgan('dev'));
}

const routes = (app) => {
    app.use(`${BASE_URL}/usuario`, usuarioRoutes);
    app.use(`${BASE_URL}/posts`, postsRoutes);
    app.use(`${BASE_URL}/comments`, commentsRoutes);
}

const initServer = async () => {
    const app = express();
    const PORT = process.env.PORT || 3000;

    try {
        await dbConnection(); // Conectamos a MongoDB (Facelook)
        middlewares(app);
        routes(app);

        // Manejador de errores global
        app.use(errorHandler);

        // Ruta de salud del sistema
        app.get(`${BASE_URL}/health`, (req, res) => {
            res.status(200).json({
                status: 'UP',
                service: 'Gestión de Opiniones (Facelook)',
                version: '1.0.0'
            });
        });

        app.listen(PORT, () => {
            console.log(`-----------------------------------------`);
            console.log(` Servidor corriendo en el puerto ${PORT}`);
            console.log(` Base URL: http://localhost:${PORT}${BASE_URL}`);
            console.log(`-----------------------------------------`);
        });

    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
}

export { initServer };
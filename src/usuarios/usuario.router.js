'use strict';

import { Router } from 'express';
import { registrar, login, updatePerfil } from './usuario.controller.js';
import { check } from 'express-validator';

const router = Router();

router.post('/registrar', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('email', 'Correo no válido').isEmail(),
    check('password', 'La contraseña debe ser de al menos 6 caracteres').isLength({ min: 6 }),
], registrar);

router.post('/login', [
    check('loginIdentifier', 'El email o username es requerido').not().isEmpty(),
    check('password', 'La contraseña es requerida').not().isEmpty(),
], login);

router.put('/perfil/:id', updatePerfil); 
export default router;
'use strict';

import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

// Validaciones para el Registro de Usuario
export const validateRegister = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('El nombre es requerido'),
    body('username')
        .trim()
        .notEmpty()
        .withMessage('El nombre de usuario es requerido')
        .isLength({ min: 4 })
        .withMessage('El username debe tener al menos 4 caracteres'),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('El correo es requerido')
        .isEmail()
        .withMessage('No es un correo válido'),
    body('password')
        .notEmpty()
        .withMessage('La contraseña es requerida')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres'),
    checkValidators
];

// Validaciones para el Login
export const validateLogin = [
    body('loginIdentifier')
        .trim()
        .notEmpty()
        .withMessage('Debe proporcionar su email o nombre de usuario'),
    body('password')
        .notEmpty()
        .withMessage('La contraseña es requerida'),
    checkValidators
];

// Validaciones para Actualizar Perfil
export const validateUpdateProfile = [
    body('name')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('El nombre no puede estar vacío'),
    body('username')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('El nombre de usuario no puede estar vacío'),
    body('email')
        .optional()
        .trim()
        .isEmail()
        .withMessage('No es un correo válido'),
    // Validación específica para el cambio de contraseña
    body('newPassword')
        .optional()
        .isLength({ min: 6 })
        .withMessage('La nueva contraseña debe tener al menos 6 caracteres'),
    body('oldPassword')
        .if(body('newPassword').exists())
        .notEmpty()
        .withMessage('Debe ingresar su contraseña anterior para establecer una nueva'),
    checkValidators
];

// Validación para obtener usuario por ID (en caso de que lo necesites)
export const validateGetUserById = [
    param('id')
        .isMongoId()
        .withMessage('ID de MongoDB no válido'),
    checkValidators
];
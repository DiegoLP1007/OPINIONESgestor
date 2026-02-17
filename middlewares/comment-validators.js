'use strict';

import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

// Validaciones para crear un comentario
export const validateAddComment = [
    body('text')
        .trim()
        .notEmpty()
        .withMessage('El texto del comentario no puede estar vacío'),
    body('post')
        .notEmpty()
        .withMessage('El ID del post es obligatorio')
        .isMongoId()
        .withMessage('El ID del post no tiene un formato válido'),
    checkValidators
];

// Validaciones para editar un comentario
export const validateUpdateComment = [
    param('id')
        .isMongoId()
        .withMessage('ID de comentario no válido'),
    body('text')
        .trim()
        .notEmpty()
        .withMessage('El nuevo texto del comentario no puede estar vacío'),
    checkValidators
];

// Validación para eliminar un comentario
export const validateDeleteComment = [
    param('id')
        .isMongoId()
        .withMessage('ID de comentario no válido'),
    checkValidators
];
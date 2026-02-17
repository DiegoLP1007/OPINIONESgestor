'use strict';

import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

// Validaciones para crear una publicación
export const validateCreatePost = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('El título es obligatorio')
        .isLength({ max: 150 })
        .withMessage('El título no puede exceder los 150 caracteres'),
    body('category')
        .trim()
        .notEmpty()
        .withMessage('La categoría es obligatoria'),
    body('content')
        .notEmpty()
        .withMessage('El contenido de la publicación es obligatorio'),
    checkValidators
];

// Validaciones para actualizar una publicación
export const validateUpdatePost = [
    param('id')
        .isMongoId()
        .withMessage('ID de publicación no válido'),
    body('title')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('El título no puede estar vacío')
        .isLength({ max: 150 })
        .withMessage('El título no puede exceder los 150 caracteres'),
    body('category')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('La categoría no puede estar vacía'),
    body('content')
        .optional()
        .notEmpty()
        .withMessage('El contenido no puede estar vacío'),
    checkValidators
];

// Validación para eliminar o ver una publicación por ID
export const validatePostId = [
    param('id')
        .isMongoId()
        .withMessage('ID de publicación no válido'),
    checkValidators
];
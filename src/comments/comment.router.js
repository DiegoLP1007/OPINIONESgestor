'use strict';

import { Router } from 'express';
import { check } from 'express-validator';
import { addComment, updateComment, deleteComment } from './comment.controller.js';
import { validarCampos } from '../../middlewares/check-validators.js';

const router = Router();

// Agregar comentario
router.post('/', [
    check('text', 'El contenido del comentario es requerido').not().isEmpty(),
    check('post', 'El ID del post es obligatorio y debe ser válido').isMongoId(),
    validarCampos
], addComment);
// Editar comentario
router.put('/:id', [
    check('id', 'ID no válido').isMongoId(),
    check('text', 'El nuevo texto es requerido').not().isEmpty(),
    validarCampos
], updateComment);

// Eliminar comentario
router.delete('/:id', [
    check('id', 'ID no válido').isMongoId(),
    validarCampos
], deleteComment);

export default router;
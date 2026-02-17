import { Router } from 'express';
import { check } from 'express-validator';
import { createPost, getPosts, updatePost, deletePost } from './post.controller.js';
import { validarJWT } from '../../middlewares/validate-jwt.js';
import { validarCampos } from '../../middlewares/check-validators.js';

const router = Router();

// Ver publicaciones (Público)
router.get('/', getPosts);

// Crear post (Privado)
router.post('/', [
    validarJWT,
    check('title', 'El título es requerido').not().isEmpty(),
    check('category', 'La categoría es requerida').not().isEmpty(),
    check('content', 'El contenido es requerido').not().isEmpty(),
    validarCampos
], createPost);

// Editar post (Privado - Solo autor)
router.put('/:id', [
    validarJWT,
    validarCampos
], updatePost);

// Eliminar post (Privado - Solo autor)
router.delete('/:id', [
    validarJWT,
    validarCampos
], deletePost);

export default router;
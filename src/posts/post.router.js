import { Router } from 'express';
import { check } from 'express-validator';
import { createPost, getPosts, updatePost, deletePost } from './post.controller.js';
import { validarCampos } from '../../middlewares/check-validators.js';

const router = Router();

// Ver publicaciones (Público)
router.get('/', getPosts);

// Crear post (Privado)
router.post('/', [
    check('title', 'El título es requerido').not().isEmpty(),
    check('category', 'La categoría es requerida').not().isEmpty(),
    check('content', 'El contenido es requerido').not().isEmpty(),
    validarCampos
], createPost);

// Editar post (Privado - Solo autor)
router.put('/:id', [
    validarCampos
], updatePost);

// Eliminar post (Privado - Solo autor)
router.delete('/:id', [
    validarCampos
], deletePost);

export default router;
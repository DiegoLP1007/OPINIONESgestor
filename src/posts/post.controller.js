'use strict';

import Post from './post.model.js';

// Crear una nueva publicación
export const createPost = async (req, res) => {
    try {
        const post = new Post(req.body);
        await post.save();

        res.status(201).json({
            success: true,
            message: 'Publicación creada',
            post
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear post',
            error: error.message
        });
    }
};

// Obtener todas las publicaciones
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'name username')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            posts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener posts',
            error: error.message
        });
    }
};

// Actualizar post
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Post actualizado',
            updatedPost
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar post',
            error: error.message
        });
    }
};

// Eliminar post (eliminación física)
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        await Post.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Publicación eliminada'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar post',
            error: error.message
        });
    }
};

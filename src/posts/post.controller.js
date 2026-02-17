'use strict';

import Post from './post.model.js';

// Crear una nueva publicación
export const createPost = async (req, res) => {
    try {
        const data = req.body;
        data.author = req.user._id;
        const post = new Post(data);
        await post.save();

        res.status(201).json({ success: true, message: 'Publicación creada', post });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear post', error: error.message });
    }
};

// Obtener todas las publicaciones activas
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({ status: true })
            .populate('author', 'name username')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, posts });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener posts', error: error.message });
    }
};

// Actualizar post (Solo si es el autor)
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const uid = req.user._id;

        const post = await Post.findById(id);

        if (!post) return res.status(404).json({ success: false, message: 'Post no encontrado' });
        if (post.author.toString() !== uid.toString()) {
            return res.status(401).json({ success: false, message: 'No tienes permiso para editar esta publicación' });
        }

        const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ success: true, message: 'Post actualizado', updatedPost });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar post', error: error.message });
    }
};

// Eliminar post (Eliminación lógica y validación de autor)
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const uid = req.user._id;

        const post = await Post.findById(id);

        if (!post) return res.status(404).json({ success: false, message: 'Post no encontrado' });

        if (post.author.toString() !== uid.toString()) {
            return res.status(401).json({ success: false, message: 'No puedes eliminar un post ajeno' });
        }

        await Post.findByIdAndUpdate(id, { status: false });
        res.status(200).json({ success: true, message: 'Publicación eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar post', error: error.message });
    }
};
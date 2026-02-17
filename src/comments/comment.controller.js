'use strict';

import Comment from './comment.model.js';
import Post from '../posts/post.model.js';

// Agregar un comentario
export const addComment = async (req, res) => {
    try {
        const { text, postId } = req.body;
        const uid = req.user._id;
        const postExists = await Post.findById(postId);
        if (!postExists || !postExists.status) {
            return res.status(404).json({ success: false, message: 'El post al que intentas comentar no existe' });
        }

        const comment = new Comment({
            text,
            post: postId,
            author: uid
        });

        await comment.save();

        res.status(201).json({ success: true, message: 'Comentario agregado', comment });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al agregar comentario', error: error.message });
    }
};

// Actualizar comentario (Solo el autor)
export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;
        const uid = req.user._id;

        const comment = await Comment.findById(id);

        if (!comment) return res.status(404).json({ success: false, message: 'Comentario no encontrado' });
        if (comment.author.toString() !== uid.toString()) {
            return res.status(401).json({ success: false, message: 'No tienes permiso para editar este comentario' });
        }

        const updatedComment = await Comment.findByIdAndUpdate(id, { text }, { new: true });
        res.status(200).json({ success: true, message: 'Comentario actualizado', updatedComment });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar comentario', error: error.message });
    }
};

// Eliminar comentario (Solo el autor)
export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const uid = req.user._id;

        const comment = await Comment.findById(id);

        if (!comment) return res.status(404).json({ success: false, message: 'Comentario no encontrado' });

        if (comment.author.toString() !== uid.toString()) {
            return res.status(401).json({ success: false, message: 'No puedes eliminar un comentario ajeno' });
        }

        await Comment.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Comentario eliminado' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar comentario', error: error.message });
    }
};
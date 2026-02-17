'use strict';

import Comment from './comment.model.js';

// Agregar un comentario
export const addComment = async (req, res) => {
    try {
        const comment = new Comment(req.body);
        await comment.save();

        res.status(201).json({
            success: true,
            message: 'Comentario agregado',
            comment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al agregar comentario',
            error: error.message
        });
    }
};

// Actualizar comentario
export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedComment = await Comment.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Comentario actualizado',
            updatedComment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar comentario',
            error: error.message
        });
    }
};

// Eliminar comentario
export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        await Comment.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Comentario eliminado'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar comentario',
            error: error.message
        });
    }
};

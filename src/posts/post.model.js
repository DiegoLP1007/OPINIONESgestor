'use strict';

import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'El título es obligatorio'],
        trim: true,
        maxLength: [150, 'El título no puede exceder 150 caracteres']
    },
    category: {
        type: String,
        required: [true, 'La categoría es obligatoria'],
        trim: true
    },
    content: {
        type: String,
        required: [true, 'El contenido de la publicación es obligatorio'],
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model('Post', postSchema);
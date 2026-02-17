'use strict';

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
    },
    username: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio'],
        unique: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Correo no válido'],
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minLength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    },
    profilePicture: {
        type: String
    },
    status: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
    versionKey: false
});

// Ocultar contraseña en las respuestas JSON
userSchema.methods.toJSON = function () {
    const { password, __v, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
};

export default mongoose.model('User', userSchema);
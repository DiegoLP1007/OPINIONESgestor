'use strict';

import User from './usuario.model.js';
import bcryptjs from 'bcryptjs';

// Registro de usuario 
export const registrar = async (req, res) => {
    try {
        const data = req.body;
        const salt = bcryptjs.genSaltSync();
        data.password = bcryptjs.hashSync(data.password, salt);

        const user = new User(data);
        await user.save();

        res.status(201).json({ success: true, message: 'Usuario registrado correctamente', user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al registrar usuario', error: error.message });
    }
};

// Login dual 
export const login = async (req, res) => {
    const { loginIdentifier, password } = req.body;
    try {
        const user = await User.findOne({
            $or: [{ email: loginIdentifier }, { username: loginIdentifier }]
        });

        if (!user || !user.status) {
            return res.status(400).json({ success: false, message: 'Credenciales inválidas' });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ success: false, message: 'Contraseña incorrecta' });
        }

        res.status(200).json({ success: true, message: 'Login exitoso', user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error en el servidor', error: error.message });
    }
};

// Actualizar perfil 
export const updatePerfil = async (req, res) => {
    try {
        const { id } = req.params; 
        const { oldPassword, newPassword, ...data } = req.body;

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });

        if (newPassword) {
            if (!oldPassword) {
                return res.status(400).json({ success: false, message: 'Debe ingresar la contraseña anterior' });
            }
            const validPassword = bcryptjs.compareSync(oldPassword, user.password);
            if (!validPassword) {
                return res.status(400).json({ success: false, message: 'La contraseña anterior es incorrecta' });
            }
            const salt = bcryptjs.genSaltSync();
            data.password = bcryptjs.hashSync(newPassword, salt);
        }

        const userUpdated = await User.findByIdAndUpdate(id, data, { new: true });
        res.status(200).json({ success: true, message: 'Perfil actualizado', user: userUpdated });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar perfil', error: error.message });
    }
};
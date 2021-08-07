
const { Schema, model } = require('mongoose');

const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'Correo obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Contraseña obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROL',
        //enum: ['ADMIN_ROL', 'USER_ROL']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});

usuarioSchema.methods.toJSON = function() {

    const { __v, password, _id,...user } = this.toObject();

    user.uid = _id;

    return user;
}


module.exports = model( 'Usuario', usuarioSchema);

'use strict';
const mongoose = require('mongoose');

//definimos un esquema
const usuarioSchema = mongoose.Schema({
    username: String,
    nombre: String,
    parroquia: {type: String, index: true},
    password: String,
    email: String
})
// agenteSchema.createIndex()

//creamos el modelo, busca usuarios*
const Usuario = mongoose.model('Usuario', usuarioSchema);

//exportamos el modelo (opcional)
module.exports = Usuario;
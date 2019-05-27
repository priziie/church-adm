'use strict';
const mongoose = require('mongoose');

//definimos un esquema
const parroSchema = mongoose.Schema({
    nombre: String,
    direccion: String,
    parroco: {type: String, index: true},
    telefono: String,
    departamento: String,
    ciudad: String
})
// agenteSchema.createIndex()

const Informacion = mongoose.model('Informacion', parroSchema);

//exportamos el modelo (opcional)
module.exports = Informacion;
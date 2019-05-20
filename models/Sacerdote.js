'use strict';
const mongoose = require('mongoose');

//definimos un esquema
const sacerSchema = mongoose.Schema({
    nombre: String
})
// agenteSchema.createIndex()

const Sacerdote = mongoose.model('Sacerdote', sacerSchema);

//exportamos el modelo (opcional)
module.exports = Sacerdote;
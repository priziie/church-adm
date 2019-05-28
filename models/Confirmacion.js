'use strict';
const mongoose = require('mongoose');

//definimos un esquema
const schema = mongoose.Schema({
    asiento: Number,
    libro: Number,
    pagina: Number,
    fecha: Date,
    sacerdote: String,
    nombre: String,
    nacimiento: Date,
    madre: String,
    padre: String,
    bautismo: String,
    padrinos: [String]
})
// agenteSchema.createIndex()

const Confirmacion = mongoose.model('Confirmacione', schema);

//exportamos el modelo (opcional)
module.exports = Confirmacion;
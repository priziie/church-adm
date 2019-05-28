'use strict';
const mongoose = require('mongoose');

//definimos un esquema
const schema = mongoose.Schema({
    libro: Number,
    pagina: Number,
    fecha: Date,
    esposo:{
        nombre: String,
        edad: String,
        madre: String,
        padre: String,
        origen: String,
        testigo: String
    },
    esposa:{
        nombre: String,
        edad: String,
        madre: String,
        padre: String,
        origen: String,
        testigo: String
    }
})
// agenteSchema.createIndex()

const Matrimonio = mongoose.model('Matrimonio', schema);

//exportamos el modelo (opcional)
module.exports = Matrimonio;
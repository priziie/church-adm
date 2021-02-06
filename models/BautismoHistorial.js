'use strict';
const mongoose = require('mongoose');

//definimos un esquema
const schema = mongoose.Schema({
  idBautismo: mongoose.ObjectId,
  fecha: Date,
  motivo: String,
});
// agenteSchema.createIndex()

const BautismoHistorial = mongoose.model('BautismoHistorial', schema);

//exportamos el modelo (opcional)
module.exports = BautismoHistorial;

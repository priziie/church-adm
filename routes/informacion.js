const express = require("express");
const router = express.Router();

const Informacion = require("../models/Informacion");
const jwtAuthMiddleware = require("../lib/jwtAuthMiddleware");

router.use(jwtAuthMiddleware());

/**
 * GET  /informacion
 * Obtener la información general de la iglesia a que pertenece el usuario
 */
router.get("/", async (req, res, next) => {
  try {
    const id = req.parroquia;
    // console.log(id);
    // throw new Error('Error fatal');
    // const agente = await Agente.find({ _id: id}).exec();
    // en lugar de usar un callback, uso la promesa
    // con el await, es de que espera hasta que resuelva
    const agente = await Informacion.findById(id).exec();
    // const agente = await Informacion.find().exec();

    res.json({ success: true, result: agente });
  } catch (err) {
    next(err);
    return;
  }
});

/**
 * PUT /informacion
 * Actualiza un informacion
 */

router.put("/", async (req, res, next) => {
  try {
    const id = req.parroquia;
    const data = req.body;

    //el exec no es necesario
    //esa opcion de new, es para que devuelva el objeto
    //actualizado (no la versión anterior del objeto)
    const informacionAct = await Informacion.findOneAndUpdate(
      { _id: id },
      data,
      {
        new: true
      }
    ).exec();

    res.json({
      success: true,
      result: informacionAct
    });
  } catch (err) {
    next(err);
    return;
  }
});

module.exports = router;

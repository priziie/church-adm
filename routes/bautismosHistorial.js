const express = require('express');
const router = express.Router();

const BautismoHistorial = require('../models/BautismoHistorial');
const jwtAuthMiddleware = require('../lib/jwtAuthMiddleware');

router.use(jwtAuthMiddleware());

/**
 * GET /
 * Obtener una lista de bautismos con sus filtros
 */
router.get('/:idBautismo', (req, res, next) => {
  const filter = {
    idBautismo: req.params.idBautismo,
  };

  const query = BautismoHistorial.find(filter);

  query.exec((err, lista) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ success: true, result: lista });
  });
});

/**
 * POST
 * crea un log de registro de cuando se solicitó
 */
router.post('/', async (req, res, next) => {
  try {
    //req.body, se recuperan los datos
    const data = req.body;

    const bautismo = new BautismoHistorial(data);

    // el documentoQuery es una falsa promesa
    // funciona como una promesa
    await bautismo.save();

    res.json({
      success: true,
      result: bautismo,
    });
  } catch (err) {
    next(err);
    return;
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();

const Bautismo = require('../models/Bautismo');
const jwtAuthMiddleware = require('../lib/jwtAuthMiddleware');

router.use(jwtAuthMiddleware())

/**
 * GET /
 * Obtener una lista de bautismos con sus filtros
 */
router.get('/',
 (req, res, next) =>{
    console.log('hoa')
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const fields = req.query.fields;
    const sort = req.query.sort;

    const filter = {};
    const nombre = req.query.nombre;
    const madre = req.query.madre;
    const padre = req.query.padre;
    const minFecha = req.query.minFecha;
    const maxFecha = req.query.maxFecha;
    const eFecha = req.query.eFecha;

    const filter = {};

    if(nombre){
        filter.nombre = new RegExp('/^'+nombre, "i");
    }
    
    if(madre){
        filter.madre = new RegExp('/^'+madre, "i");
    }
    
    if(padre){
        filter.padre = new RegExp('/^'+padre, "i");
    }
    
    if(eFecha){
        filter.fecha = eFecha;
    }

    if(minFecha || maxFecha){
        const range = {};
        if(minFecha){
            range.$gt = minFecha;
        }
        if(maxFecha){
            range.$lt = maxFecha;
        }
        filter.fecha = range;
    }

    console.log('hoa2')
    const query = Bautismo.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.select(fields);
    query.sort(sort);

    query.exec((err, lista)=>{
        if(err){
            next(err);
            return;
        }
        res.json({ success: true, results: lista })
    })
})

/**
 * GET  /bautismos/:id
 * Obtener un bautismo por id
 */
router.get('/:id', async (req, res, next) =>{
    try{
        const id = req.params.id;

        const result = await Bautismo.findById( id ).exec();

        res.json({success: true, result: result})
    }
    catch(err){
        next(err);
        return;
    }
    
})

/**
 * POST
 * crea un bautismo en la base de datos
 */
router.post('/', async (req, res, next) =>{
    try{
        //req.body, se recuperan los datos del nuevo agente
        const data = req.body;

        const bautismo = new Agente(data);

        // el documentoQuery es una falsa promesa
        // funciona como una promesa
        await bautismo.save();

        res.json({
            success: true,
            result: bautismo
        })
    }
    catch(err){
        next(err);
        return;
    }
    
});

/**
 * PUT /bautismos/:id
 * Actualiza un bautismo
 */

 router.put('/:id', async (req, res, next) =>{
     try {
         const id = req.params.id;
         const data = req.body;

         //el exec no es necesario
         //esa opcion de new, es para que devuelva el objeto 
         //actualizado (no la versión anterior del objeto)
         const bautismoAct = await Bautismo.findOneAndUpdate(
             { _id: id }, 
             data,
             {
                 new: true
             }).exec();

         res.json({
             success: true,
             result: bautismoAct
         })

     } catch (err) {
         next(err);
         return;
     }
 })

module.exports = router;
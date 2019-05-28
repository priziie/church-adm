const express = require('express');
const router = express.Router();

const Matrimonio = require('../models/Matrimonio');
const jwtAuthMiddleware = require('../lib/jwtAuthMiddleware');

router.use(jwtAuthMiddleware())

/**
 * GET /
 * Obtener una lista de matrimonios con sus filtros
 */
router.get('/',
 (req, res, next) =>{
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const fields = req.query.fields;
    const sort = req.query.sort;


    const query = Matrimonio.find();
    query.limit(limit);
    query.skip(skip);
    query.select(fields);
    query.sort(sort);

    query.exec((err, lista)=>{
        if(err){
            next(err);
            return;
        }
        res.json({ success: true, result: lista })
    })
})

/**
 * GET  /matrimonios/:id
 * Obtener un matrimonio por id
 */
router.get('/:id', async (req, res, next) =>{
    try{
        const id = req.params.id;

        const result = await Matrimonio.findById( id ).exec();

        res.json({success: true, result: result})
    }
    catch(err){
        next(err);
        return;
    }
    
})

/**
 * POST
 * crea un matrimonio en la base de datos
 */
router.post('/', async (req, res, next) =>{
    try{
        //req.body, se recuperan los datos 
        const data = req.body;

        const matrimonio = new Matrimonio(data);

        // el documentoQuery es una falsa promesa
        // funciona como una promesa
        await matrimonio.save();

        res.json({
            success: true,
            result: matrimonio
        })
    }
    catch(err){
        next(err);
        return;
    }
    
});

/**
 * PUT /matrimonios/:id
 * Actualiza un matrimonio
 */

 router.put('/:id', async (req, res, next) =>{
     try {
         const id = req.params.id;
         const data = req.body;

         //el exec no es necesario
         //esa opcion de new, es para que devuelva el objeto 
         //actualizado (no la versión anterior del objeto)
         const matrimonioAct = await Matrimonio.findOneAndUpdate(
             { _id: id }, 
             data,
             {
                 new: true
             }).exec();

         res.json({
             success: true,
             result: matrimonioAct
         })

     } catch (err) {
         next(err);
         return;
     }
 })

module.exports = router;
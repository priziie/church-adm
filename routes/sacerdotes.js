const express = require('express');
const router = express.Router();

const Sacerdote = require('../models/Sacerdote');
const jwtAuthMiddleware = require('../lib/jwtAuthMiddleware');

router.use(jwtAuthMiddleware())


/**
 * GET  /
 * Obtener la información de los sacerdotes registrados
 */
router.get('/', async (req, res, next) =>{
    try{
        const result = await Sacerdote.find().exec();

        res.json({success: true, result: result})
    }
    catch(err){
        next(err);
        return;
    }
    
});

/**
 * POST /
 */
router.post('/', async (req, res, next) =>{
    try{
        const data = req.body;
        const sac = new Sacerdote(data);
        const result = await sac.save();

        res.json({success: true, result: result})
    }
    catch(err){
        next(err);
        return;
    }
    
});
/**
 * PUT /
 */
router.put('/:id', async (req, res, next) =>{
    try {
        const id = req.params.id;
        const data = req.body;

        //el exec no es necesario
        //esa opcion de new, es para que devuelva el objeto 
        //actualizado (no la versión anterior del objeto)
        const result = await Sacerdote.findOneAndUpdate(
            { _id: id }, 
            data,
            {
                new: true
            }).exec();

        res.json({
            success: true,
            result: result
        })

    } catch (err) {
        next(err);
        return;
    }
})


module.exports = router;
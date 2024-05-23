const express = require('express');
const router = express.Router();
const Tarjeta = require('../models/tarjeta.model')

const getTarjeta = async(req,res,next)=>{
    let tarjeta;
    const { id }= req.params;     
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(404).json({message:'La tarjeta no es valida'})
    }

        try {
            tarjeta = await Tarjeta.findById(id);
            if(!tarjeta){
                return res.status(404).json({message:'No se encontro la tarjeta'})
    
            }
        } catch (error){
            return res.status(500).json({message:error.message})
        }
       
    res.tarjeta = tarjeta;
    next();
}
router.get('/',async(req,res)=>{
    try{
        const tarjetas = await Tarjeta.find();
        //res.json(books);chatgpt
        if(tarjetas.length ===0){
            return res.status(204).json([]);
        }
        res.json(tarjetas);         
        
        
    }catch(error){
        res.status(500).json({message:error.message})
    }
})
//crear una nueva membresia(recurso)
router.post('/',async(req,res)=>{
    const{tarId,tarIdMiembro,tarNombre,tarFvence,tarCodigo} = req.body;
    if(!tarId || !tarIdMiembro || !tarNombre || !tarFvence || !tarCodigo){
        return res.status(400).json({message:'Faltan datos los campos son obligatorios'})
    }
    const tarjeta = new Tarjeta(
        {
            tarId,
            tarIdMiembro,
            tarNombre,
            tarFvence,
            tarCodigo

        }
    )
    try{
        const newTarjeta = await tarjeta.save()
        res.status(201).json(newTarjeta)
    }catch(error){
        res.status(400).json({message:error.message})
    }
})

router.get('/:id',getTarjeta, async(req,res)=>{
    res.json(res.tarjeta)
})

router.put('/:id',getTarjeta, async(req,res)=>{
    try{
        const tarjeta = res.tarjeta;
        tarjeta.tarId = req.body.tarId || tarjeta.tarId
        tarjeta.tarIdMiembro = req.body.tarIdMiembro || tarjeta.tarIdMiembro
        tarjeta.tarNombre = req.body.tarNombre || tarjeta.tarNombre
        tarjeta.tarFvence = req.body.tarFvence || tarjeta.tarFvence
        tarjeta.tarCodigo = req.body.tarCodigo || tarjeta.tarCodigo           
        
        const updateTarjeta = await tarjeta.save()
        res.json(updateTarjeta)

    }catch(error){
        res.status(400).json({message:error.message})
    }
    
})

router.patch('/:id',getTarjeta, async(req,res)=>{
    if(!req.body.tarId && !req.body.tarIdMiembro && !req.body.tarNombre && !req.body.tarFvence && !req.body.tarCodigo){
        return res.status(400).json({message:'Al menos uno de estos campos deben ser enviados'})
    }
    try{
        const tarjeta = res.tarjeta;
        tarjeta.tarId = req.body.tarId || tarjeta.tarId
        tarjeta.tarIdMiembro = req.body.tarIdMiembro || tarjeta.tarIdMiembro
        tarjeta.tarNombre = req.body.tarNombre || tarjeta.tarNombre
        tarjeta.tarFvence = req.body.tarFvence || tarjeta.tarFvence
        tarjeta.tarCodigo = req.body.tarCodigo || tarjeta.tarCodigo 
        const updateTarjeta = await tarjeta.save()
        res.json(updateTarjeta)

    }catch(error){
        res.status(400).json({message:error.message})
    }
    
})

router.delete('/:id',getTarjeta, async(req,res)=>{
   try{
    const tarjeta = res.tarjeta;
    await membresia.deleteOne({
        id:tarjeta.id
        /*_id:estado._id*/
    });
    res.json({message:`La tarjeta ${tarjeta.tarNombre} ha sido eliminado`})

   }catch(error){
     res.status(500).json({message:error.message})
   }
})
module.exports = router
const express = require('express');
const router = express.Router();
const Clase = require('../models/clase.model')

const getClase = async(req,res,next)=>{
    let clase;
    const { id }= req.params;     
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(404).json({message:'El id de la clase no es valido'})
    }

        try {
            clase = await Clase.findById(id);
            if(!clase){
                return res.status(404).json({message:'No se encontro la clase'})
    
            }
        } catch (error){
            return res.status(500).json({message:error.message})
        }
       
    res.clase =clase;
    next();
}
router.get('/',async(req,res)=>{
    try{
        const clases = await Clase.find();
        //res.json(books);chatgpt
        if(clases.length ===0){
            return res.status(204).json([]);
        }
        res.json(clases);         
        
        
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

//crear un nuevo usuario(recurso)
router.post('/',async(req,res)=>{
    const{clId,clNombre,clDescribe} = req.body;
    if(!clId||!clNombre||!clDescribe){
        return res.status(400).json({message:'Faltan datos los campos son obligatorios '})
    }
    const clase = new Clase(
        {
           clId,
           clNombre,
           clDescribe
                     
        }
    )
    try{
        const newClase = await clase.save()
        res.status(201).json(newClase)
    }catch(error){
        res.status(400).json({message:error.message})
    }
})

router.get('/:id',getClase, async(req,res)=>{
    res.json(res.clase)
})

router.put('/:id',getClase, async(req,res)=>{
    try{
        const clase = res.clase;

        clase.clId = req.body.clId || clase.esId
        clase.clNombre = req.body.clNombre || clase.clNombre
        clase.clDescribe = req.body.clDescribe || clase.clDescribe            
        
        const updateClase = await clase.save()
        res.json(updateClase)

    }catch(error){
        res.status(400).json({message:error.message})
    }
    
})

router.patch('/:id',getClase, async(req,res)=>{
    if(!req.body.clId &&!req.body.clNombre &&!req.body.clDescribe){
        return res.status(400).json({message:'Al menos uno de estos campos deben ser enviados'})
    }
    try{
        const clase = res.clase;
        clase.clId = req.body.clId || clase.esId
        clase.clNombre = req.body.clNombre || clase.clNombre
        clase.clDescribe = req.body.clDescribe || clase.clDescribe 
                   
        const updateClase = await clase.save()
        res.json(updateClase)

    }catch(error){
        res.status(400).json({message:error.message})
    }
    
})

router.delete('/:id',getClase, async(req,res)=>{
   try{
    const clase = res.clase;
    await clase.deleteOne({
        id:clase.id
        /*_id:estado._id*/
    });
    res.json({message:`La clase ${clase.clNombre} ha sido eliminado`})

   }catch(error){
     res.status(500).json({message:error.message})
   }
})
module.exports = router
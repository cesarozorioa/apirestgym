const express = require('express');
const router = express.Router();
const Entrenador = require('../models/entrenador.model')

const getEntrenador = async(req,res,next)=>{
    let entrenador;
    const { id }= req.params;     
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(404).json({message:'El id del entrenador no es valido'})
    }

        try {
            entrenador = await Entrenador.findById(id);
            if(!entrenador){
                return res.status(404).json({message:'No se encontro el entrenador'})
    
            }
        } catch (error){
            return res.status(500).json({message:error.message})
        }
       
    res.entrenador =entrenador;
    next();
}
router.get('/',async(req,res)=>{
    try{
        const entrenadores = await Entrenador.find();
        //res.json(books);chatgpt
        if(entrenadores.length ===0){
            return res.status(204).json([]);
        }
        res.json(entrenadores);         
        
        
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

//crear un nuevo entrenador(recurso)
router.post('/',async(req,res)=>{
    const{entId,entIdUsuario,entCaracteristicas,entDisponible,entSueldo} = req.body;
    if(!entId ||!entIdUsuario||!entCaracteristicas ||!entDisponible ||!entSueldo){
        return res.status(400).json({message:'Faltan datos los campos son obligatorios '})
    }
    const entrenador = new Entrenador(
        {
            entId,
            entIdUsuario,
            entCaracteristicas,
            entDisponible,
            entSueldo,
                     
        }
    )
    try{
        const newEntrenador = await entrenador.save()
        res.status(201).json(newEntrenador)
    }catch(error){
        res.status(400).json({message:error.message})
    }
})

router.get('/:id',getEntrenador, async(req,res)=>{
    res.json(res.entrenador)
})

router.put('/:id',getEntrenador, async(req,res)=>{
    try{
        const entrenador = res.entrenador;
            entrenador.entId = req.body.entId || entrenador.entId
            entrenador.entIdUsuario = req.body.entIdUsuario || entrenador.entIdUsuario
            entrenador.entCaracteristicas = req.body.entCaracteristicas || entrenador.entCaracteristicas
            entrenador.entDisponible = req.body.entDisponible || entrenador.entDisponible
            entrenador.entSueldo = req.body.entSueldo || entrenador.entSueldo                
        
        const updateEntrenador = await entrenador.save()
        res.json(updateEntrenador)

    }catch(error){
        res.status(400).json({message:error.message})
    }
    
})

router.patch('/:id',getEntrenador, async(req,res)=>{
    if(!req.body.entId && !req.body.entIdUsuario && !req.body.entDisponible && !req.body.entCaracteristicas && !req.body.entSueldo){
        return res.status(400).json({message:'Al menos uno de estos campos deben ser enviados'})
    }
    try{
        const entrenador = res.entrenador;
        entrenador.entId = req.body.entId || entrenador.entId
        entrenador.entIdUsuario = req.body.entIdUsuario || entrenador.entIdUsuario
        entrenador.entCaracteristicas = req.body.entCaracteristicas || entrenador.entCaracteristicas
        entrenador.entDisponible = req.body.entDisponible || entrenador.entDisponible
        entrenador.entSueldo = req.body.entSueldo || entrenador.entSueldo           
        const updateEntrenador = await entrenador.save()
        res.json(updateEntrenador)

    }catch(error){
        res.status(400).json({message:error.message})
    }
    
})

router.delete('/:id',getEntrenador, async(req,res)=>{
   try{
    const entrenador = res.entrenador;
    await entrenador.deleteOne({
        id:entrenador.id
        /*_id:estado._id*/
    });
    res.json({message:`El entrenador ${entrenador.entIdUsuario} ha sido eliminado`})

   }catch(error){
     res.status(500).json({message:error.message})
   }
})
module.exports = router
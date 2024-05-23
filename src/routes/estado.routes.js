const express = require('express');
const router = express.Router();
const Estado = require('../models/estado.model')

const getEstado = async(req,res,next)=>{
    let estado;
    const { id }= req.params;     
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(404).json({message:'El id del estado no es valido'})
    }

        try {
            estado = await Estado.findById(id);
            if(!estado){
                return res.status(404).json({message:'No se encontro el estado'})
    
            }
        } catch (error){
            return res.status(500).json({message:error.message})
        }
       
    res.estado =estado;
    next();
}
router.get('/',async(req,res)=>{
    try{
        const estados = await Estado.find();
        //res.json(books);chatgpt
        if(estados.length ===0){
            return res.status(204).json([]);
        }
        res.json(estados);         
        
        
    }catch(error){
        res.status(500).json({message:error.message})
    }
})
//crear un nuevo usuario(recurso)
router.post('/',async(req,res)=>{
    const{esId,esNombre} = req.body;
    if(!esNombre || !esId ){
        return res.status(400).json({message:'Faltan datos los campos son obligatorios '})
    }
    const estado = new Estado(
        {
            esId,
            esNombre
                     
        }
    )
    try{
        const newEstado = await estado.save()
        res.status(201).json(newEstado)
    }catch(error){
        res.status(400).json({message:error.message})
    }
})

router.get('/:id',getEstado, async(req,res)=>{
    res.json(res.estado)
})

router.put('/:id',getEstado, async(req,res)=>{
    try{
        const estado = res.estado;
        estado.esId = req.body.esId || estado.esId
        estado.esNombre = req.body.esNombre || estado.esNombre       
        
        const updateEstado = await estado.save()
        res.json(updateEstado)

    }catch(error){
        res.status(400).json({message:error.message})
    }
    
})

router.patch('/:id',getEstado, async(req,res)=>{
    if(!req.body.esNombre){
        return res.status(400).json({message:'Al menos uno de estos campos deben ser enviados'})
    }
    try{
        const estado = res.estado;
        estado.esId = req.body.esId || estado.esId
        estado.esNombre = req.body.esNombre || estado.esNombre             
        const updateEstado = await estado.save()
        res.json(updateEstado)

    }catch(error){
        res.status(400).json({message:error.message})
    }
    
})

router.delete('/:id',getEstado, async(req,res)=>{
   try{
    const estado = res.estado;
    await estado.deleteOne({
        id:estado.id
        /*_id:estado._id*/
    });
    res.json({message:`El estado ${estado.esNombre} ha sido eliminado`})

   }catch(error){
     res.status(500).json({message:error.message})
   }
})
module.exports = router
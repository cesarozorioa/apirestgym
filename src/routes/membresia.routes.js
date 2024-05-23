const express = require('express');
const router = express.Router();
const Membresia = require('../models/membresia.model')

const getMembresia = async(req,res,next)=>{
    let membresia;
    const { id }= req.params;     
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(404).json({message:'La membresia no es valida'})
    }

        try {
            membresia = await Membresia.findById(id);
            if(!membresia){
                return res.status(404).json({message:'No se encontro la membresia'})
    
            }
        } catch (error){
            return res.status(500).json({message:error.message})
        }
       
    res.membresia = membresia;
    next();
}
router.get('/',async(req,res)=>{
    try{
        const membresias = await Membresia.find();
        //res.json(books);chatgpt
        if(membresias.length ===0){
            return res.status(204).json([]);
        }
        res.json(membresias);         
        
        
    }catch(error){
        res.status(500).json({message:error.message})
    }
})
//crear una nueva membresia(recurso)
router.post('/',async(req,res)=>{
    const{msIdMembresia,msIdTmembresia,msFechaIni,msFechaFin,msEstado} = req.body;
    if(!msIdMembresia||!msIdTmembresia,!msFechaIni||!msFechaFin||!msEstado){
        return res.status(400).json({message:'Faltan datos los campos son obligatorios'})
    }
    const membresia = new Membresia(
        {
            msIdMembresia,
            msIdTmembresia,
            msFechaIni,
            msFechaFin,
            msEstado,
        }
    )
    try{
        const newMembresia = await membresia.save()
        res.status(201).json(newMembresia)
    }catch(error){
        res.status(400).json({message:error.message})
    }
})

router.get('/:id',getMembresia, async(req,res)=>{
    res.json(res.membresia)
})

router.put('/:id',getMembresia, async(req,res)=>{
    try{
        const membresia = res.membresia;
        membresia.msIdMembresia = req.body.msIdMembresia || membresia.msIdMembresia
        membresia.msIdTmembresia = req.body.msIdTmembresia || membresia.msIdTmembresia
        membresia.msFechaIni = req.body.msFechaIni || membresia.msFechaIni
        membresia.msFechaFin = req.body.msFechaFin || membresia.msFechaFin
        membresia.msEstado = req.body.msEstado || membresia.msEstado         
        
        const updateMembresia = await membresia.save()
        res.json(updateMembresia)

    }catch(error){
        res.status(400).json({message:error.message})
    }
    
})

router.patch('/:id',getMembresia, async(req,res)=>{
    if(!req.body.msIdUsuario && !req.body.msIdTmembresia && !req.body.msFechaIni && !req.body.msFechaFin && !req.body.msEstado){
        return res.status(400).json({message:'Al menos uno de estos campos deben ser enviados'})
    }
    try{
        const membresia = res.membresia;
        membresia.msIdMembresia = req.body.msIdMembresia || membresia.msIdMembresia
        membresia.msIdTmembresia = req.body.msIdTmembresia || membresia.msIdTmembresia
        membresia.msFechaIni = req.body.msFechaIni || membresia.msFechaIni
        membresia.msFechaFin = req.body.msFechaFin || membresia.msFechaFin
        membresia.msEstado = req.body.msEstado || membresia.msEstado  
        const updateMembresia = await membresia.save()
        res.json(updateMembresia)

    }catch(error){
        res.status(400).json({message:error.message})
    }
    
})

router.delete('/:id',getMembresia, async(req,res)=>{
   try{
    const membresia = res.membresia;
    await membresia.deleteOne({
        id:membresia.id
        /*_id:estado._id*/
    });
    res.json({message:`El usuario ${membresia.msIdUsuario} de la membresia ha sido eliminado`})

   }catch(error){
     res.status(500).json({message:error.message})
   }
})
module.exports = router
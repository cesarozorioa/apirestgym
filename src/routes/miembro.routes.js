const express = require('express');
const router = express.Router();
const Miembro = require('../models/miembro.model')

const getMiembro = async(req,res,next)=>{
    let miembro;
    const { id }= req.params;     
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(404).json({message:'El id del miembro no es valido'})
    }

        try {
            miembro = await Miembro.findById(id);
            if(!miembro){
                return res.status(404).json({message:'No se encontro el miembro'})
    
            }
        } catch (error){
            return res.status(500).json({message:error.message})
        }
       
    res.miembro = miembro;
    next();
}
router.get('/',async(req,res)=>{
    try{
        const miembros = await Miembro.find();
        //res.json(books);chatgpt
        if(miembros.length ===0){
            return res.status(204).json([]);
        }
        res.json(miembros);         
        
        
    }catch(error){
        res.status(500).json({message:error.message})
    }
})
//crear un nuevo miembro(recurso)
router.post('/',async(req,res)=>{
    const{mbId,mbUsuario,mbEstado,mbFecha,mbTarjeta} = req.body;
    if(!mbId || !mbUsuario || !mbEstado || !mbFecha ){
        return res.status(400).json({message:'Faltan datos los campos son obligatorios der'})
    }
    const miembro = new Miembro(
        {
            mbId,
            mbUsuario,
            mbEstado,
            mbFecha,
                                
        }
    )
    try{
        const newMiembro = await miembro.save()
        res.status(201).json(newMiembro)
    }catch(error){
        res.status(400).json({message:error.message})
    }
})

router.get('/:id',getMiembro, async(req,res)=>{
    res.json(res.miembro)
})

router.put('/:id',getMiembro, async(req,res)=>{
    try{
        const miembro = res.miembro;
        miembro.id = req.body.mbId || miembro.mbId
        miembro.usuario = req.body.mbUsuario || miembro.mbUsuario
        miembro.estado = req.body.mbEstado || miembro.mbEstado
        miembro.fecha = req.body.mbFecha || miembro.mbFecha
             
        
        const updateMiembro = await miembro.save()
        res.json(updateMiembro)

    }catch(error){
        res.status(400).json({message:error.message})
    }
    
})

router.patch('/:id',getMiembro, async(req,res)=>{
    if(!req.body.mbId && !req.body.mbUsuario && !req.body.mbEstado && !req.body.mbFecha){
        return res.status(400).json({message:'Al menos uno de estos campos deben ser enviados'})
    }
    try{
        const miembro = res.miembro;
        miembro.id = req.body.mbId || miembro.mbId
        miembro.usuario = req.body.mbUsuario || miembro.mbUsuario
        miembro.estado = req.body.mbEstado || miembro.mbEstado
        miembro.fecha = req.body.mbFecha || miembro.mbFecha
         
        const updateMiembro = await miembro.save()
        res.json(updateMiembro)

    }catch(error){
        res.status(400).json({message:error.message})
    }
    
})

router.delete('/:id',getMiembro, async(req,res)=>{
   try{
    const miembro = res.miembro;
    await miembro.deleteOne({
        id:miembro.id
        /*_id:estado._id*/
    });
    res.json({message:`El estado ${miembro.usuario} ha sido eliminado`})

   }catch(error){
     res.status(500).json({message:error.message})
   }
})
module.exports = router
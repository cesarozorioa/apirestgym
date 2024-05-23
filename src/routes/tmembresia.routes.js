const express = require('express');
const router = express.Router();
const Tmembresia = require('../models/tmembresia.model')

const getTmembresia = async(req,res,next)=>{
    let tmembresia;
    const { id }= req.params;     
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(404).json({message:'El tipo de membresia no es valido'})
    }
        try {
            tmembresia = await Tmembresia.findById(id);
            if(!tmembresia){
                return res.status(404).json({message:'No se encontro la membresia'})
    
            }
        } catch (error){
            return res.status(500).json({message:error.message})
        }
       
    res.tmembresia =tmembresia;
    next();
}
router.get('/',async(req,res)=>{
    try{
        const tmembresias = await Tmembresia.find();
        //res.json(books);chatgpt
        if(tmembresias.length ===0){
            return res.status(204).json([]);
        }
        res.json(tmembresias);         
        
        
    }catch(error){
        res.status(500).json({message:error.message})
    }
})
//crear una nueva membresia(recurso)
router.post('/',async(req,res)=>{
    const{tmId,tmNombre,tmValor} = req.body;
    if(!tmId || !tmNombre || !tmValor){
        return res.status(400).json({message:'Faltan datos los campos son obligatorios'})
    }
    const tmembresia = new Tmembresia(
        {
            tmId,
            tmNombre,
            tmValor
                       
        }
    )
    try{
        const newTmembresia = await tmembresia.save()
        res.status(201).json(newTmembresia)
    }catch(error){
        res.status(400).json({message:error.message})
    }
})

router.get('/:id',getTmembresia, async(req,res)=>{
    res.json(res.tmembresia)
})

router.put('/:id',getTmembresia, async(req,res)=>{
    try{
        const tmembresia = res.tmembresia;
        tmembresia.tmId = req.body.tmId || tmembresia.tmId
        tmembresia.tmNombre = req.body.tmNombre || tmembresia.tmNombre
        tmembresia.tmValor = req.body.tmValor || tmembresia.tmValor        
        
        const updateTmembresia = await tmembresia.save()
        res.json(updateTmembresia)

    }catch(error){
        res.status(400).json({message:error.message})
    }
    
})

router.patch('/:id',getTmembresia, async(req,res)=>{
    if(!req.body.tmId && !req.body.tmNombre && !req.body.tmValor){
        return res.status(400).json({message:'Al menos uno de estos campos deben ser enviados'})
    }
    try{
        const tmembresia = res.tmembresia;
        tmembresia.tmId = req.body.tmId || tmembresia.tmId
        tmembresia.tmNombre = req.body.tmNombre || tmembresia.tmNombre
        tmembresia.tmValor = req.body.tmValor || tmembresia.tmValor 
                     
        const updateTmembresia = await rol.save()
        res.json(updateTmembresia)

    }catch(error){
        res.status(400).json({message:error.message})
    }
    
})

router.delete('/:id',getTmembresia, async(req,res)=>{
   try{
    const tmembresia = res.tmembresia;
    await rol.deleteOne({
        /*_id:rol._id*/
        id:tmembresia.id
    });
    res.json({message:`El rol ${tmembresia.tmNombre} ha sido eliminado`})

   }catch(error){
     res.status(500).json({message:error.message})
   }
})
module.exports = router
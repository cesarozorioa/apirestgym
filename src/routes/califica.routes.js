const express = require('express');
const router = express.Router();
const Califica = require('../models/califica.model')

const getCalifiica = async(req,res,next)=>{
    let califica;
    const { id }= req.params;     
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(404).json({message:'El id de la calificacion no es valido'})
    }

        try {
            califica = await Califica.findById(id);
            if(!califica){
                return res.status(404).json({message:'No se encontro le feedback'})
    
            }
        } catch (error){
            return res.status(500).json({message:error.message})
        }
       
    res.califica =califica;
    next();
}
router.get('/',async(req,res)=>{
    try{
        const calificaciones = await Califica.find();
        //res.json(books);chatgpt
        if(calificaciones.length ===0){
            return res.status(204).json([]);
        }
        res.json(calificaciones);         
        
        
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

//crear un nuevo feedback(recurso)
router.post('/',async(req,res)=>{
    const{calId,calIdEntrenador,calIdMiembro,calNota,calDescribe} = req.body;
    if(!calId ||!calIdEntrenador||!calIdMiembro||!calNota||!calDescribe ){
        return res.status(400).json({message:'Faltan datos los campos son obligatorios '})
    }
    const califica = new Califica(
        {
            calId,
            calIdEntrenador,
            calIdMiembro,
            calNota,
            calDescribe                   
        }
    )
    try{
        const newCalifica = await califica.save()
        res.status(201).json(newCalifica)
    }catch(error){
        res.status(400).json({message:error.message})
    }
})

router.get('/:id',getCalifiica, async(req,res)=>{
    res.json(res.califica)
})

router.put('/:id',getCalifiica, async(req,res)=>{
    try{
        const califica = res.califica;
        califica.calId = req.body.calId || califica.calId
        califica.calIdEntrenador = req.body.calIdEntrenador || califica.calIdEntrenador
        califica.calIdMiembro = req.body.calIdMiembro || califica.calIdMiembro
        califica.calNota = req.body.calNota || califica.calNota
        califica.calDescribe = req.body.calDescribe || califica.calDescribe         
        
        const updateCalifica = await califica.save()
        res.json(updateCalifica)

    }catch(error){
        res.status(400).json({message:error.message})
    }
    
})

router.patch('/:id',getCalifiica, async(req,res)=>{
    if(!req.body.calId &&!req.body.calIdEntrenador &&!req.body.calIdMiembro &&!req.body.calNota && !req.body.calDescribe){
        return res.status(400).json({message:'Al menos uno de estos campos deben ser enviados'})
    }
    try{
        const califica = res.califica;
        califica.calId = req.body.calId || califica.calId
        califica.calIdEntrenador = req.body.calIdEntrenador || califica.calIdEntrenador
        califica.calIdMiembro = req.body.calIdMiembro || califica.calIdMiembro
        califica.calNota = req.body.calNota || califica.calNota
        califica.calDescribe = req.body.calDescribe || califica.calDescribe                 
        const updateCalifica = await califica.save()
        res.json(updateCalifica)

    }catch(error){
        res.status(400).json({message:error.message})
    }
    
})

router.delete('/:id',getCalifiica, async(req,res)=>{
   try{
    const califica = res.califica;
    await califica.deleteOne({
        id:califica.id
        /*_id:estado._id*/
    });
    res.json({message:`El feedback ${califica.calId} ha sido eliminado`})

   }catch(error){
     res.status(500).json({message:error.message})
   }
})
module.exports = router
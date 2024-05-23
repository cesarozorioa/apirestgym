const express = require('express');
const router = express.Router();
const Horario = require('../models/horario.model')

const getHorario = async(req,res,next)=>{
    let horario;
    const { id }= req.params;     
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(404).json({message:'El id del horario no es valido'})
    }

        try {
            horario = await Horario.findById(id);
            if(!horario){
                return res.status(404).json({message:'No se encontro el horario'})
    
            }
        } catch (error){
            return res.status(500).json({message:error.message})
        }
       
    res.horario =horario;
    next();
}
router.get('/',async(req,res)=>{
    try{
        const horarios = await Horario.find();
        //res.json(books);chatgpt
        if(horarios.length ===0){
            return res.status(204).json([]);
        }
        res.json(horarios);         
        
        
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

//crear un nuevo usuario(recurso)
router.post('/',async(req,res)=>{
    const{hoId,hoDia,hoInicio,hoFin} = req.body;
    if(!hoId||!hoDia||!hoInicio||!hoFin){
        return res.status(400).json({message:'Faltan datos los campos son obligatorios '})
    }
    const horario = new Horario(
        {
           hoId,
           hoDia,
           hoInicio,
           hoFin          
                     
        }
    )
    try{
        const newHorario = await horario.save()
        res.status(201).json(newHorario)
    }catch(error){
        res.status(400).json({message:error.message})
    }
})

router.get('/:id',getHorario, async(req,res)=>{
    res.json(res.horario)
})

router.put('/:id',getHorario, async(req,res)=>{
    try{
        const horario = res.horario;
        horario.hoId = req.body.hoId || horario.hoId
        horario.hoDia = req.body.hoDia || horario.hoDia
        horario.hoIncio = req.body.hoIncio || horario.hoIncio
        horario.hoFin = req.body.hoFin || horario.hoFin                
        
        const updateHorario = await horario.save()
        res.json(updateHorario)

    }catch(error){
        res.status(400).json({message:error.message})
    }
    
})

router.patch('/:id',getHorario, async(req,res)=>{
    if(!req.body.hoId &&!req.body.hoDia &&!req.body.hoIncio &&!req.body.hoFin){
        return res.status(400).json({message:'Al menos uno de estos campos deben ser enviados'})
    }
    try{
        const horario = res.horario;

        horario.hoId = req.body.hoId || horario.hoId
        horario.hoDia = req.body.hoDia || horario.hoDia
        horario.hoIncio = req.body.hoIncio || horario.hoIncio
        horario.hoFin = req.body.hoFin || horario.hoFin 
                   
        const updateHorario = await horario.save()
        res.json(updateHorario)

    }catch(error){
        res.status(400).json({message:error.message})
    }
    
})

router.delete('/:id',getHorario, async(req,res)=>{
   try{
    const horario = res.horario;
    await horario.deleteOne({
        id:horario.id
        /*_id:estado._id*/
    });
    res.json({message:`El Horario ${horario.hoId} ha sido eliminado`})

   }catch(error){
     res.status(500).json({message:error.message})
   }
})
module.exports = router
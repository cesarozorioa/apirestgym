const express = require('express');
const router = express.Router();
const Reserva = require('../models/reserva.model')

const getReserva = async(req,res,next)=>{
    let reserva;
    const { id }= req.params;     
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(404).json({message:'El id de la reserva no es valido'})
    }

        try {
            reserva = await Reserva.findById(id);
            if(!reserva){
                return res.status(404).json({message:'No se encontro la reserva'})
    
            }
        } catch (error){
            return res.status(500).json({message:error.message})
        }
       
    res.reserva =reserva;
    next();
}
router.get('/',async(req,res)=>{
    try{
        const reservas = await Reserva.find();
        //res.json(books);chatgpt
        if(reservas.length ===0){
            return res.status(204).json([]);
        }
        res.json(reservas);         
        
        
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

//crear un nuevo usuario(recurso)
router.post('/',async(req,res)=>{
    const{reId,reIdMiembro,reIdClase,reIdHorario,reFecha} = req.body;
    if(!reId||!reIdMiembro||!reIdClase||!reIdHorario||!reFecha){
        return res.status(400).json({message:'Faltan datos los campos son obligatorios '})
    }
    const reserva = new Reserva(
        {
           reId,
           reIdMiembro,
           reIdClase,
           reIdHorario,
           reFecha          
                     
        }
    )
    try{
        const newReserva = await reserva.save()
        res.status(201).json(newReserva)
    }catch(error){
        res.status(400).json({message:error.message})
    }
})

router.get('/:id',getReserva, async(req,res)=>{
    res.json(res.reserva)
})

router.put('/:id',getReserva, async(req,res)=>{
    try{
        const reserva = res.reserva;
        reserva.reId = req.body.reId ||reserva.reId
        reserva.reIdMiembro = req.body.reIdMiembro ||reserva.reIdMiembro
        reserva.reIdClase = req.body.reIdClase ||reserva.reIdClase
        reserva.reIdHorario = req.body.reIdHorario ||reserva.reIdHorario
        reserva.reFecha = req.body.reFecha ||reserva.reFecha                
       
        const updateReserva = await reserva.save()
        res.json(updateReserva)

    }catch(error){
        res.status(400).json({message:error.message})
    }
    
})

router.patch('/:id',getReserva, async(req,res)=>{
    if(!req.body.reId &&!req.body.reIdMiembro &&!req.body.reIdClase &&!req.body.reIdHorario &&!req.body.reFecha){
        return res.status(400).json({message:'Al menos uno de estos campos deben ser enviados'})
    }
    try{
        const reserva = res.reserva;

        reserva.reId = req.body.reId ||reserva.reId
        reserva.reIdMiembro = req.body.reIdMiembro ||reserva.reIdMiembro
        reserva.reIdClase = req.body.reIdClase ||reserva.reIdClase
        reserva.reIdHorario = req.body.reIdHorario ||reserva.reIdHorario
        reserva.reFecha = req.body.reFecha ||reserva.reFecha
                   
        const updateReserva = await reserva.save()
        res.json(updateReserva)

    }catch(error){
        res.status(400).json({message:error.message})
    }
    
})

router.delete('/:id',getReserva, async(req,res)=>{
   try{
    const reserva = res.reserva;
    await reserva.deleteOne({
        id:reserva.id
        /*_id:estado._id*/
    });
    res.json({message:`La reserva ${reserva.reId} ha sido eliminado`})

   }catch(error){
     res.status(500).json({message:error.message})
   }
})
module.exports = router
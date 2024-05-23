const express = require('express');
const router = express.Router();
const Pago = require('../models/pago.model');
const pagoModel = require('../models/pago.model');

const getPago = async(req,res,next)=>{
    let pago;
    const { id }= req.params;     
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(404).json({message:'El Id del pago no es valido'})
    }

        try {
            pago = await Pago.findById(id);
            if(!pago){
                return res.status(404).json({message:'No se encontro el pago'})
    
            }
        } catch (error){
            return res.status(500).json({message:error.message})
        }
       
    res.pago =pago;
    next();
}
router.get('/',async(req,res)=>{
    try{
        const pagos = await Pago.find();
        //res.json(books);chatgpt
        if(pagos.length ===0){
            return res.status(204).json([]);
        }
        res.json(pagos);         
        
        
    }catch(error){
        res.status(500).json({message:error.message})
    }
})
//crear un nuevo pago(recurso)
router.post('/',async(req,res)=>{
    const{paId,paIdUser,paIdMembresia,paIdTarjeta,paMonto,paFecha} = req.body;
    if(!paId || !paIdUser || !paIdMembresia || !paIdTarjeta || !paMonto || !paFecha ){
        return res.status(400).json({message:'Faltan datos los campos son obligatorios '})
    }
    const pago = new Pago(
        {
            paId,
            paIdUser,
            paIdMembresia,
            paIdTarjeta,
            paMonto,
            paFecha                     
        }
    )
    try{
        const newPago = await pago.save()
        res.status(201).json(newPago)
    }catch(error){
        res.status(400).json({message:error.message})
    }
})

router.get('/:id',getPago, async(req,res)=>{
    res.json(res.estado)
})

router.put('/:id',getPago, async(req,res)=>{
    try{
        const pago = res.pago;
        pago.paId = req.body.paId || pago.paId
        pago.paIdUser = req.body.paIdUser || pago.paIdUser
        pago.paIdMembresia = req.body.paIdMembresia || pago.paIdMembresia
        pago.paIdTarjeta = req.body.paIdTarjeta || pago.paIdTarjeta
        pago.paMonto = req.body.paMonto || pago.paMonto
        pago.paFecha = req.body.paFecha || pago.paFecha          
        
        const updatePago = await Pago.save()
        res.json(updatePago)

    }catch(error){
        res.status(400).json({message:error.message})
    }
    
})

router.patch('/:id',getPago, async(req,res)=>{
    if(!req.body.paId && !req.body.paIdUser && !req.body.paIdMembresia && !req.body.paIdTarjeta && !req.body.paMonto && !req.body.paFecha){
        return res.status(400).json({message:'Al menos uno de estos campos deben ser enviados'})
    }
    try{
        const pago = res.pago;
        pago.paId = req.body.paId || pago.paId
        pago.paIdUser = req.body.paIdUser || pago.paIdUser
        pago.paIdMembresia = req.body.paIdMembresia || pago.paIdMembresia
        pago.paIdTarjeta = req.body.paIdTarjeta || pago.paIdTarjeta
        pago.paMonto = req.body.paMonto || pago.paMonto
        pago.paFecha = req.body.paFecha || pago.paFecha
                 
        const updatePago = await pago.save()
        res.json(updatePago)

    }catch(error){
        res.status(400).json({message:error.message})
    }
    
})

router.delete('/:id',getPago, async(req,res)=>{
   try{
    const pago = res.Pago;
    await pago.deleteOne({
        id:pago.id
        /*_id:estado._id*/
    });
    res.json({message:`El estado ${estado.esNombre} ha sido eliminado`})

   }catch(error){
     res.status(500).json({message:error.message})
   }
})
module.exports = router
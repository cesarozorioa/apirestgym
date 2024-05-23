const express = require('express');
const router = express.Router();
const Rol = require('../models/rol.model')

const getRol = async(req,res,next)=>{
    let rol;
    const { id }= req.params;     
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(404).json({message:'El rol no es valido'})
    }

        try {
            rol = await Rol.findById(id);
            if(!rol){
                return res.status(404).json({message:'No se encontro el rol'})
    
            }
        } catch (error){
            return res.status(500).json({message:error.message})
        }
       
    res.rol =rol;
    next();
}
router.get('/',async(req,res)=>{
    try{
        const roles = await Rol.find();
        //res.json(books);chatgpt
        if(roles.length ===0){
            return res.status(204).json([]);
        }
        res.json(roles);         
        
        
    }catch(error){
        res.status(500).json({message:error.message})
    }
})
//crear un nuevo usuario(recurso)
router.post('/',async(req,res)=>{
    const{rolName,rolId} = req.body;
    if(!rolName || !rolId){
        return res.status(400).json({message:'Faltan datos los campos son obligatorios'})
    }
    const rol = new Rol(
        {
            rolId,
            rolName,
                       
        }
    )
    try{
        const newRol = await rol.save()
        res.status(201).json(newRol)
    }catch(error){
        res.status(400).json({message:error.message})
    }
})

router.get('/:id',getRol, async(req,res)=>{
    res.json(res.rol)
})

router.put('/:id',getRol, async(req,res)=>{
    try{
        const rol = res.rol;
        rol.rolId = req.body.rolId || rol.rolId
        rol.rolName = req.body.rolName || rol.rolName        
        
        const updateRol = await rol.save()
        res.json(updateRol)

    }catch(error){
        res.status(400).json({message:error.message})
    }
    
})

router.patch('/:id',getRol, async(req,res)=>{
    if(!req.body.rolName && !req.body.rolDescripcion){
        return res.status(400).json({message:'Al menos uno de estos campos deben ser enviados'})
    }
    try{
        const rol = res.rol;
        rol.rolId = req.body.rolId || rol.rolId
        rol.rolName = req.body.rolName || rol.rolName               
        const updateRol = await rol.save()
        res.json(updateRol)

    }catch(error){
        res.status(400).json({message:error.message})
    }
    
})

router.delete('/:id',getRol, async(req,res)=>{
   try{
    const rol = res.rol;
    await rol.deleteOne({
        /*_id:rol._id*/
        id:rol.id
    });
    res.json({message:`El rol ${rol.rolName} ha sido eliminado`})

   }catch(error){
     res.status(500).json({message:error.message})
   }
})
module.exports = router
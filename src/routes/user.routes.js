const express = require('express');
const router = express.Router();
const User = require('../models/user.model')

const getUser = async(req,res,next)=>{
    let user;
    const { id }= req.params;     
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(404).json({message:'El id del usuario no es valido'})
    }

        try {
            user = await User.findById(id);
            if(!user){
                return res.status(404).json({message:'No se encontro el usuario'})
    
            }
        } catch (error){
            return res.status(500).json({message:error.message})
        }
       
    res.user = user;
    next();
}
router.get('/',async(req,res)=>{
    try{
        const users = await User.find();
        //res.json(books);chatgpt
        if(users.length ===0){
            return res.status(204).json([]);
        }
        res.json(users);         
        
        
    }catch(error){
        res.status(500).json({message:error.message})
    }
})
//crear un nuevo usuario(recurso)
router.post('/',async(req,res)=>{
    const{usId,usNombre,usApellido,usPassword,usName,usIdRol} = req.body;
    if(!usId ||!usNombre || !usApellido || !usPassword || !usName || !usIdRol){
        return res.status(400).json({message:'Faltan datos los campos son obligatorios'})
    }
    const user = new User(
        {
            usId,
            usNombre,
            usApellido,
            usPassword,
            usName,
            usIdRol
        }
    )
    try{
        const newUser = await user.save()
        res.status(201).json(newUser)
    }catch(error){
        res.status(400).json({message:error.message})
    }
})

router.get('/:id',getUser, async(req,res)=>{
    res.json(res.user)
})

router.put('/:id',getUser, async(req,res)=>{
    try{
        const user = res.user;
        user.usId = req.body.usId || user.usId;
        user.usNombre = req.body.usNombre || user.usNombre;
        user.usApellido = req.body.usApellido || user.usApellido;
        user.usPassword = req.body.usPassword || user.usPassword;
        user.usName = req.body.usName || user.usName;
        user.usIdRol = req.body.usIdRol || user.usIdRol;
        
        const updateUser = await user.save()
        res.json(updateUser)

    }catch(error){
        res.status(400).json({message:error.message})
    }
    
})

router.patch('/:id',getUser, async(req,res)=>{
    if(!req.body.usId &&!req.body.usNombre && !req.body.usApellido && !req.body.usPassword && !req.body.usName && !req.body.usIdRol){
        return res.status(400).json({message:'Al menos uno de estos campos deben ser enviado'})
    }
    try{
        const user = res.user;
        user.usId = req.body.usId || user.usId;
        user.usNombre = req.body.usNombre || user.usNombre;
        user.usApellido = req.body.usApellido || user.usApellido;
        user.usPassword = req.body.usPassword || user.usPassword;
        user.usName = req.body.usName || user.usName;
        user.usIdRol = req.body.usIdRol || user.usIdRol;
        const updateUser = await user.save()
        res.json(updateUser)

    }catch(error){
        res.status(400).json({message:error.message})
    }    
})

router.delete('/:id',getUser, async(req,res)=>{
   try{
    const user = res.user;
    await user.deleteOne({
        id:user.id
       /* _id:user._id*/
    });
    res.json({message:`El usuario ${user.usNombre} ha sido eliminado`})

   }catch(error){
     res.status(500).json({message:error.message})
   }
})
module.exports = router
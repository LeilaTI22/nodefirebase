var ruta=require("express").Router();
var {mostrarUsuarios,nuevoUsuario,modificarUsuario,borrarUsuario,buscarPorId}=require("../bd/usuariosBD");

ruta.get("/api",async(req,res)=>{
    var usuarios =await mostrarUsuarios();
    if(usuarios.length>0){
        res.status(200).json(usuarios);
    }
    else{
        res.status(400).json("Usuarios no encontrados");
    }
});

ruta.post("/api/nuevoUsuario",async(req,res)=>{
    var error= await nuevoUsuario(req.body);
   if(error==0){
    res.status(200).json("Usuario registrado correctamente");
   }
   else{
    res.status(400).json("Error al registrar usuario")
   }
});

ruta.get("/api/buscarUsuarioPorId/:id", async(req,res)=>{
    var user=await buscarPorId(req.params.id);
   if(user!=undefined){
    res.status(200).json(user);
   }
   else{
    res.status(400).json("Usuario no encontrado");
   }

});
ruta.post("/api/editarUsuario",async(req,res)=>{
    var error=await modificarUsuario(req.body);
    if(error==0){
        res.status(200).json("Se acutualizo correctamente");
    }
    else{
        res.status(400).json("Error no se actualizo correctamente");
    }
})
ruta.get("/api/borrarUsuario/:id",async(req,res)=>{
    var error=await borrarUsuario(req.params.id);
    if(error==0){
        res.status(200).json("Usuario borrado");
    }
    else{
        res.status(400).json("error al borrar al usuario");
    }
    
});
module.exports=ruta;

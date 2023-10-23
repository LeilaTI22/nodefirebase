
const { mostrarUsuarios, nuevoUsuario, buscarPorId, modificarUsuario, borrarUsuario, loginUsuario } = require("../bd/usuariosBD");

var ruta=require("express").Router();
var subirArchivo=require("../middlewares/middelewares").subirArchivo;

ruta.get("/",async(req,res)=>{
     res.render("usuarios/login");
});

ruta.post("/", async(req, res) => {
     var error=await loginUsuario(req.body);

     console.log(error);
     if(error == 1) {
          res.redirect("/")
     } else if(error == 0){
          res.redirect("/mostrarUsuarios") 
     }
});

ruta.get("/mostrarUsuarios",async(req,res)=>{
     var users=await mostrarUsuarios();
     //console.log(users);
     //res.end();
     res.render("usuarios/mostrar",{users});
});

ruta.get("/nuevoUsuario",(req,res)=>{
     res.render("usuarios/nuevo");
});
ruta.post("/nuevoUsuario",subirArchivo(),async(req,res)=>{
     //console.log(req.file);
     req.body.foto=req.file.originalname;
     //res.end();
    var error= await nuevoUsuario(req.body);//nombre usuario y password
    res.redirect("/");
});
ruta.get("/editarUsuario/:id", async(req,res)=>{
     var user=await buscarPorId(req.params.id);
     res.render("usuarios/modificar",{user});
});

ruta.post("/editarusuario",async(req,res)=>{
     var error=await modificarUsuario(req.body);
     res.redirect("/");
})
ruta.get("/borrarUsuario/:id",async(req,res)=>{
     await borrarUsuario(req.params.id);
     res.redirect("/");
})

module.exports=ruta;
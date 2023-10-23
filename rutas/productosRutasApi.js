var ruta1=require("express").Router();
var { mostrarProductos, nuevoProducto, buscarPorIdd, modificarProducto, borrarProducto } = require("../bd/productosBD");

ruta1.get("/api1", async (req, res) => {
    var products = await mostrarProductos();
    if(products.length>0){
        res.status(200).json(products);
    }
    else{
        res.status(400).json("Productos no encontrados");
    }
});

ruta1.post("/api1/nuevoProducto",async(req,res)=>{
   var error= await nuevoProducto(req.body);
   if(error==0){
    res.status(200).json("Producto registrado correctamente");
   }
   else{
    res.status(400).json("Error al registrar uproducto")
   }
});
ruta1.post("/api1/editarproducto",async(req,res)=>{
    var error=await modificarProducto(req.body);
    if(error==0){
        res.status(200).json("Se acutualizo correctamente");
    }
    else{
        res.status(400).json("Error no se actualizo correctamente");
    }

})
ruta1.get("/api1/buscarProductoPorId/:id", async(req,res)=>{
    var produc=await buscarPorIdd(req.params.id);
    if(produc!=undefined){
        res.status(200).json(produc);
       }
       else{
        res.status(400).json("Producto no encontrado");
       }
});
ruta1.get("/api1/borrarProducto/:id",async(req,res)=>{
    await borrarProducto(req.params.id);
    if(error==0){
        res.status(200).json("Producto borrado");
    }
    else{
        res.status(400).json("error al borrar al producto");
    }
})

module.exports=ruta1;
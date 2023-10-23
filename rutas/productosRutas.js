const { mostrarProductos, nuevoProducto, buscarPorIdd, modificarProducto, borrarProducto } = require("../bd/productosBD");

var ruta1=require("express").Router();


// Ruta para mostrar la lista de productos usando la vista "tabla.ejs"
ruta1.get("/mostrarProductos", async (req, res) => {
     var products = await mostrarProductos();
     res.render("productos/mostrar", { products });
 });
/*ruta1.get("/",async(req,res)=>{
     var produc=await mostrarProductos();
     //console.log(users);
     //res.end();
     res.render("productos/mostrar",{produc});
});*/
ruta1.get("/nuevoProducto",(req,res)=>{
     res.render("productos/nuevo");
});
ruta1.post("/nuevoProducto",async(req,res)=>{
    // req.body.foto= req.file.originalname;
     var error= await nuevoProducto(req.body);
    res.redirect("mostrarProductos");
});
ruta1.get("/editarProducto/:id", async(req,res)=>{
     var produc=await buscarPorIdd(req.params.id);
     res.render("productos/modificar",{produc});
});

ruta1.post("/editarproducto",async(req,res)=>{
     var error=await modificarProducto(req.body);
     res.redirect("/mostrarProductos");
})
ruta1.get("/borrarProducto/:id",async(req,res)=>{
     await borrarProducto(req.params.id);
     res.redirect("/mostrarProductos");
})

module.exports=ruta1;
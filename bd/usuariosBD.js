var conexion=require("./conexion").conexionUsuarios;

var Usuario=require("../modelos/Usuario");

async function mostrarUsuarios(){
    var users=[];
 try{
    var usuarios= await conexion.get();
    usuarios.forEach(usuario =>{ 
     //console.log(usuario.data());
     var usuario1=new Usuario(usuario.id,usuario.data())
     //console.log("fghgfh");
     //console.log(usuario1);
     if (usuario1.bandera==0){
         users.push(usuario1.obtenerUsuario);
     }
    })
 }
 catch(err){
    console.log("Error al recuperar usuarios mostrar usuarios"+err); 
 }

 return users;

}

async function loginUsuario(datos) {
    var error = 1;
    var users = await mostrarUsuarios();
    
    var encontradoUsuario = false;
    var encontradoPassword = false;
    
    var usuario = users.find(dato => dato.usuario === datos.usuario)
    var password = users.find(dato => dato.password === datos.password)

    console.log(usuario);
    console.log(password);

    if (usuario) {
        encontradoUsuario = true;
        if(password) {
            encontradoPassword = true;
        }
    }

    if (encontradoUsuario && encontradoPassword) {
        return error = 0;
    }

    return error;

}

async function nuevoUsuario(newUser){
    var error=1;
    try{
        var usuario1=new Usuario(null,newUser);
        console.log("Datos recibidos:", usuario1); // Agregar esta línea para depurar
        if(usuario1.bandera==0){
            conexion.doc().set(usuario1.obtenerUsuario);
            error=0;
        }
        else{
            console.log("datos incorrectos");
        }
       
    }
    catch(err){
        console.log("error al crear usuario"+err);
    }
    return error;
 }
 async function buscarPorId(id){
    var user;
    try{
        var usuarioBD=await conexion.doc(id).get();
        var usuarioObjeto=new Usuario(usuarioBD.id, usuarioBD.data());
        if(usuarioObjeto.bandera==0){
            user=usuarioObjeto.obtenerUsuario;
        }
    }
    catch(err){
        console.log("Error al recuperar el usuario "+err);
    }
    return  user;
 } 
 async function modificarUsuario(datos){
    var error=1;
    var user= await buscarPorId(datos.id);
    if(user!=undefined){
        var user=new Usuario(datos.id, datos);
    
        if(user.bandera==0){
            try{
                await conexion.doc(user.id).set(user.obtenerUsuario);
                console.log("los datos se modificaron correctamente");
                error=0;
            }
            catch(error){
                cosole.log("Error al modificar al usuario"+error);      
            }
        }else{
            console.log("Error los datos no son vlaidos");
        }
    }
    return error;
    
}

 async function borrarUsuario(id){
    var error=1;
    var user =await buscarPorId(id);
    if(user !=undefined){
        try{
            await conexion.doc(id).delete();
            console.log("El usuario se borro correctamente");
            error=0;
    
        }
        catch(err){
            console.log("Error al borrar el usuario");
        }
    }return error;
    
 }

 module.exports={
    mostrarUsuarios,
    nuevoUsuario,
    buscarPorId,
    modificarUsuario,
    borrarUsuario,
    loginUsuario
 }
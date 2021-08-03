/**
 * SesionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  registro: async (req, res) =>{
      res.view('pages/registro')
  },

  procesarRegistro: async (peticion, respuesta) => {
    let cliente = await Cliente.findOne({ email: peticion.body.email });
    if (cliente) {
      peticion.addFlash('mensaje', 'Email duplicado')
      return respuesta.redirect("/registro");
    }
    else {
      let cliente = await Cliente.create({
        email: peticion.body.email,
        nombre: peticion.body.nombre,
        contrasena: peticion.body.contrasena
      })
      peticion.session.cliente = cliente;
      peticion.addFlash('mensaje', 'Cliente Registrado')
      return respuesta.redirect("/");
    }
  },

  inicioSesion: async (req, res)=>{
    res.view('pages/inicio-sesion')
  },

  procesarInicioSesion: async (peticion, respuesta) => {
    let cliente = await Cliente.findOne({ email: peticion.body.email, contrasena: peticion.body.contrasena });
    
    if(!cliente.estado){
      peticion.addFlash('mensaje', 'Cliente se encuentra inactivo o bloqueado')
      return respuesta.redirect("/inicio-sesion");
    }
    if (cliente) {
      //cargamos a session el usuario que inicio
      peticion.session.cliente = cliente;
      //aqui cargamos el carrito de compras
      //consultamos el modelo CarroCompras con el id del cliente o usuario que inicio sesion
      let carroCompra=await CarroCompra.find({cliente: cliente.id});
      //lo cargamos a la sesion
      peticion.session.carroCompra = carroCompra;

      peticion.addFlash('mensaje', 'Sesión iniciada')
      return respuesta.redirect("/");
    }
    else {
      peticion.addFlash('mensaje', 'Email o contraseña invalidos')
      return respuesta.redirect("/inicio-sesion");
    }
  },

  cerrarSesion: async (peticion, respuesta) => {
    peticion.session.cliente = undefined;
    peticion.addFlash('mensaje', 'Sesión finalizada')
    return respuesta.redirect("/");
  },

};


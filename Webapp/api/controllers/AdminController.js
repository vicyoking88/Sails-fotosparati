const path = require('path');
const fs = require('fs');




module.exports = {
  inicioSesion: async (request, response) => {
    response.view('pages/admin/inicio_sesion');
  },

  procesarInicioSesion: async (peticion, respuesta) => {
    let admin = await Admin.findOne({ email: peticion.body.email, contrasena: peticion.body.contrasena });

    if(!admin.estado){
      peticion.addFlash('mensaje', 'Administrador se encuentra inactivo o bloqueado')
      return respuesta.redirect("/admin/inicio-sesion");
    }
    if (admin) {
      //cargamos a session de el admin que inicio
      peticion.session.admin = admin;
      // eliminamos session de cliente pues al ingresar admin esta tiene que cerrarse sobreescribe
      peticion.session.cliente = undefined;
      //aqui cargamos el carrito de compras

      peticion.addFlash('mensaje', 'Sesión de admin iniciada')
      return respuesta.redirect("/admin/principal");
    }
    else {
      peticion.addFlash('mensaje', 'Email o contraseña invalidos')
      return respuesta.redirect("/admin/inicio-sesion");
    }
  },

  principal: async (peticion, respuesta) => {
    /// con esto validamos que no entre nadie que conozca la ruta
    if (!peticion.session || !peticion.session.admin) {
      peticion.addFlash('mensaje', 'No tienes una Sesion iniciada')
      return respuesta.redirect("/admin/inicio-sesion")
    }
    let fotos = await Foto.find().sort("id");
    respuesta.view('pages/admin/principal', { fotos })
  },

  cerrarSesion: async (peticion, respuesta) => {
    peticion.session.admin = undefined
    peticion.addFlash('mensaje', 'Sesión finalizada')
    return respuesta.redirect("/");
  },

  agregarFoto: async (peticion, respuesta) => {
    if (!peticion.session || !peticion.session.admin) {
      peticion.addFlash('mensaje', 'No tienes una Sesion iniciada')
      return respuesta.redirect("/admin/inicio-sesion")
    }
    respuesta.view('pages/admin/agregar_foto')
  },

  procesarAgregarFoto: async (peticion, respuesta) => {
    if (!peticion.session || !peticion.session.admin) {
      peticion.addFlash('mensaje', 'No tienes una Sesion iniciada')
      return respuesta.redirect("/admin/inicio-sesion")
    }

    let foto = await Foto.create({
      titulo: peticion.body.titulo,
      activa: true
    }).fetch()

    peticion.file('foto').upload({}, async (error, archivos) => {
      if (archivos && archivos[0]) {
        let upload_path = archivos[0].fd
        let ext = path.extname(upload_path)

        await fs.createReadStream(upload_path).pipe(fs.createWriteStream(path.resolve(sails.config.appPath, `assets/images/fotos/${foto.id}${ext}`)))

        await Foto.update({ id: foto.id }, { contenido: `${foto.id}${ext}`, activa: true })
        peticion.addFlash('mensaje', 'Foto agregada')

        return respuesta.redirect("/admin/principal")
      }

      peticion.addFlash('mensaje', 'No hay foto seleccionada')
      return respuesta.redirect("/admin/agregar-foto")

    })

  },

  activarFoto: async (req, res) => {
    if (!peticion.session || !peticion.session.admin) {
      peticion.addFlash('mensaje', 'No tienes una Sesion iniciada')
      return respuesta.redirect("/admin/inicio-sesion")
    }
    let foto = await Foto.findOne({ id: req.params.fotoId });
    if (foto.activa) {
      await Foto.update({ id: foto.id }, { activa: false })
      req.addFlash('mensaje', 'Foto Desactivada')
    } else {
      await Foto.update({ id: foto.id }, { activa: true })
      req.addFlash('mensaje', 'Foto Activada')
    }


    return res.redirect("/admin/principal")

  },

  /**SOLUCION NEXTU */

  /*** desactivarFoto: async (peticion, respuesta) => {
await Foto.update({id: peticion.params.fotoId}, {activa: false})
peticion.addFlash('mensaje', 'Foto desactivada')
return respuesta.redirect("/admin/principal")
},

activarFoto: async (peticion, respuesta) => {
await Foto.update({id: peticion.params.fotoId}, {activa: true})
peticion.addFlash('mensaje', 'Foto activada')
return respuesta.redirect("/admin/principal")
}, */
  /** HTML */
  /***<tbody>
    <% fotos.forEach( foto => { %>
      <tr>
        <td><%=foto.id%></td>
        <td><%=foto.titulo%></td>
        <td><img src="/images/fotos/<%=foto.contenido%>" alt="" class="wf-10"></td>
        <td><%=foto.activa ? "Si" : "No"%></td>
        <td>
          <% if (foto.activa) { %>
          <a href="/admin/desactivar-foto/<%=foto.id%>" class="btn btn-info">Desactivar Foto</a>
          <% } else { %>
          <a href="/admin/activar-foto/<%=foto.id%>" class="btn btn-primary">Activar Foto</a>
          <% } %>
        </td>
      </tr>
    <% }) %>
  </tbody> */


  cargarClientes: async (request, response) => {

    if (!request.session || !request.session.admin) {
      request.addFlash('mensaje', 'No tienes una Sesion iniciada')
      return response.redirect("/admin/inicio-sesion")
    }
    let clientes = await Cliente.find().populate('ordenes').sort("id");
    response.view('pages/admin/clientes', { clientes });
  },

  activarCliente: async (req, res) => {
    if (!req.session || !req.session.admin) {
      req.addFlash('mensaje', 'No tienes una Sesion iniciada')
      return res.redirect("/admin/inicio-sesion")
    }
    let cliente = await Cliente.findOne({ id: req.params.clienteId });
    if (cliente.estado) {
      await Cliente.update({ id: cliente.id }, { estado: false })
      req.addFlash('mensaje', 'Cliente desactivado')
    } else {
      await Cliente.update({ id: cliente.id }, { estado: true })
      req.addFlash('mensaje', 'Cliente Activado')
    }
    return res.redirect("/admin/mis-clientes")

  },

  cargarOrdenes: async (request, response) => {
    if (!request.session || !request.session.admin) {
      request.addFlash('mensaje', 'No tienes una Sesion iniciada')
      return response.redirect("/admin/inicio-sesion")
    }

    let detallesOrden = await OrdenDetalle.find({ orden: request.params.ordenId }).populate('foto');
    response.view('pages/admin/fotos_compradas', { detallesOrden })
  },

  cargarAdmis: async (request, response) => {
    if (!request.session || !request.session.admin) {
      request.addFlash('mensaje', 'No tienes una Sesion iniciada')
      return response.redirect("/admin/inicio-sesion")
    }
    let Admis = await Admin.find().sort("id");
    response.view('pages/admin/admis', { Admis });
  },

  activarAdmin: async (req, res) => {
    if (!req.session || !req.session.admin) {
      req.addFlash('mensaje', 'No tienes una Sesion iniciada')
      return res.redirect("/admin/inicio-sesion")
    }
    let admin = await Admin.findOne({ id: req.params.adminId });
    if (req.session.admin.id == admin.id) {
      req.addFlash('mensaje', 'No puedes cambiar el estado del Administrador que estas logueado')
      return res.redirect("/admin/mis-admis");
    } else {
      if (admin.estado) {
        await Admin.update({ id: admin.id }, { estado: false })
        req.addFlash('mensaje', 'Administrador desactivado')
      } else {
        await Admin.update({ id: admin.id }, { estado: true })
        req.addFlash('mensaje', 'Administrador Activado')
      }
      return res.redirect("/admin/mis-admis")
    }
  },

  cargaDashboard: async (request, response) => {

    if (!request.session || !request.session.admin) {
      request.addFlash('mensaje', 'No tienes una Sesion iniciada')
      return response.redirect("/admin/inicio-sesion")
    }

    let clientes = await Cliente.find();
    let fotos = await Foto.find();
    let admis = await Admin.find();
    let ordenes = await Orden.find();


    let totales = [{
      total_clientes: clientes.length,
      total_fotos: fotos.length,
      total_admis: admis.length,
      total_ordenes: ordenes.length
    }];
    response.view('pages/admin/totales', { totales });
  }

};
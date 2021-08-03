/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

/**asi llamamos la web principal */
  'GET /': 'PrincipalController.inicio',

/**asi llamamos la web de inf acerca de */
  '/acerca-de': {
    view: 'pages/acerca_de'
  },
// cargamos formulario de registro
  'GET /registro':'SesionController.registro',
// procesamos los datos suministrados en el formulario de registro
  'POST /procesar-registro':'SesionController.procesarRegistro',
//cargamos formulario de inicio de sesion
  'GET /inicio-sesion': 'SesionController.inicioSesion',
//tomamos los datos y buscamos en la base de datos si existe el usuario para iniciar sesion
  'POST /procesar-inicio-sesion': 'SesionController.procesarInicioSesion',
// cerramos session despues de precionar en la web esta opcion
  'GET /cerrar-sesion': 'SesionController.cerrarSesion',
//con esta ruta agregamos un elemento al carrito de compras
  'GET /agregar-carro-compra/:fotoId':'CompraController.agregarCarroCompra',
//con esta ruta mostramos todos los elementos en el carrito de compras
  'GET /carro-de-compra':'CompraController.carroCompra',
//con esta ruta se procede a eliminar un articulo del carrito
  'GET /eliminar-carro-compra/:fotoId': 'CompraController.eliminarCarroCompra',
//adicionar un deseo
  'GET /add-deseos/:fotoId':'CompraController.agregarDeseo',
//CARGAR LISTA DESEOS
  'GET /mis-deseos':'CompraController.listaDeseos',

  'GET /delete-deseo/:fotoId': 'CompraController.deleteDeseo',
// con esta rota dirigimos para procesar una compra
  'GET /comprar': 'CompraController.comprar',
// cargamos las ordenes en una pagina
  'GET /mis-ordenes':'CompraController.misOrdenes',
// enviamos el numero de orden y cargamos los detalles de la compra
  'GET /mis-ordenes/:ordenId': 'CompraController.ordenDeCompra',
// cargamos las top mas vendidas
  'GET /top-vendidas':'PrincipalController.topVendidas',

  /************RUTAS DEL ADMINISTRADOR*************** */
'GET /admin/inicio-sesion':'AdminController.inicioSesion',
'POST /admin/procesar-inicio-sesion': 'AdminController.procesarInicioSesion',
'GET /admin/principal':'AdminController.principal',
'GET /admin/cerrar-sesion':'AdminController.cerrarSesion',
/**RUTAS PARA LAS FOTOS */
//cargamos form para cargar foto
'GET /admin/agregar-foto':'AdminController.agregarFoto',
//realizamos la carga de la nueva foto
'POST /admin/procesar-agregar-foto': 'AdminController.procesarAgregarFoto',
//habilitamos o desabilitamos la foto
'GET /admin/activar/:fotoId':'AdminController.activarFoto',
//cargamos lista de clientes registrados
'GET /admin/mis-clientes':'AdminController.cargarClientes',

'GET /admin/mis-clientes-orden/:ordenId':'AdminController.cargarOrdenes',

'GET /admin/cliente-activar/:clienteId':'AdminController.activarCliente',

'GET /admin/admin-activar/:adminId':'AdminController.activarAdmin',
//cargamos los administraadores
'GET /admin/mis-admis':'AdminController.cargarAdmis',
// cargamos totales
'GET /admin/dashboard':'ADminController.cargaDashboard',

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};

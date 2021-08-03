/**
 * CompraController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    /**1- buscamos en el modelo CarroCompra si la foto ya esta agregada para este cliente en la base de datos.
     * 2- si se encuentra por un if emitimos un mensaje de que la foto ya esta agregada de lo contrario se agrega al carrito se consulta el modelo carrito y se valida que la foto fue agregada con lo que se envia un mensaje y se direcciona a la web principal
     */
    agregarCarroCompra: async (peticion, respuesta) => {
        if (!peticion.session || !peticion.session.cliente) {
            return respuesta.redirect("/inicio-sesion")
        }

        let foto = await CarroCompra.findOne({ foto: peticion.params.fotoId, cliente: peticion.session.cliente.id })
        if (foto) {
            peticion.addFlash('mensaje', 'La foto ya había sido agregada al carro de compra')
        }
        else {
            await CarroCompra.create({
                cliente: peticion.session.cliente.id,
                foto: peticion.params.fotoId
            })
            peticion.session.carroCompra = await CarroCompra.find({ cliente: peticion.session.cliente.id })
            peticion.addFlash('mensaje', 'Foto agregada al carro de compra')
        }
        return respuesta.redirect("/")
    },

    carroCompra: async (peticion, respuesta) => {
        if (!peticion.session || !peticion.session.cliente) {
            return respuesta.redirect("/inicio-sesion")
        }

        let elementos = await CarroCompra.find({ cliente: peticion.session.cliente.id }).populate('foto')
        respuesta.view('pages/carro_de_compra', { elementos })
    },

    /**consultamos si el cliente tiene la foto si la tiene se destruye y se retorna a la ruta de los articulos del carro */
    eliminarCarroCompra: async (peticion, respuesta) => {
        if (!peticion.session || !peticion.session.cliente) {
            return respuesta.redirect("/inicio-sesion")
        }

        let foto = await CarroCompra.findOne({ foto: peticion.params.fotoId, cliente: peticion.session.cliente.id })
        if (foto) {
            await CarroCompra.destroy({
                cliente: peticion.session.cliente.id,
                foto: peticion.params.fotoId
            })
            peticion.session.carroCompra = await CarroCompra.find({ cliente: peticion.session.cliente.id })
            peticion.addFlash('mensaje', 'Foto eliminada del carro de compra')
        }
        return respuesta.redirect("/carro-de-compra")
    },

    
        /**action para agregar deseos */
        agregarDeseo: async (req, res)=>{
            if (!req.session || !req.session.cliente) {
                return res.redirect("/inicio-sesion")
            }

          let foto = await ListaDeseos.findOne({ foto: req.params.fotoId, cliente: req.session.cliente.id })
            if (foto) {
                req.addFlash('mensaje', 'La foto ya esta en los deseos')
            }
            else {
                await ListaDeseos.create({
                    cliente: req.session.cliente.id,
                    foto: req.params.fotoId
                })
                req.session.listaDeseos = await ListaDeseos.find({ cliente: req.session.cliente.id })
                req.addFlash('mensaje', 'Foto registrada en mi lista de Deseos')
            }
            return res.redirect("/")
    
        },

/**MOSTRAR LISTA DE DESEOS */
        listaDeseos: async (req, res) => {
            if (!req.session || !req.session.cliente) {
                return res.redirect("/inicio-sesion")
            }
          let deseos = await ListaDeseos.find({ cliente: req.session.cliente.id }).populate('foto')
          res.view('pages/mis_deseos', { deseos })
      },

/**BORRAR DESEO */
      deleteDeseo : async (request, response) => {
        if (!request.session || !request.session.cliente) {
            return response.redirect("/inicio-sesion")
        }

        let foto = await ListaDeseos.findOne({ foto: request.params.fotoId, cliente: request.session.cliente.id })
        if (foto) {
            await ListaDeseos.destroy({
                cliente: request.session.cliente.id,
                foto: request.params.fotoId
            })
            request.session.ListaDeseos = await ListaDeseos.find({ cliente: request.session.cliente.id })
            request.addFlash('mensaje', 'Foto eliminada de mi lista de Deseos')
        }
        return response.redirect("/mis-deseos")
    },


//metodo que preocesar la compra
    comprar: async (peticion, respuesta) => {
        if (!peticion.session || !peticion.session.cliente) {
            return respuesta.redirect("/inicio-sesion")
        }
        //creamos los datos de la compra y los almacenamos en la base de datos
        let orden = await Orden.create({
          fecha: new Date(),
          cliente: peticion.session.cliente.id,
          total: peticion.session.carroCompra.length
        }).fetch()
        //almacenamos los detalles de la compra en la base de datos
        for(let i=0; i< peticion.session.carroCompra.length; i++){
          await OrdenDetalle.create({
            orden: orden.id,
            foto: peticion.session.carroCompra[i].foto
          })
        }
        //borramos los datos de la compra despues de ser procesados
        await CarroCompra.destroy({cliente: peticion.session.cliente.id})
        peticion.session.carroCompra = []
        //enviamos mensaje de compra exitosa
        peticion.addFlash('mensaje', 'La compra ha sido realizada')
        return respuesta.redirect("/")
      },
/**con este action cargamos las ordenes */
      misOrdenes: async (peticion, respuesta)=>{
        if (!peticion.session || !peticion.session.cliente) {
            return respuesta.redirect("/")
        }
          let ordenes = await Orden.find({cliente: peticion.session.cliente.id}).sort('id desc');
          
          respuesta.view('pages/mis_ordenes', {ordenes});
      },

      ordenDeCompra: async (peticion, respuesta) => {
        if (!peticion.session || !peticion.session.cliente) {
            return respuesta.redirect("/inicio-sesion")
        }
        
        let orden = await Orden.findOne({ cliente: peticion.session.cliente.id, id: peticion.params.ordenId }).populate('detalles')
    
        if (!orden) {
          return respuesta.redirect("/mis-ordenes")
        }
        console.log(orden);
    
        if (orden && orden.detalles == 0) {
          return respuesta.view('pages/orden', { orden })
        }
    
        orden.detalles = await OrdenDetalle.find({ orden: orden.id }).populate('foto')
        console.log(orden);
        return respuesta.view('pages/orden', { orden })
      },

};
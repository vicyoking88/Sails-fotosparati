module.exports = {

  inicio: async (req, res) => {
    let fotos = await Foto.find({activa: true})
      res.view('pages/inicio', {fotos})
    // All done.
  },

  topVendidas: async (req, res)=>{
    let consulta =
    `
    SELECT titulo, contenido, count(*) as cantidad 
    from orden_detalle join foto 
    on orden_detalle.foto_id = foto.id
    group by
    titulo, contenido, foto_id
    ORDER BY
    COUNT (*) DESC
    LIMIT 10
    `
    await OrdenDetalle.query(consulta, [], (errores, resultado)=>{
      let fotos = resultado.rows;
      res.view('pages/top_vendidas', {fotos});
    })
  }

};

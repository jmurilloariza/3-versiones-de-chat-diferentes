var servidor=function(puerto,url){
  //inicilizar variable http como un servidor
  http = require('http').createServer(crearServidor);
  //paquete encargado de cargar un archivo del disco duro
  fs=require("fs");
  //paquete encargado del uso relativo de request
  path=require("path");
  //creacion del servidor en un puerto y url espificada por la ip de la maquina donde se este ejecutando el servidor web
  http.listen(puerto,url,()=>{
    console.log("servidor web ejecutandose");
  });
  //vector creado para controlar a que archivos del servidor pueden acceder los usuarios
 var url=[
    {
      ruta:'',
      salida:'/pagina.html',
      type:'text/html'
    }
  ];
  //funcion encargada de recibir todas las request y enviar los response a los usuarios
    function crearServidor (req, res) {
      //variable encarga de parsear la url entrante para un tratamiento mas simple
      var pathUrl=path.basename(req.url);
      //head de respuesta inicial
      res.writeHead(404,{'Content-Type': 'text/html'});
      //ciclo encargado de buscar en el vector url si el archivo al que quiere acceder el usuario es correcto o tiene permiso
      url.forEach(function (pos){
        //condicion encargada de validar si esa url existe
        if(pos.ruta.includes(pathUrl)){
          //head final
          res.writeHead(200, {'Content-Type': pos.type});
          //envio de archivo al usuario
          res.end(fs.readFileSync(__dirname+pos.salida));
        }
      })
  }
}
exports.iniciar=servidor;

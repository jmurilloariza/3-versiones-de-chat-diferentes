exports.eventos=function(http){
  //paquete encargado del envio y recepcion de informacion entre el usuario web y el servidor de mensajes
  var io=require("socket.io")(http);
  //paquete encargado del uso de los socket-tcp
  var net = require('net');
 //paquete encargado del uso de ips
  var ip=require("ip");
 

  //encarga de establecer la conexion con el servidor de mensajes y cerrar el ciclo que busca la ip dinamicamente
      
          io.sockets.on('connection',function(socket){
            console.log("usuario web conectado");
            var id=null;
            var client = new net.Socket();
              client.connect(3000,ip.address());
              client.on('data', (data) => {
                var res=data.toString("utf-8");
                try {
                  var obj=JSON.parse(res);
                  if(obj.tipo==1){
                      id=obj.id;
                      socket.emit("recibirId",id);
                  }else if(obj.tipo==2 || obj.tipo==3){
                      socket.emit("recibirMensaje",obj);
                  }else if(obj.tipo==4){
                      socket.emit("recibirUsuarios",obj.usuarios);
                  }
                } catch(e) {
                  var res2=res.split("\n");
                  for (var i = 0; i < res2.length-1; i++) {
                      var obj=JSON.parse(JSON.stringify(res2[i]));
                     obj= JSON.parse(obj);
                      if(obj.tipo==1){
                          id=obj.id;
                          socket.emit("recibirId",id);
                      }else if(obj.tipo==2 || obj.tipo==3){
                          socket.emit("recibirMensaje",obj);
                      }else if(obj.tipo==4){
                          socket.emit("recibirUsuarios",obj.usuarios);
                      }
                  }
                }
             });
                  socket.on("enviarMensaje",(data)=>{
                    client.write(JSON.stringify(data));
                  });
                  socket.on("nombre",(data)=>{
                    client.write(JSON.stringify({tipo:1,nombre:data}));
                  });
             socket.on('disconnect', function(){
                  console.log('desconectado web desconectado');
                  client.end();
                  client=null;
              });
          });

      
}

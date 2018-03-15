//------------------paquetes-------------------
//paquete encargado del uso de los socket-tcp
var net = require('net');
//paquete encargado de la creacion de ids dinamicas 
var shortid = require('shortid');
//paquete encargado del uso de ips
var ip = require('ip')
//------------------variables------------------
//inicializacion de variable server
var server = net.createServer();
//inicializacion de vector usuarios
//encargado de guardar los sockets de todos los usuarios conectados para envio de informacion
var usuarios=[];
//inicializacion de vector conectados
//encargado de guardar informacion en forma de json de los usuarios conectado {id:numero,nombre:"nombre"}
var conectados=[];
//inicializacion del grupo todos para envio de mensajes grupal
conectados[0] = {id:4, nombre: "todos"};

//-----------------servidor-------------------
//el servidor comienza a escuchar, cuando cada usuario se conecte el servidor comienza a escuchar y emitir
server.on("connection",(socket)=>{
  console.log("Usuario conectado Servidor Mensajes")
  //variable id, que se crea cuando un usuario se conecta
  var id = shortid.generate();
  //cuando un usuario se conecta se le envia la informacion de su id respectivo
  socket.write(JSON.stringify({tipo:1,id:id})+"\n");
  //se agrega al vector usuarios el socket creacdo por el usuario que se acaba de conectar
  usuarios.push(socket);
  //el socket comienza a leer datos enviados de los usuarios 
  socket.on("data",(data)=>{
  //variable obj, que se crea para parsear la data enviada por cada usuario
    var obj=JSON.parse(data.toString("utf-8"));
  //--------------------JSON----------------------
  //1.Informacion de cualquier tipo del usuario
  //2.Mensaje grupal
  //3.Mensaje individual
  //----------------------------------------------
  //opcion 1
    if(obj.tipo==1){
      //se guarda en conectados el id y el nombre del usuario
      conectados.push({id:id,nombre:obj.nombre})
      //se llama a la funcion enviarUsuarios
      enviarUsuarios();
      //opcion 2
    }else if(obj.tipo==2){
      //se llama a la funcion enviarMensaje
      enviarMensaje(data);
      //opcion3
    }else if(obj.tipo==3){
      //ciclo creado para buscar en conectados el socket de destino al cual se quiere enviar el mensaje
      for (var i = 0; i < conectados.length; i++) {
        //condicion encargada de validar si el id de destino es igual a algun conectado
        if(conectados[i].id==obj.destinatario){
          //se envia al destinatario el mensaje
          usuarios[i-1].write(data+"\n");
          //se envia al emisor el mensaje
          socket.write(data+"\n");
          //se sale del ciclo
          break;
        }
      }
    }
  });
  //funcion del socket cuando un usuario se desconecta
  socket.on("close",()=>{
  console.log("Usuario desconectado Servidor Mensajes")
  //se elimina del vector de conectados la informacion del usuario
    conectados.splice(usuarios.indexOf(socket)+1,1);
    //se elimina del vector de usuario el socket del usuario
    usuarios.splice(usuarios.indexOf(socket),1);
    //se llama a la funcion enviarUsuarios
    enviarUsuarios();
  });
  //funcion del socket cuando hay errores con un usuario
  socket.on("error",()=>{
    //se cierra automaticamente el socket para enviar errores en el servidor
    socket.end();
  })
});
//-------------------funcion enviarUsuarios-----------------
//encargada de enviarle a todos los usuarios la informacion de cada usuario
function enviarUsuarios(){
  //ciclo encargado de recorrer el vector usuarios que contiene el socket de cada usuario conectado
    for (var i=0;i<usuarios.length;i++) {
  //se envia a cada usuario la informacion de todos los usuarios 
          usuarios[i].write(JSON.stringify({tipo:4,usuarios:conectados})+"\n");
    }
}
//-------------------funcion enviarMensaje-----------------
//encargada de enviar un mensaje a todos los usuarios conectados
function enviarMensaje(data){
  //ciclo encargado de recorrer el vector usuarios que contiene el socket de cada usuario conectado
  for (var i=0;i<usuarios.length;i++) {
    //se envia a cada usuario un mensaje
      usuarios[i].write(data+"\n");
  }
}
//funcion encargada de crear el servidor de mensajes en un puerto y una ip
//la ip se maneja dependiendo de la ip que tenga la maquina donde se ejecute el servidor
server.listen(3000, ip.address(),()=>{
  console.log('\x1Bc')
  console.log("Servidor de mensajes ejecutandose en " ,server.address());
});

//llama a principal para ejecutar el servidor web
require("./principal.js");
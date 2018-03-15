//paquete encargado del uso de ips
var ip = require('ip')
//constante encargada del puerto en el que va a funcionar el servido web
const puerto=80;
//constante encargada de la ip del servidor web
const url=ip.address();
//llamar a servidor encargado de las peticiones web de los usuarios 
require("./servidor.js").iniciar(puerto,url);
//llamar a evento encargado de la conexion directa entre la pagina web y el servidor de mensajes
require("./evento.js").eventos(http);
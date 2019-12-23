var datos = require('./js/store/index.js');
var programacion = require('./js/programacion.js');
const fs = require('fs');
const VideoLib = require('node-video-lib');

var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 8080 }); // If you want to add a path as well, use path: "PathName"
var interval = null;
var targets = [];
var idConnection = 0;

function registrarTarget(mensaje){
    for(targetEncendido of programacion.targetsEncendidos){
        if(targetEncendido.idConnection == mensaje.idConnection){
            targetEncendido.target = mensaje;
        }
    }
}
function procesarMensaje(ws, message){
    console.log("procesando mensaje: " + message);
    message = JSON.parse(message);
    console.log("message: " + message);
    switch(message.idAction){
        case "registrarTarget":
            registrarTarget(message);
            break;
    }
}

wss.on('connection', function connection(_ws) {
    ws = _ws;
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        procesarMensaje(ws, message);
    });
    programacion.targetsEncendidos.push({"ws": ws, "idConnection": idConnection});
    ws.send('{"idAction": "enviarTarget", "conexionExitosa": true, "idConnection":'  + idConnection + '}');
    idConnection++;
    console.log("Nuevo cliente ws establecido");
    targets.push(ws); 
    
  //console.log("numero de clientes: " + targets.length);
});
function inicializaIntervalo(){
    var interval = setInterval(function(str1, str2) {
        for(var i = 0; i < targets.length; i++){
            targets[i].send("mensaje");
        }
    }, 4000);
}
/*fs.readFile('js/store/index.js', 'utf8', function(err, data) {
    let datos = data;
    programacion = JSON.parse(data);
    console.log(programacion);
    
});*/
console.log(programacion);
programacion.generarProgramacion(datos);
console.log("server ws on port 8080");
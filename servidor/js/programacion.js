const fs = require('fs');
var utils = require('./utils.js');
const VideoLib = require('node-video-lib');
var programacion = {
    "ahorita": utils.now(),
    "inicio": new Date().getTime(),
    "datosdeOperacion": null,
    "pid": "programacion",
    "duraciondefuentesDeterminada": false,
    "targetsEncendidos": [],
    "determinarDuraciondeFuente": function(source){
        if(source.tipo == "VIDEO"){
            console.log("determinando duracion de fuente: " + source.uri);
            fs.open("./videos/" + source.uri, 'r', (err, fd) => {
                try {
                    console.log("archivo abierto: " + fd);
                    let movie = VideoLib.MovieParser.parse(fd);
                    // Work with movie
                    duracion = movie.relativeDuration();
                    source.duracionDeterminada = true;
                    source.duracion = duracion;
                    console.log("duracion de " + source.uri + ": " + source.duracion);
                } catch (ex) {
                    console.error('Error:', ex);
                }
            });
        }
    },
    "determinarDuraciondeFuentes": function(p){
        console.log("en determinarDuraciondeFuentes");
        for(var source of p.sources){
            this.determinarDuraciondeFuente(source);
        }
        
    },
    "ejecutarSecuencia": function(){
        if(this.indicedeSecuenciaEjecutandose == -1){
            this.indicedeSecuenciaEjecutandose++;

        }else{
        }
    },
    "iniciarProgramaciondeCanal": function(channel){
        console.log("channel " + channel.idChannel + ": " + channel.nombre);
    },
    "iniciar" : function(datos){
        for(var channel of datos.channels){
            this.iniciarProgramaciondeCanal(channel)
        }
    },
    "presentarSource": function(channel, source){
        channel.sourceEjecutandose = source;
        channel.inicio = utils.now();
        console.log("En presentarSource: " + source.uri + ", duracion: " + source.duracion + ", inicio: " + channel.inicio);
        for(targetEncendido of this.targetsEncendidos){
            try{
                if(targetEncendido.target.idChannel == channel.idChannel ){
                    let accion = {};
                    accion.idAction = "presentarVideo";
                    accion.inicio = channel.inicio;
                    accion.source = source;
                    targetEncendido.ws.send("" + JSON.stringify(accion));
                }
            }catch(error){

            }
        }
        let p = this;
        console.log("P: " + p);
        setTimeout(function(){
            p.ejecutarSourceOfSequence(channel);
        }, ((source.duracion) * 1000));
    },
    "ejecutarSourceOfSequence": function(channel){
        if(channel.queuePautas.length > 0){
            var pauta = channel.queuePautas.shift();
            source = pauta.source;
            if(source.tipo == "VIDEO")
            {   console.log("+++++++++++++++++++en ejecutarSourceOfSequence: presentando pauta ");
                this.presentarSource(channel, source);
            }else{
                this.ejecutarSourceOfSequence(channel);
            }

        }else{
            if(channel.indicedeSecuenciaEjecutandose == (channel.sourcesOfSequence.length - 1)){
                channel.indicedeSecuenciaEjecutandose = 0;
            }else{
                channel.indicedeSecuenciaEjecutandose++
            }
            var source = channel.sourcesOfSequence[channel.indicedeSecuenciaEjecutandose];
            if(source.tipo == "VIDEO")
            {   console.log("***************en ejecutarSourceOfSequence: presentando source of sequence " + JSON.stringify(source.uri));
                this.presentarSource(channel, source);
            }else{
                this.ejecutarSourceOfSequence(channel);
            }
        }
    },
    "iniciarProgramaciondeCanales": function(p){
        console.log("en iniciarProgramaciondeCanales, " + (new Date()));
        p.duraciondefuentesDeterminada = true;
        for(source of p.sources){
            //console.log("en iniciarProgramaciondeCanales source " + JSON.stringify(source));
            if((source.tipo == "VIDEO") && (!source.duracionDeterminada)){
                p.duraciondefuentesDeterminada = false;
                break;
            }
        }
        if(!p.duraciondefuentesDeterminada)
        {   setTimeout(function(){p.iniciarProgramaciondeCanales(p)}, 1000);
        }else{
            for(var channel of p.channels){
                p.iniciarProgramaciondeCanal(channel);
            }

        }
    },
    "iniciarProgramaciondeCanal": function (channel){
        console.log("iniciarProgramaciondeCanal: " + channel.idChannel);
        channel.intervalos = [];
        channel.queuePautas = [];
        channel.indicedeSecuenciaEjecutandose = -1;
        channel.eventosProgramados = []
        channel.mensajesProgramados = []
        channel.sequence = utils.findById(this.sequences, "idSequence", channel.idSequence);
        channel.sourcesOfSequence = utils.referenciarArreglo(
            this.datosdeOperacion.sources, 
            channel.sequence.sources,
            "idSource"
        );
        for (var i = channel.sourcesOfSequence.length - 1; i >= 0; i--) {
            var source = channel.sourcesOfSequence[i];
            if (source.estado != "VIGENTE") {
              channel.sourcesOfSequence.splice(i, 1);
            }
        }
        let eventsAux = utils.referenciarArreglo(
            this.datosdeOperacion.events,
            channel.events,
            "idEvent"
        );
        //console.log("eventsAux: " + eventsAux);
        channel.events = eventsAux;
        for (var i = 0; i < channel.events.length; i++) {
            for (var j = 0; j < this.datosdeOperacion.sources.length; j++) {
              if (channel.events[i].idSource == this.datosdeOperacion.sources[j].idSource) {
                channel.events[i].source = this.datosdeOperacion.sources[j];
              }
            }
        }
        let pautasAux = utils.referenciarArreglo(
            this.datosdeOperacion.pautas,
            channel.pautas,
            "idPauta"
        );
        channel.pautas = pautasAux;
        for (var i = 0; i < channel.pautas.length; i++) {
            for (var j = 0; j < this.datosdeOperacion.sources.length; j++) {
              if (channel.pautas[i].idSource == this.datosdeOperacion.sources[j].idSource) {
                channel.pautas[i].source = this.datosdeOperacion.sources[j];
              }
            }
        }
        let messagesAux = utils.referenciarArreglo(
            this.datosdeOperacion.messages,
            channel.messages,
            "idMessage"
        );
        channel.messages = messagesAux
        this.ejecutarSourceOfSequence(channel);
        this.generarProgramaciondeEventos(channel);
        this.generarProgramaciondePautas(channel);
        this.generarProgramaciondeMensajes(channel);
    },
    /*function desplegarMensajeProgramado(mensajeProgramado){
        var mp = mensajeProgramado;
        var ms = mensajeProgramado.message;
        var el = document.createElement("div");
        var marquesina = document.createElement("marquee");
        var capa2 = document.getElementById("capa2"); 
        mp.panel = el;
        capa2.appendChild(el);
        el.style.visibility = "hidden";
        el.style.width = ms.width + "%";
        el.style.height = ms.width + "%";
        if(ms.center){
          capa2.style.verticalAlign = "middle";
          capa2.style.textAlign = "center";
        }else{
          el.style.top = ms.atop + "%"
          el.style.left = ms.aleft + "%"
        }
        el.appendChild(marquesina);
        marquesina.innerHTML = ms.texto;
        el.style.visibility = "visible";
        
      }
      function terminarMensajeProgramado(mensajeProgramado){
        var mp = mensajeProgramado;
        var ms = mensajeProgramado.message;
        if(mp.panel != null){
          mp.panel.parentNode.removeChild(mp.panel);
        }  
      }*/
    "generarMensajeProgramado": function(programacion, channel, message, fechaInicioMensaje, fechaFinMensaje){

        let _message = message;
        var ahora = utils.now();
        console.log("en generarMensajeProgramado: " + programacion + ", message: " + _message + ",  " + fechaInicioMensaje + ", " + fechaFinMensaje)
            
        if (fechaInicioMensaje.getTime() > ahora) {
          _message.shotInicio = setTimeout(function(){programacion.desplegarMensajeProgramado(programacion, channel, _message)}, (fechaInicioMensaje.getTime() - ahora));
        }else{ 
            if(fechaFinMensaje.getTime() > ahora) {
                _message.shotInicio = setTimeout(function(){programacion.desplegarMensajeProgramado(programacion, channel, _message)}, 10000);
            }
        }
        if (fechaFinMensaje.getTime() > ahora) {
          _message.shotFinal = setTimeout(function(){programacion.terminarMensajeProgramado(programacion, channel, _message)}, (fechaFinMensaje.getTime() - ahora));
        }
        return _message;
    },
    "desplegarMensajeProgramado": function(programacion, channel, message){
        console.log("En desplegarMensaje: " + message);
        for(targetEncendido of programacion.targetsEncendidos){
            try{
                if(targetEncendido.target.idChannel == channel.idChannel ){
                    let accion = {};
                    accion.idAction = "desplegarMensaje";
                    accion.inicio = channel.inicio;
                    accion.source = source;
                    targetEncendido.ws.send("" + JSON.stringify(accion));
                }
            }catch(error){

            }
        }
        
    },
    "terminarMensajeProgramado": function(channel, message, fechaInicioMensaje, fechaFinMensaje){
        console.log("En terminarMensaje: " + JSON.stringify(message));
        for(targetEncendido of this.targetsEncendidos){
            try{
                if(targetEncendido.target.idChannel == channel.idChannel ){
                    let accion = {};
                    accion.idAction = "desplegarMensaje";
                    accion.inicio = channel.inicio;
                    accion.source = source;
                    targetEncendido.ws.send("" + JSON.stringify(accion));
                }
            }catch(error){

            }
        }
    },
    "generarProgramaciondeMensajes": function(channel) {
        var ahora = utils.now();
        for (var message of channel.messages) {
            console.log("generar mensaje programado: " + JSON.stringify(message));
            var fechaInicioMensaje = utils.decodeTime(message.fechaInicio,message.horaInicio);
            var fechaFinMensaje = utils.decodeTime(message.fechaFin, message.horaFin);
            console.log("en generarProgramaciondeMensajes: " + fechaInicioMensaje + ", " + fechaFinMensaje);
            let p = this;
            if (fechaInicioMensaje.getTime() >= ahora) {
                if (ahora < fechaFinMensaje.getTime()) {
                    channel.mensajesProgramados.push( this.generarMensajeProgramado(
                        p,
                        channel,
                        message,
                        fechaInicioMensaje,
                        fechaFinMensaje
                    ));
                }
            }
            if (fechaInicioMensaje.getTime() < ahora) {
                if (ahora < fechaFinMensaje.getTime()) {
                    channel.mensajesProgramados.push( this.generarMensajeProgramado(
                        p,
                        channel,
                        message,
                        new Date(ahora + 1000),
                        fechaFinMensaje
                    ));
                }
            }
        }
    },
      
    "generarPautaProgramada": function(channel, pauta) {
        let _pauta = {};
        _pauta = pauta
        _pauta.intervalo = setInterval(function() {
            console.log("----------------------programando pauta" + JSON.stringify(pauta));
            channel.queuePautas.push(pauta);
        }, pauta.intervalodeRepeticion * 1000);
        return _pauta
    },
    "generarProgramaciondePautas": function(channel) {
        var ahora = utils.now();
        for (var pauta of channel.pautas) {
          var fechaInicioPauta = utils.decodeTime(pauta.fechaInicio, pauta.horaInicio);
          var fechaFinPauta = utils.decodeTime(pauta.fechaFin, pauta.horaFin);
          if (fechaInicioPauta.getTime() <= ahora) {
            if (ahora < fechaFinPauta.getTime()) {
              console.log("creando intervalo de programación de pautas " + JSON.stringify(pauta));
              channel.intervalos.push(this.generarPautaProgramada(channel, pauta));
            }
          }
        }
    },
    "presentarEvento": function(channel, evento) {
        console.log("presentando evento programado: " + JSON.stringify(evento));
        this.presentarSource(channel, evento.source);
    },
    "generarEventoProgramado": function(programacion, channel, evento, tiempoFaltante) {
        console.log("generando evento programado: " + JSON.stringify(evento));
        let _evento = {}
        _evento = evento;
        _evento.timeOut = setTimeout(function() {
          programacion.presentarEvento(channel, evento);
        }, tiempoFaltante);
        return _evento;
    },
    "generarProgramaciondeEventos": function(channel) {
        for (var evento of channel.events) {
            var fechadeEvento = utils.decodeTime(evento.fechaInicio, evento.horaInicio);
            var fechaActual = utils.now();
            //console.log("fechaActual: " + fechaActual);
            var tiempoFaltante = fechadeEvento.getTime() - fechaActual;
            if (tiempoFaltante > 0) {
                channel.eventosProgramados.push(this.generarEventoProgramado(programacion, channel, evento, tiempoFaltante));
            }
        }
    },
    "generarProgramacion": function(_datos) {
        console.log("dentro de generarProgramacion");
        this.ahorita = utils.now();
        this.inicio = new Date().getTime();
        this.datosdeOperacion = _datos;
        for(var i in _datos){
            this[i] = _datos[i];
        }
        for(source of this.sources){
            source.duracionDeterminada = false;
        }
        this.determinarDuraciondeFuentes(this);
        this.iniciarProgramaciondeCanales(this);
        //generarProgramaciondeEventos(p.events);
        /*for(var channel of this.channels){
            let funcion = this.iniciarProgramaciondeCanal;
            setTimeout(function(){funcion(channel)}, 2000);
        }*/
        /*ejecutarSourceOfSequence();
        generarProgramaciondeEventos(p.events);
        generarProgramaciondePautas(p.pautas);
        generarProgramaciondeMensajes(p.messages);*/
    }
}
module.exports = programacion;

var player1 = null;
var player2 = null;
function mostrarElemento(idElemento) {
  for (var i = 0; i < p.elementosdeVideo.length; i++) {
    if ((p.elementosdeVideo[i].id == idElemento)) {
      p.elementosdeVideo[i].style.visibility = "visible";
      if(p.elementosdeVideo[i].id == "capaYoutube1"){
        document.getElementById("videoYoutube1").style.visibility = "visible";
        document.getElementById("videoYoutube2").style.visibility = "hidden";
      }
      if(p.elementosdeVideo[i].id == "capaYoutube2"){
        document.getElementById("videoYoutube1").style.visibility = "hidden";
        document.getElementById("videoYoutube2").style.visibility = "visible";
      }
    } else {
      p.elementosdeVideo[i].style.visibility = "hidden";
    }
  }
}

function onPlayerReady(event) {
  console.log("event: " + JSON.stringify(event.target));
  console.log("player1: " + JSON.stringify(player1));
  console.log("event.target == player1 : " + (event.target == player1));
  console.log("event.target.id: " + event.target.id);
  var iframe = event.target.getIframe();
  console.log("iframe: " + iframe.outerHTML); 
  if(iframe.id == "videoYoutube1"){
    //mostrarElemento("capaYoutube1");
    player1.playVideo();
  }else{
    //mostrarElemento("capaYoutube2");
    player2.playVideo();
  }
}
function onStateChange(event) {
  console.log("en onStateChange: " + event.data);
  var iframe = event.target.getIframe();
  switch (event.data) {
    case 0:
      ejecutarSourceOfSequence();
      break;
    case 1:
        console.log("src: " + iframe.src);
        if(iframe.id == "videoYoutube1"){
          if(iframe.src.indexOf("" +  p.sourcesOfSequence[p.indicedeSecuenciaEjecutandose].idSource) >= 0 )
          { mostrarElemento("capaYoutube1");
          }
        }else{
          if(iframe.src.indexOf("" +  p.sourcesOfSequence[p.indicedeSecuenciaEjecutandose].idSource) >= 0 )
          { mostrarElemento("capaYoutube2");
          }
        }console.log("en onStateChange ejecutando video");
      break;
  }
}
function videodeYoutubeyaCargado(fuente){
  //alert("en videodeYoutubeyaCargado, source: " + fuente);
  if(player1 != null){
    //alert("player1  url: " + player1.getVideoUrl() + ", " + fuente)
    if(player1.getVideoUrl().toLowerCase().indexOf(fuente.toLowerCase()) >= 0){
      //alert("se detecto el video en player1")
      return true;
    }
  }
  if(player2 != null){
    //alert("player2  url: " + player2.getVideoUrl() + ", " + fuente)
    if(player2.getVideoUrl().toLowerCase().indexOf(fuente.toLowerCase()) >= 0){
      //alert("se detecto el video en player2")
      return true;
    }
  }
  return false;
}
function reproducirVideodeYoutubeyaCargado(fuente){
  console.log("video " + fuente + "cargado")
  if(player1 != null){
    console.log("player 1 marca 1 " + player1.getVideoUrl())
    if(player1.getVideoUrl().toLowerCase().indexOf(fuente.toLowerCase()) >= 0){
      console.log("player 1 marca 2")
      player1.pauseVideo();
      console.log("player 1 marca 3")
      player1.seekTo(0);
      player1.playVideo()
      console.log("player 1 marca 4")
      mostrarElemento("capaYoutube1");
      console.log("player 1 marca 5")
      return
    }
    
  }
  if(player2 != null){
    console.log("player 2 marca 1")
    if(player2.getVideoUrl().toLowerCase().indexOf(fuente.toLowerCase()) >= 0){
      console.log("player 2 marca 2")
      player2.pauseVideo();
      console.log("player 2 marca 3")
      player2.seekTo(0);
      console.log("player 2 marca 4")
      player2.playVideo()
      console.log("player 2 marca 5")
      mostrarElemento("capaYoutube2");
      console.log("player 2 marca 6")
      return;  
    }
    
  }
}
function playerdeYoutubeReproduciendo(){
  if(player1 != null){
    console.log("player1.getIframe(): " + player1.getIframe().outerHTML)
    console.log("document.getElementById('capaYoutube1').style.visibility: " + document.getElementById("capaYoutube1").style.visibility)
    if(document.getElementById("capaYoutube1").style.visibility == "visible"){
      return player1;
    }
  }
  if(player2 != null){
    console.log("player2.getIframe(): " + player1.getIframe().outerHTML)
    console.log("document.getElementById('capaYoutube2').style.visibility: " + document.getElementById("capaYoutube2").style.visibility)
    if(document.getElementById("capaYoutube2").style.visibility == "visible"){
      return player2;
    }
  }
  return null;
}
function presentarVideodeYoutube(source) {
  console.log("en presentarVideodeYoutube: " + JSON.stringify(source));
  var fuente = "" + source.uri;
  var videoCargado = "";
  if (fuente.indexOf("https://www.youtube.com/embed/") == 0) {
    fuente = fuente.substring(30);
  }
  if (fuente.indexOf("https://www.youtube.com/") == 0) {
    fuente = fuente.substring(24);
  }
  //alert("fuente: " + fuente);
  if(videodeYoutubeyaCargado(fuente)){
    console.log("video de youtube ya cargado");
    reproducirVideodeYoutubeyaCargado(fuente);
  }else{
    console.log("video de youtube no cargado cargado");
    console.log("apideYoutubeCargada: " + apideYoutubeCargada)
    if(apideYoutubeCargada){
      var playerReproduciendo = playerdeYoutubeReproduciendo();
      if(playerReproduciendo == null){
        if(player1 == null){
          player1 = new YT.Player("videoYoutube1", 
          { videoId: fuente,
            events:{
              onReady: onPlayerReady,
              onStateChange: onStateChange
            }
          });
        }else{
          if(player2 == null){
            player2 = new YT.Player("videoYoutube1", 
            { videoId: fuente,
              events:{
                onReady: onPlayerReady,
                onStateChange: onStateChange
              }
            });
          }else{
            player1.loadVideoById({videoId: fuente});
          } 
        }
      }else{
        if(playerReproduciendo == player1){
          console.log("player1 reproduciendo")
          if(player2 == null){
            player2 = new YT.Player("videoYoutube2", 
            { videoId: fuente,
              events:{
                onReady: onPlayerReady,
                onStateChange: onStateChange
              }
            });
          }else{
            player2.loadVideoById({videoId: fuente,
            events:{
              onReady: onPlayerReady,
              onStateChange: onStateChange
            }});
          }
        }else{
          console.log("player2 reproduciendo")
          if(player1 == null){
            console.log("reproduciendo video con el player1 existente" );
            player1 = new YT.Player("videoYoutube1", 
            { videoId: fuente,
              events:{
                onReady: onPlayerReady,
                onStateChange: onStateChange
              }
            });
          }else{
            console.log("reproduciendo video en player 1 con loadVideo" );
            player1.loadVideoById({videoId: fuente,
            events:{
              onReady: onPlayerReady,
              onStateChange: onStateChange
            }});
          }
        }
      }
    }else{
      p.youtubeQueue.push(source);
    }
  }
}
function onCanPlayVideo(event) {
  console.log("onCanPlayVideo on target " + event.target.outerHTML);
  let ahorita = now().valueOf() * 1.0;
  console.log("ahorita: " + ahorita);
  let inicio =  parseFloat(event.target.getAttribute("inicio"));
  if(inicio == 0){
    inicio = (ahorita - inicio) / 1000.0;
  }else{
    inicio = 0;
  }
  console.log("id element: " + event.target.id);
  if(event.target.id == "videoSecuencia1"){
    //player1.seekTo(inicio);
    //console.log("player1: " + JSON.stringify(player1));
  }
  if(event.target.id == "videoSecuencia2"){
    //player2.seekTo(inicio);
    //console.log("player2: " + JSON.stringify(player2));
  }
  
  //event.target.seekTo(inicio);
  console.log("inicio: " + inicio);

  event.target.play();
  mostrarElemento(event.target.id);
}
function presentarVideo(source, inicio) {
  var elemento = null;
  var elementoSource = null;
  try {
    player.pause();
  } catch (error) {}
  fuente = "videos/" + source.uri;
  if (document.getElementById("videoSecuencia1").style.visibility == "hidden") {
    elemento = document.getElementById("videoSecuencia1");
    elementoSource = document.getElementById("sourceSecuencia1");
  } else {
    elemento = document.getElementById("videoSecuencia2");
    elementoSource = document.getElementById("sourceSecuencia2");
  }
  elementoSource.src = fuente;
  try{
    if(inicio){
      let ahorita = now().valueOf();
      inicio = (ahorita - inicio) / 1000.0;
      console.log(">>>>>inicio: " + inicio);
      elemento.setAttribute("inicio", "" + inicio);
      elemento.currentTime = inicio;
    }else{
      elemento.setAttribute("inicio", "0");
    }
  }catch(error){

  }
  elemento.addEventListener("canplay", onCanPlayVideo);
  //elemento.addEventListener("ended", ejecutarSourceOfSequence);
  elemento.load();
}

function presentarSource(source) {
  console.log("en presentarSource: " + JSON.stringify(source));
  switch (source.tipo) {
    case "VIDEO":
      presentarVideo(source);
      break;
    case "YOUTUBE":
      presentarVideodeYoutube(source);
      break;
  }
}
function presentarSourceActual(source, inicio) {
  console.log("en presentarSourceActual: " + JSON.stringify(source));
  console.log("en presentarSourceActual, inicio: " + inicio);
  switch (source.tipo) {
    case "VIDEO":
      presentarVideo(source, inicio);
      break;
    case "YOUTUBE":
      presentarVideodeYoutube(source);
      break;
  }
}

function Programacion() {
  return {
    elementosdeVideo: [],
    youtubeQueue: [],
    eventosProgramados: [],
    mensajesProgramados: [],
    elVideoSecuencia: null,
    elSourceSecuencia: null,
    programaPresentandose: "inicio",
    videoSecuenciaSeleccionada: 1,
    videoPautasSeleccionada: 1,
    indicedeSecuenciaEjecutandose: -1,
    queuePautas: [],
    timeOuts: [],
    paneles: [],
    inicio: null,
    eventosdePanel: [],
    datosdeOperacion: null,
    target: null,
    channel: null,
    sequence: null,
    events: null,
    pautas: null,
    messages: null,
    sourcesOfSequence: null
  };
}
var p = null;
function ejecutarSourceOfSequence() {
  console.log("ejecutando ejecutarSourceOfSequence");
  if (p.queuePautas.length > 0) {
    console.log("no hay pautas en cola");
    var pauta = p.queuePautas.shift();
    presentarSource(pauta.source);
  } else {
    if (p.indicedeSecuenciaEjecutandose == p.sourcesOfSequence.length - 1) {
      p.indicedeSecuenciaEjecutandose = 0;
    } else {
      p.indicedeSecuenciaEjecutandose++;
    }
    var source = p.sourcesOfSequence[p.indicedeSecuenciaEjecutandose];
    presentarSource(source);
  }
}
function presentarEvento(evento) {
  console.log("en presentar evento: " + JSON.stringify(evento));
  presentarSource(evento.source);
}
function EventoProgramado(evento, tiempoFaltante) {
  this.evento = evento;
  this.timeOut = setTimeout(function() {
    presentarEvento(evento);
  }, tiempoFaltante);
}
function generarProgramaciondeEventos(eventos) {
  var evento;
  for (var i = 0; i < p.events.length; i++) {
    evento = p.events[i];
    var fechadeEvento = decodeTime(evento.fechaInicio, evento.horaInicio);
    var fechaActual = now();
    var tiempoFaltante = fechadeEvento.getTime() - fechaActual.getTime();
    if (tiempoFaltante > 0) {
      p.eventosProgramados.push(new EventoProgramado(evento, tiempoFaltante));
    }
  }
}
function terminarPresentaciondePauta() {
  //alert("terminando presentacion de pauta");
  presentandoPauta = false;
  if (!(coladePautas.length > 0)) {
    var elSecuencia = document.getElementById("sourceSecuencia");
    var elVideoSecuencia = document.getElementById("videoSecuencia");
    var elPautaSource = document.getElementById("sourcePauta");
    var elVideoPauta = document.getElementById("videoPautas");
    elVideoPauta.pause();
    elVideoPauta.style.visibility = "hidden";
    elVideoSecuencia.style.visibility = "visible";
    elVideoSecuencia.play();
  }
  ejecutordePautas();
}
function PautaProgramada(pauta) {
  this.pauta = pauta;
  this.intervalo = setInterval(function() {
    p.queuePautas.push(pauta);
  }, this.pauta.intervalodeRepeticion * 1000);
}
function generarProgramaciondePautas() {
  var ahora = now();
  var pauta;
  for (var i = 0; i < p.pautas.length; i++) {
    pauta = p.pautas[i];
    var fechaInicioPauta = decodeTime(pauta.fechaInicio, pauta.horaInicio);
    var fechaFinPauta = decodeTime(pauta.fechaFin, pauta.horaFin);
    p.intervalos = [];
    if (fechaInicioPauta.getTime() <= ahora.getTime()) {
      if (ahora.getTime() < fechaFinPauta.getTime()) {
        console.log(
          "creando intervalo de programación de pautas " + JSON.stringify(pauta)
        );
        p.intervalos.push(new PautaProgramada(pauta));
      }
    }
  }
}
function desplegarMensajeProgramado(mensajeProgramado){
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
}
function MensajeProgramado(message, fechaInicioMensaje, fechaFinMensaje){
  this.message = message;
  var ahora = now();
  this.panel = null;
  if (fechaInicioMensaje.getTime() > ahora.getTime()) {
    this.shotInicio = setTimeout(function(){desplegarMensajeProgramado(this)}, (fechaInicioMensaje.getTime() - ahora.getTime()));
  }
  if (fechaInicioMensaje.getTime() > ahora.getTime()) {
    this.shotFinal = setTimeout(function(){terminarMensajeProgramado(this)}, (fechaFinMensaje.getTime() - ahora.getTime()));
  }
}
function generarProgramaciondeMensajes(messages) {
  var ahora = now();
  for (var i = 0; i < p.messages.length; i++) {
    var message = p.messages[i];
    p.mensajesProgramados.push(new MensajeProgramado(message));
    //alert("message: " + JSON.stringify(message));
    var fechaInicioMensaje = decodeTime(message.fechaInicio,message.horaInicio);
    var fechaFinMensaje = decodeTime(message.fechaFin, message.horaFin);
    if (fechaInicioMensaje.getTime() >= ahora.getTime()) {
      if (ahora.getTime() < fechaFinMensaje.getTime()) {
        var mensajeProgramado = new MensajeProgramado(
          message,
          fechaInicioMensaje,
          fechaFinMensaje
        );
      }
    }
  }
}
function manejarEvento() {}
function visordeEventos() {}

function generarProgramacion(_datos) {
  console.log("dentro de generarProgramacion");
  var fechaActual = now();
  p = Programacion();
  p.elementosdeVideo.push(document.getElementById("videoSecuencia1"));
  p.elementosdeVideo.push(document.getElementById("videoSecuencia2"));
  p.elementosdeVideo.push(document.getElementById("capaYoutube1"));
  p.elementosdeVideo.push(document.getElementById("capaYoutube2"));
  p.elSourceSecuencia1 = document.getElementById("sourceSecuencia1");
  p.elSourceSecuencia2 = document.getElementById("sourceSecuencia2");
  p.elVideoYoutube1 = document.getElementById("videoYoutube1");
  p.elVideoYoutube2 = document.getElementById("videoYoutube2");
  p.inicio = new Date().getTime();
  p.datosdeOperacion = _datos;
  p.target = findById(p.datosdeOperacion.targets, "idTarget", config.idTarget);
  p.channel = findById(
    p.datosdeOperacion.channels,
    "idChannel",
    p.target.idChannel
  );
  p.sequence = findById(
    p.datosdeOperacion.sequences,
    "idSequence",
    p.channel.idSequence
  );
  p.sourcesOfSequence = referenciarArreglo(
    p.datosdeOperacion.sources,
    p.sequence.sources,
    "idSource"
  );
  for (var i = p.sourcesOfSequence.length - 1; i >= 0; i--) {
    var source = p.sourcesOfSequence[i];
    if (source.estado != "VIGENTE") {
      p.sourcesOfSequence.splice(i, 1);
    }
  }
  p.events = referenciarArreglo(
    p.datosdeOperacion.events,
    p.channel.events,
    "idEvent"
  );
  for (var i = 0; i < p.events.length; i++) {
    for (var j = 0; j < p.datosdeOperacion.sources.length; j++) {
      if (p.events[i].idSource == p.datosdeOperacion.sources[j].idSource) {
        p.events[i].source = p.datosdeOperacion.sources[j];
      }
    }
  }
  p.pautas = referenciarArreglo(
    p.datosdeOperacion.pautas,
    p.channel.pautas,
    "idPauta"
  );
  for (var i = 0; i < p.pautas.length; i++) {
    for (var j = 0; j < p.datosdeOperacion.sources.length; j++) {
      if (p.pautas[i].idSource == p.datosdeOperacion.sources[j].idSource) {
        p.pautas[i].source = p.datosdeOperacion.sources[j];
      }
    }
  }
  p.messages = referenciarArreglo(
    p.datosdeOperacion.messages,
    p.channel.messages,
    "idMessage"
  );
  console.log("Objeto programacion inicializado");
  /*ejecutarSourceOfSequence();
  generarProgramaciondeEventos(p.events);
  generarProgramaciondePautas(p.pautas);
  generarProgramaciondeMensajes(p.messages);*/
}
var  socket = null
        
function procesarMensaje(socket, mensaje){
  console.log("procesando mensaje: " + mensaje);
  mensaje = JSON.parse(mensaje);
  console.log("mensaje: " + mensaje);
  switch(mensaje.idAction){
      case "enviarTarget":
          console.log("enviando target");
          socket.send('{"idAction": "registrarTarget", "idTarget": 1, "idChannel":1, "idConnection":' + mensaje.idConnection + '}');
          break;
      case "presentarVideo":
          console.log("por presentar video");
          presentarSource(mensaje.source);
        break;
      case "presentarSourceActual":
          console.log("por presentar video actual");
          presentarSourceActual(mensaje.source, mensaje.inicio);
        break;
  }
}
function iniciarTarget(){
  console.log("iniciando");
  socket = new WebSocket("ws://192.168.1.65:8080");
  socket.onopen = function(e) {
      console.log("[open] Connection established");
      console.log("Sending to server");
  };
  
  socket.onmessage = function(event) {
      procesarMensaje(socket, event.data);
  };

  socket.onclose = function(event) {
      if (event.wasClean) {
          console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
      } else {
          // e.g. server process killed or network down
          // event.code is usually 1006 in this case
          console.log('[close] Connection died');
      }
  };

  socket.onerror = function(error) {
      console.log(`[error] ${error.message}`);
  };
}

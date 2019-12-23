function decodeTime(fecha, hora){
    var dateRegexp = /^(\d{4})\-(\d\d)\-(\d\d)$/gi;
    var date = new Date();
    if(fecha.match(dateRegexp))
    { date.setFullYear(parseInt(RegExp.$1));
      date.setMonth(parseInt(RegExp.$2) - 1);
      date.setDate(parseInt(RegExp.$3));
    }
    var timeRegexp = /(\d\d)\:(\d\d)\:(\d\d)/gi;
    if(hora.match(timeRegexp))
    { date.setHours(parseInt(RegExp.$1));
      date.setMinutes(parseInt(RegExp.$2));
      date.setSeconds(parseInt(RegExp.$3));
    }
    return date;
}
function onYouTubeIframeAPIReady() {
  //alert("en onYouTubeIframeAPIReady");
    top.apideYoutubeCargada = true;
    try{
      //alert("p: " + JSON.stringify( p.youtubeQueue));
      if(p.youtubeQueue.length > 0){
        var source = p.youtubeQueue.shift();
        presentarVideodeYoutube(source);
      }
    }catch(error){
    }
}
function findById(coleccion, identificador, id){
    for(var i = 0; i < coleccion.length; i++){
      if(coleccion[i][identificador] == id){
        return coleccion[i];
      }
    }
    return null;
}
function now(){
    var fecha = new Date((new Date()).getTime() + (config.desfaceHora * 3600000));
    return fecha;
}
function referenciarArreglo(arregloOrigen, arregloaReferenciar, identificador){
    var arreglo = [];
    for(var i = 0; i < arregloaReferenciar.length; i++){
      for(var j = 0; j < arregloOrigen.length; j++){
        if(arregloaReferenciar[i][identificador] == arregloOrigen[j][identificador]){
          arreglo.push(arregloOrigen[j]);
        }
      }
    }
    return arreglo;
}
function abrirVisordeArchivos(){
    //alert("abriendo visor de archivos");
    var ele = document.getElementById("fileName");
    ele.value = "";
    document.getElementById("fileName").click();
}
function Storage() {

    /**
     * Clear Storage
     */
    this.clear = () => {
        localStorage.clear();
    }

    /**
     * Load from Storage.
     * @param {string} key
     * @returns {JSON}
     */
    this.load = (key) => {
        //alert("en storage . load");
        var data = localStorage.getItem(key);
        return JSON.parse(data);
    }

    /**
     * Save data into Storage.
     * @param key
     * @param data
     */
    this.save = (key, data) => {
        var object = JSON.stringify(data);
        localStorage.setItem(key, object);
    }

    /**
     * Remove an item from local storage.
     * @param key
     */
    this.remove = (key) => {
        localStorage.removeItem(key);
    }

}
function obtenerPathaRepositorio(){

}
let storage = new Storage();
$().ready(()=>{
})
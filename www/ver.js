document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);
}

function onFileSystemSuccess(fileSystem) {
    // aquí se señala en qué carpeta buscas, si la encuentra, sigue
    fileSystem.root.getDirectory("proyecto", {create: false, exclusive: false}, getDirSuccess, fail);
}

function getDirSuccess(dirEntry) {
    var directoryReader = dirEntry.createReader();

    // lista todo en el directorio
    directoryReader.readEntries(readerSuccess, fail);
}

function readerSuccess(entries) {
    var i;
    var lista = document.getElementById("archivos");

    for (i=0; i<entries.length; i++) {
        lista.innerHTML +=
        "<div class=\"lista\" id=\""+i+"\" onclick=clickMostrar("+i+");>" + 
            "<img src=\"img/repoop.png\"> " + entries[i].name + 
        "</div><br>";
    }
}

var toques = 0;
var ultimaFila;
// valida que se haga doble tap en un div antes de mostrar el contenido del archivo
function clickMostrar(fila){
    if(ultimaFila == null){
        ultimaFila = fila;
    }

    if(ultimaFila == fila){
        toques++;
        if(toques == 2){
            alert("Se hicieron dos toques en el mismo div");
            // mostrarArchivo();
        }
    } else {
        toques = 0;
    }
    ultimaFila = fila;
}

function mostrarArchivo(){
    var contenido = document.getElementById('contenido');
    var reader = new FileReader();
}

function fail() {
    alert("No se pudo shavo");
}
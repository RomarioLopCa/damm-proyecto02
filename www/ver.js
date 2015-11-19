document.addEventListener("deviceready", onDeviceReady, false);

var fileSystem = null;

function onDeviceReady() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);
}

function onFileSystemSuccess(sistemaArchivos) {
    fileSystem = sistemaArchivos;
    // aquí se señala en qué carpeta buscas, si la encuentra, sigue
    fileSystem.root.getDirectory("proyecto", {create: false, exclusive: false}, getDirSuccess, fail);
}

function getDirSuccess(dirEntry) {
    var directoryReader = dirEntry.createReader();

    // lista todo en el directorio
    directoryReader.readEntries(readerSuccess, fail);
}

var divsTotales;
function readerSuccess(entries) {
    var i;
    divsTotales = entries.length;
    var lista = document.getElementById("archivos");

    for (i = 0; i < entries.length; i++) {
        lista.innerHTML +=
            "<div>" +
            "<img src='img/repoop.png' class='pull-left' alt='" + entries[i].name + "'>" + entries[i].name.slice(0, -4) +
            "<span onclick='borraArchivo(this)'><img src='img/repoop.png' alt='Eliminar'></span>" +
            "</div>";
    }
}

function borraArchivo(span) {
    var titulo = span.previousElementSibling.alt;
    if (titulo != "") {
        if (confirm("En realidad desea eliminar la nota " + titulo + "?")) {
            span.parentNode.style.display = "none";
            deleteFile(titulo);
        }
    } else {
        alert("No se está seleccionando un archivo para borrar.");
    }
}

function deleteFile(filename) {
    var direccionArchivo = "proyecto/" + filename;
    alert(direccionArchivo);
    fileSystem.root.getFile(direccionArchivo, {create: false}, function (fileEntry) {
        fileEntry.remove();
    });
}

function mostrarArchivo() {
    var contenido = document.getElementById('contenido');
    var reader = new FileReader();
}

function fail() {
    alert("No se pudo shavo");
}
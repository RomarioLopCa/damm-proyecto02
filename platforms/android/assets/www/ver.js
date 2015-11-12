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
        "<div class=\"lista\" id=\""+i+"\">" + 
            "<img src=\"img/repoop.png\"> " + entries[i].name + 
        "</div><br>";
    }
}

function fail() {
    alert("No se pudo shavo");
}
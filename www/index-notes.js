document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);
}

function onFileSystemSuccess(sistemaArchivos) {
    fileSystem = sistemaArchivos;
    fileSystem.root.getDirectory(pathName, {create: false, exclusive: false}, getDirSuccess, fail);
}

function showOperations() {
    var allNotesOperations = $('.operations');
    allNotesOperations.toggle("slow");
}

function getDirSuccess(dirEntry) {
    var directoryReader = dirEntry.createReader();

    directoryReader.readEntries(readerSuccess, fail);
}

function readerSuccess(entries) {
    var i;
    var notes = $('#allNotes');
   notes.append("<ul id='lista' data-role='listview' data-icon='false' data-inset='true' data-filter='true' data-filter-placeholder='Buscar nota...'></ul>");
    notes.trigger("create");

    var data = "";
    for (i = 0; i < entries.length; i++) {
        data +=
                "<li>" +
                "<a href='#'>" + entries[i].name.slice(0, -4) +
                    "<span class='operations ul-li-aside ui-btn-right'>" +
                        "<img src='img/noteedit.png' alt='"+entries[i].name+"' onclick='editaArchivo(this)'>" +
                        "<img src='img/notedelete.png' alt='"+entries[i].name+"' onclick='borraArchivo(this)'>" +
                    "</span>" +
                "</a>" +
                "</li>";
    }
    $("#lista").append(data);

    $("#lista").listview("refresh");

}

function borraArchivo(selectedNote) {

    var fileName = selectedNote.alt
    var row = selectedNote.parentNode.parentNode;

    //Preguntamos si quiere eliminar el archivo
    if (confirm("En realidad desea eliminar la nota " + fileName + "?")) {
        //Escondemos la fila de la tabla para no refrescar toda la pagina
        row.style.display = "none";

        var file = pathName + "/" + fileName;
        fileSystem.root.getFile(file, {create: false}, function (fileEntry) {
            fileEntry.remove();
        });
    }
}

function editaArchivo(selectedNote){

    var filePath = pathName + "/" + selectedNote.alt;

    fileSystem.root.getFile(filePath, {}, function(fileEntry) {

        // Get a File object representing the file,
        // then use FileReader to read its contents.
        fileEntry.file(function(file) {
            var reader = new FileReader();

            reader.onloadend = function(e) {
                editNote(selectedNote.alt.slice(0,-4), this.result, true);
            };

            reader.readAsText(file);
        }, errorHandler);

    }, errorHandler);
}


function fail() {
    alert("Error api.");
}

// A simple error handler to be used throughout this demo.
function errorHandler(error) {
    var message = '';
    switch (error.code) {
        case FileError.SECURITY_ERR:
            message = 'Security Error';
            break;
        case FileError.NOT_FOUND_ERR:
            message = 'Not Found Error';
            break;
        case FileError.QUOTA_EXCEEDED_ERR:
            message = 'Quota Exceeded Error';
            break;
        case FileError.INVALID_MODIFICATION_ERR:
            message = 'Invalid Modification Error';
            break;
        case FileError.INVALID_STATE_ERR:
            message = 'Invalid State Error';
            break;
        default:
            message = 'Unknown Error';
            break;
    }
    alert(message);
}
document.addEventListener("deviceready", deviceReady, false);
function deviceReady() {

    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    if (window.requestFileSystem) {
        initFileSystem();
    }

    if (window.localStorage.getItem("editable")) {
        document.getElementById("note_title").value = window.localStorage.getItem("title");
        document.getElementById("note_title").setAttribute('disabled', 'true');
        document.getElementById("note_content").value = window.localStorage.getItem("content");
        document.getElementById("form-title").innerText = 'Editar nota';

        //Cambiar la imagen para que regrese al index cuando la nota esta en edicion
    }
}

function initFileSystem() {
    // Request a file system with the new size.
    window.requestFileSystem(window.PERSISTENT, 1024, function (fs) {
        fileSystem = fs;
    }, errorHandler);
}

function writeFile() {
    var title = document.getElementById("note_title").value;
    var content = document.getElementById("note_content").value;

    if (title != "" && content != "") {
        saveFile(title + ".txt", content);
    } else {
        alert("Falta llenar datos para poder guardar");
    }
}

function saveFile(filename, content) {

    var filePath = pathName + "/" + filename
    fileSystem.root.getFile(filePath, {create: true}, function (fileEntry) {

        fileEntry.createWriter(function (fileWriter) {
            var fileParts = [content];
            var contentBlob = new Blob(fileParts, {type: 'text/html'});
            fileWriter.write(contentBlob);

            fileWriter.onwriteend = function (e) {
                //messageBox.innerHTML = 'File saved!';
                if (window.localStorage.getItem("editable")) {
                    alert('Nota actualizada con exito');
                } else {
                    alert('Nota agregada con exito');
                }
                window.location.href = 'index.html#index';
            };

            fileWriter.onerror = function (e) {
                console.log('Write error: ' + e.toString());
                alert('An error occurred and your file could not be saved!');
            };

        }, errorHandler);

    }, errorHandler);

}

function discardNote() {
    if(!window.localStorage.getItem("editable")){
        if (confirm('¿Estás seguro desea descartar la nota?')) {
            window.location.href = 'index.html#index';
        }
    }else {
        window.location.href = 'index.html#index';
    }
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
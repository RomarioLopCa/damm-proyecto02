var pathName = "DAMM";
var fileSystem = null;

function editNote(titulo, contenido, edit) {
    window.localStorage.setItem("title", titulo);
    window.localStorage.setItem("content", contenido);
    window.localStorage.setItem("editable", edit);
    window.location.href = 'form.html';
}

function newNote() {
    localStorage.removeItem("title");
    localStorage.removeItem("content");
    localStorage.removeItem("editable");
    window.location.href = 'form.html';
}
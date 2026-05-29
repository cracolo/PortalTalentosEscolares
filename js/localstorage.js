function guardarname(){
    var nombre = document.getElementById("nombre").value;
    localStorage.setItem("nombre", nombre);
    alert("Nombre guardado en correctamente");
}

function mostrarname(){
    var nombre = localStorage.getItem("nombre");
    document.getElementById("resultado").innerHTML = "Nombre: " + nombre;
}

function borrarname(){
    localStorage.removeItem("nombre");
    document.getElementById("resultado").innerHTML = "Nombre eliminado";

}
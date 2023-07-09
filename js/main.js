console.log("Hola desde Js");

const pedidoInput = document.getElementById("pedidoInput");
const lista = document.getElementById("lista");
const personaInput =document.getElementById("name")
const telefonoInput=document.getElementById("phone")
const direccionInput=document.getElementById("adress")


let tareas = localStorage.getItem("tareas") ? JSON.parse(localStorage.getItem("tareas")) : [];
let nombres = localStorage.getItem("nombres") ? JSON.parse(localStorage.getItem("nombres")) : [];
let direcciones = localStorage.getItem("direcciones") ? JSON.parse(localStorage.getItem("direcciones")) : [];
let telefonos = localStorage.getItem("telefonos") ? JSON.parse(localStorage.getItem("telefonos")) : [];

let editando = false;
let nombre_previo = "";
 //personas = [ persona = {nombre : "", edad: ""}]
 //Esta condicional es igual a la condicional expuesta en tareas 
// if(localStorage.getItem("tareas")){
//     let tareas = JSON.parse(localStorage.getItem("tareas"))
//  }else{
//     let tareas = [];
//  }

//localStorage.getItem(nombre) - trae los elementos guardados en el localStorage 
//- te pide el nombre del elemento
//localStorage.setItem(nombre,valor) - guarda elementos en el localStorage
//--nombre con el cual lo vas a guardar y el valor que vas a guardar.
//localStorage.clear -- Limpiar o vaciar lo que contenga el localStorage
//solamente puedes guardar Strings 




function agregarTarea() {
   if(editando){
        tareas = tareas.map(tnueva => tnueva === nombre_previo ? pedidoInput.value : tnueva);
        localStorage.setItem("tareas", JSON.stringify(tareas));
        editando = false;
   }else{
    const tarea = pedidoInput.value;
    tareas.push(tarea)
    localStorage.setItem("tareas",JSON.stringify(tareas));
   }
    pedidoInput.value = "";
    actualizarLista();
}

function actualizarLista(){
    lista.innerHTML = "";
    tareas.forEach(tarea => {
        const li = document.createElement("li");
        li.textContent = tarea;
        li.classList.add("list-group-item");

        const btnEliminar = document.createElement("button");
        const iconoEliminar = document.createElement("i");
        iconoEliminar.classList.add("fa", "fa-trash");
        btnEliminar.appendChild(iconoEliminar);
        btnEliminar.classList.add("btn", "btn-danger", "float-right");
        btnEliminar.addEventListener("click", () => deleteTarea(tarea));
        li.appendChild(btnEliminar);

        const btnEditar = document.createElement("button");
         const iconEdit = document.createElement("i");
         iconEdit.classList.add("fa", "fa-edit");
         btnEditar.appendChild(iconEdit);
         btnEditar.classList.add("btn", "btn-warning", "float-right");
         btnEditar.addEventListener("click", () => editarTarea(tarea));
         li.appendChild(btnEditar);

         lista.appendChild(li);
    });
}

function deleteTarea(tarea){
    console.log(tarea);
    tareas = tareas.filter(elemento => elemento !== tarea);
    localStorage.setItem("tareas",JSON.stringify(tareas))
    actualizarLista();
}

function editarTarea(tarea){

    editando=true
    nombre_previo=tarea
    pedidoInput.value = tarea;
  
}


function limpiarStorage(){
    localStorage.clear();
    tareas = [];
    actualizarLista();
}

function enviarFormulario(){

    const nombre = personaInput.value;
    nombres.push(nombre);
    localStorage.setItem("nombres",JSON.stringify(nombres));
    
    const telefono = telefonoInput.value;
    telefonos.push(telefono);
    localStorage.setItem("telefonos",JSON.stringify(telefonos));
   
    const direccion = direccionInput.value;
    direcciones.push(direccion);
    localStorage.setItem("direcciones",JSON.stringify(direcciones));
    
    
    personaInput.value ="";
    telefonoInput.value="";
    direccionInput.value="";


    const formulario=document.getElementById("contactForm");
    const mensajeConfirmacion=document.createElement("p");
    mensajeConfirmacion.textContent="Mensaje enviado";
    formulario.appendChild(mensajeConfirmacion);
}

actualizarLista()
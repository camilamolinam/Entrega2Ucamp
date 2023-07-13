console.log("Hola desde Js");

const pedidoInput = document.getElementById("pedidoInput");
//const lista = document.getElementById("lista");
const tablalista = document.getElementById("tablalista");

const datosInput = document.getElementById("name")
const cantidadInput = document.getElementById("cantidad")



let tareas = localStorage.getItem("tareas") ? JSON.parse(localStorage.getItem("tareas")) : [];
//let nombres = localStorage.getItem("nombres") ? JSON.parse(localStorage.getItem("nombres")) : [];
//let direcciones = localStorage.getItem("direcciones") ? JSON.parse(localStorage.getItem("direcciones")) : [];
//let telefonos = localStorage.getItem("telefonos") ? JSON.parse(localStorage.getItem("telefonos")) : [];

let editando = false;
let pedido_previo = "";
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
    if (editando) {
        console.log(pedido_previo);
        tareas = tareas.map(pnuevo => {
            if (pnuevo.pedido === pedido_previo) {
                pnuevo.pedido = pedidoInput.value
                pnuevo.cantidad = cantidadInput.value
                pnuevo.datos = datosInput.value

            }
            return pnuevo;
        });

        localStorage.setItem("tareas", JSON.stringify(tareas));
        editando = false;
    } else {
        const tarea = { pedido: pedidoInput.value, cantidad: cantidadInput.value, datos: datosInput.value  };
        tareas.push(tarea)
        localStorage.setItem("tareas", JSON.stringify(tareas));
    }
    pedidoInput.value = "";
    cantidadInput.value="";
    datosInput.value="";
    actualizarLista();
}

function actualizarLista() {
    //lista.innerHTML = "";
    tablalista.innerHTML = "";
    tareas.forEach(tarea => {
        // const li = document.createElement("li");
        const tr = document.createElement("tr");
        const tdPedido = document.createElement("td");
        const tdCantidad = document.createElement("td");
        const tdDatos = document.createElement("td");

        tdPedido.textContent = tarea.pedido;
        tr.appendChild(tdPedido)
        tdCantidad.textContent = tarea.cantidad;
        tr.appendChild(tdCantidad)
        tdDatos.textContent = tarea.datos;
        tr.appendChild(tdDatos)
        //li.classList.add("list-group-item");

        const btnEliminar = document.createElement("button");
        const iconoEliminar = document.createElement("i");
        iconoEliminar.classList.add("fa", "fa-trash");
        btnEliminar.appendChild(iconoEliminar);
        btnEliminar.classList.add("btn", "btn-danger", "float-right");
        btnEliminar.addEventListener("click", () => deleteTarea(tarea.pedido));
        tr.appendChild(btnEliminar);

        const btnEditar = document.createElement("button");
        const iconEdit = document.createElement("i");
        iconEdit.classList.add("fa", "fa-edit");
        btnEditar.appendChild(iconEdit);
        btnEditar.classList.add("btn", "btn-warning", "float-right");
        btnEditar.addEventListener("click", () => editarTarea(tarea));
        tr.appendChild(btnEditar);

        tablalista.appendChild(tr);
    });
}

function deleteTarea(tarea) {
    tareas = tareas.filter(elemento => elemento.pedido !== tarea);
    localStorage.setItem("tareas", JSON.stringify(tareas))
    actualizarLista();
}

function editarTarea(tarea) {
    editando = true
    pedido_previo = tarea.pedido;
    pedidoInput.value = tarea.pedido;
    cantidadInput.value = tarea.cantidad;
    datosInput.value = tarea.datos;
    console.log(pedido_previo);
}


function limpiarStorage() {
    localStorage.clear();
    tareas = [];
    actualizarLista();
}

/*
function enviarFormulario() {

    const nombre = personaInput.value;
    nombres.push(nombre);
    localStorage.setItem("nombres", JSON.stringify(nombres));

    const telefono = telefonoInput.value;
    telefonos.push(telefono);
    localStorage.setItem("telefonos", JSON.stringify(telefonos));

    const direccion = direccionInput.value;
    direcciones.push(direccion);
    localStorage.setItem("direcciones", JSON.stringify(direcciones));


    personaInput.value = "";
    telefonoInput.value = "";
    direccionInput.value = "";


    const formulario = document.getElementById("contactForm");
    const mensajeConfirmacion = document.createElement("p");
    mensajeConfirmacion.textContent = "Mensaje enviado";
    formulario.appendChild(mensajeConfirmacion);
}*/

actualizarLista()
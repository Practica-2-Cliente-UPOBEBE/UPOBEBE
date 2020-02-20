// Carga dinámica de formularios
$("#altaArticulo").click(abrirAltaArticulo);
$("#altaCliente").click(abrirAltaCliente);
$("#mostrarCarrito").click(abrirCarrito);
$("#altaEmpleado").click(abrirAltaEmpleado);
$("#mostrarListadoCliente").click(fMostrarListadoCliente);



function abrirAltaArticulo() {

    // Oculto todos los formularios menos este
    $("form:not('#frmAltaArticulo')").hide("normal");
    $("#body").hide("normal");

    // Verifico si ya he cargado el formulario antes
    if ($('#frmAltaArticulo').size() == 0) {
        $("<div>").appendTo('#formularios').load("altaArticulo/altaArticulo.html",
            function() {
                $.getScript("altaArticulo/altaArticulo.js");
            });

    } else {
        // Lo muestro si está oculto
        $('#frmAltaArticulo').show("normal");
    }
}

function abrirAltaCliente(){
    // Oculto todos los formularios menos este
    $("form:not('#frmAltaCliente')").hide("normal");
    $("#body").hide("normal");

    // Verifico si ya he cargado el formulario antes
    if ($('#frmAltaCliente').size() == 0) {
        $("<div>").appendTo('#formularios').load("altaCliente/altaCliente.html",
            function() {
                $.getScript("altaCliente/altaCliente.js");
            });

    } else {
        // Lo muestro si está oculto
        $('#frmAltaCliente').show("normal");
    }
}

function abrirCarrito(){

    //llamada get para comprobar que haya alguna linea y que el codVenta sea null
    var aLineas = [];
    $.get("altaCarrito/getLineas.php",function(datos){
        if(datos.existe == 1){
            for(let i = 0; i<datos.datos.length ; i++){
                aLineas.push(datos.datos[i]);
            }
        }
        
        
        if(aLineas.length == 0 ){
            alert("Carrito vacío");
        }else{
            
            fOcultarFormularios();
            fOcultarTablasListado();
            contadorTotalLineas = 0;
            let tablaLineas = document.createElement("TABLE");
            tablaLineas.className = "table table-striped table-hover";
            tablaLineas.id = "tablaCarrito";
            let cabecera = tablaLineas.createTHead();
            let filaCabecera = cabecera.insertRow(-1);
            filaCabecera.insertCell(-1).textContent = "ARTÍCULO";
            filaCabecera.insertCell(-1).textContent = "UNIDADES";
            filaCabecera.insertCell(-1).textContent = "PRECIO";
            filaCabecera.insertCell(-1).textContent = "TOTAL DE LÍNEA";
            let cuerpoTabla = tablaLineas.createTBody();
            aLineas.forEach(elemento =>{
                
                    /*let botonMasUno = document.createElement("INPUT");
                    botonMasUno.setAttribute("type", "button");
                    botonMasUno.setAttribute("value", "+");
                    botonMasUno.addEventListener("click", añadirUnProducto, false);
                    let botonMenosUno = document.createElement("INPUT");
                    botonMenosUno.setAttribute("type", "button");
                    botonMenosUno.setAttribute("value", "-");
                    botonMenosUno.addEventListener("click", quitarUnProducto, false);
                    let botonEliminar = document.createElement("INPUT");
                    botonEliminar.setAttribute("type", "button");
                    botonEliminar.setAttribute("value", "X");
                    botonEliminar.addEventListener("click", eliminarProducto, false);
    
                    let td = document.createElement("TD");
                    td.appendChild(botonMasUno);
                    td.appendChild(botonMenosUno);
                    td.appendChild(botonEliminar);*/
                    //
                    let fila = cuerpoTabla.insertRow(-1);
                    //GET NOMBRE Y PRECIO FROM ARTICULOS
                    $.ajax({
                        url: "altaCarrito/getArticulo.php",
                        type: "GET",
                        async: false,
                        data: "ID=" + elemento.id_articulo,
                        dataType: "text",
                        success: respuestaArticulo
                    });
                    function respuestaArticulo(datos){
                            let oDatos = JSON.parse(datos);
                            fila.insertCell(-1).textContent = oDatos.nombre;
                            fila.insertCell(-1).textContent = elemento.unidades;
                            fila.insertCell(-1).textContent = oDatos.precio;
                            fila.insertCell(-1).textContent = oDatos.precio * elemento.unidades;
                            contadorTotalLineas += oDatos.precio * elemento.unidades;
                    }
    
                    
                    
                    
                    
                    //fila.appendChild(td);
                    
                
                
                
            });
            let fila = cuerpoTabla.insertRow(-1);
            let celda = fila.insertCell(-1);
            celda.textContent ="TOTAL PEDIDO";
            celda.setAttribute("rowspan", "3");
            fila.insertCell(-1).textContent = contadorTotalLineas;
            //Borro la tabla antigua y meto esta
            document.getElementById("body").removeChild(document.getElementById("body").lastChild);
            document.getElementById("body").appendChild(tablaLineas);
            //Muestro el formulario para insertar los dni de cliente y empleado
            let formu = document.getElementById("formularioCompra");
            if(formu){
                formu.style.visibility = "visible";
            }
            
            $.getScript("altaCarrito/aceptarCompra.js");
        }
    },'json');
}

function abrirAltaEmpleado(){
    // Oculto todos los formularios menos este
    $("form:not('#frmAltaEmpleado')").hide("normal");
    $("#body").hide("normal");

     // Verifico si ya he cargado el formulario antes
     if ($('#frmAltaEmpleado').size() == 0) {
        $("<div>").appendTo('#formularios').load("altaEmpleado/altaEmpleado.html",
            function() {
                $.getScript("altaEmpleado/altaEmpleado.js");
            });

    } else {
        // Lo muestro si está oculto
        $('#frmAltaEmpleado').show("normal");
    }

}
function fMostrarListadoCliente(){
    fOcultarFormularios();
    fVaciarTabla();
    //Borrar los nodos hijos de la tabla
    let tHead = document.getElementById("tabla").createTHead();
    let tBody = document.getElementById("tabla").appendChild(document.getElementById("tabla").createTBody());
    let cabecera = tHead.insertRow(-1);
    cabecera.insertCell(-1).textContent = "DNI";
    cabecera.insertCell(-1).textContent = "NOMBRE";
    cabecera.insertCell(-1).textContent = "APELLIDOS";
    cabecera.insertCell(-1).textContent = "DIRECCIÓN";
    cabecera.insertCell(-1).textContent = "CORREO";
    cabecera.insertCell(-1).textContent = "TELÉFONO";
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
      }
    //Añadir las filas a la tabla
    //GET from clientes
      $.get("altaCliente/getClientesListadoXML.php", respuestaListadoClientes, "xml");
      function respuestaListadoClientes(oXML){
        let clientes = oXML.querySelectorAll("cliente");
        
        clientes.forEach(function(cliente){
            let fila = tBody.insertRow(-1);
            fila.insertCell(-1).textContent = cliente.querySelector("dni").textContent;
            fila.insertCell(-1).textContent = cliente.querySelector("nombre").textContent;
            fila.insertCell(-1).textContent = cliente.querySelector("apellidos").textContent;
            fila.insertCell(-1).textContent = cliente.querySelector("direccion").textContent;
            fila.insertCell(-1).textContent = cliente.querySelector("correo").textContent;
            fila.insertCell(-1).textContent = cliente.querySelector("telefono").textContent;
        });
        
      }
    
    document.getElementById("tabla").style.display = "table";
}
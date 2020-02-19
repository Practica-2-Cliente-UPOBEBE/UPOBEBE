// Carga dinámica de formularios
$("#altaArticulo").click(abrirAltaArticulo);
$("#altaCliente").click(abrirAltaCliente);
$("#mostrarCarrito").click(abrirCarrito);


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
    $.get("altaCarrito/getLineas.php",function(){

    });

    if(oUpoBebe.tLineaArticulo.length == 0 || oUpoBebe.tLineaArticulo[(oUpoBebe.tLineaArticulo.length-1)].oVenta != null){
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
        oUpoBebe.tLineaArticulo.forEach(elemento =>{
            if(elemento.oVenta == null){
                let botonMasUno = document.createElement("INPUT");
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
                td.appendChild(botonEliminar);

                let fila = cuerpoTabla.insertRow(-1);
                fila.insertCell(-1).textContent = elemento.oArt.nombreArticulo;
                fila.insertCell(-1).textContent = elemento.unidades;
                fila.insertCell(-1).textContent = elemento.oArt.precioArticulo;
                fila.insertCell(-1).textContent = elemento.totalLinea();
                fila.appendChild(td);
                contadorTotalLineas += elemento.totalLinea();
            }
            
            
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
        
        document.getElementById("aceptarCompra").addEventListener("click", darAltaCompra, false);
    }
}

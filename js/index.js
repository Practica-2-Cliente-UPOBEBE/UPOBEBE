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
    $.get("altaCarrito/getLineas.php",function(datos){
        //let oDatos = this.responseText;
        let oDatos = JSON.parse(datos);
        //console.log(oDatos.datos);
        if(oDatos.existe == 1){
            for(let i = 0; i<oDatos.datos.length ; i++){
                aLineas.push(oDatos.datos[i]);
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
                    //GET NOMBRE Y PRECIO FROM ARTICULOS
                    $.ajax({
                        url: "altaCarrito/getArticulo.php",
                        type: "GET",
                        async: false,
                        data: "ID=" + elemento.id_articulo,
                        dataType: "text",
                        success: respuestaArticulo
                    });
                    function respuestaArticulo(){
                        
                        let oDatos = this.responseText;
                        let x = JSON.parse(oDatos);
                        console.log(x);
                    }
    
                    /*let fila = cuerpoTabla.insertRow(-1);
                    fila.insertCell(-1).textContent = elemento.id_linea;
                    fila.insertCell(-1).textContent = elemento.unidades;
                    fila.insertCell(-1).textContent = elemento.id_articulo;
                    fila.insertCell(-1).textContent = elemento.id_venta;
                    fila.appendChild(td);*/
                    //contadorTotalLineas += elemento.totalLinea();
                
                
                
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
    });
    
    
}

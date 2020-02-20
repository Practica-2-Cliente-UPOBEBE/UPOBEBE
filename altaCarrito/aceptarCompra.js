//# sourceURL=aceptarCompra.js;

document.getElementById("aceptarCompra").addEventListener("click", darAltaCompra, false);

//Pulsar el botón de comprar
function darAltaCompra(){
    //Recoger en variables los dni de cliente y vendedor
    let dniCliente = document.getElementById("dniCliente").value.trim();
    let dniEmpleado = document.getElementById("dniEmpleado").value.trim();
    //Comprobar que existan
    var existeCliente = false;
    var existeEmpleado = false;
    $.get("altaCarrito/getCliente.php", "dni="+dniCliente, function(datos){
        let oDatos = JSON.parse(datos);
        if(oDatos.existe == 1){
            existeCliente = true;
        }
    }, "text");
    $.get("altaCarrito/getEmpleado.php", "dni="+dniEmpleado, function(datos){
        let oDatos = JSON.parse(datos);
        if(oDatos.existe == 1){
            existeEmpleado = true;
        }
    }, "text");

    if(!existeCliente){
        alert("No hay ningún cliente con ese DNI");
        document.getElementById("dniCliente").classList.add("error");
        document.getElementById("dniCliente").focus();
    }else if(!existeEmpleado){
        alert("No hay ningún empleado con ese DNI");
        document.getElementById("dniEmpleado").classList.add("error");
        document.getElementById("dniEmpleado").focus();
        document.getElementById("dniCliente").classList.remove("error");
    }else{
        //POST para agregar la venta
       
        let f = new Date();
        let fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
        let parametros = "dniCliente=" + dniCliente + "&dniEmpleado=" +dniEmpleado + "&fecha=" +fecha;
        $.post("altaCarrito/altaCarrito.php", encodeURI(parametros), respuestaAltaCarrito, "text");
        function respuestaAltaCarrito(datos) {
            let oDatos = JSON.parse(datos);
            if (oDatos.insertado == 1) {
                alert("Compra realizada");
                //Añadir el id venta a las lineas correspondientes

                $.post("altaCarrito/insertIdVentaEnLineas.php");
                
                document.getElementById("dniCliente").classList.remove("error");
                document.getElementById("dniEmpleado").classList.remove("error");
                document.getElementById("formularioCompra").reset();
            
            }else{
                alert(oDatos.mensaje);
            }
        }
    }
}
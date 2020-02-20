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
        let arrayLineas = oUpoBebe.tLineaArticulo.filter(linea => linea.oVenta == null);
        let f = new Date();
        let fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
        let nuevaVenta = oUpoBebe.altaVenta(new Venta(idVenta, oCliente, oEmpleado, arrayLineas, fecha));
        if(nuevaVenta){
            //Añadir el objeto venta a las lineas correspondientes
            arrayLineas.forEach(linea => {
                linea.oVenta = nuevaVenta;
            });

            idVenta++;
            alert("Venta realizada con éxito");
            document.getElementById("dniCliente").classList.remove("error");
            document.getElementById("dniEmpleado").classList.remove("error");
            document.getElementById("formularioCompra").reset();
            
        }else{
            alert("Error en la venta");
        }
    }
}
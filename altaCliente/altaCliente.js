//# sourceURL=altaCliente.js;

$("#aceptarAltaCliente").click(aceptarAltaCliente);
//Alta cliente
function aceptarAltaCliente(){
    let dni = frmAltaCliente.dni.value.trim();
    let nombre = frmAltaCliente.nombre.value.trim();
    let apellidos = frmAltaCliente.apellidos.value.trim();
    let direccion = frmAltaCliente.direccion.value.trim();
    let correo = frmAltaCliente.correo.value.trim();
    let tlf = frmAltaCliente.tlf.value.trim();
    let mensaje = "ERROR:";
    let bValido = true;
    limpiarErrores();
    if(/^(X(-|\.)?0?\d{7}(-|\.)?[A-Z]|[A-Z](-|\.)?\d{7}(-|\.)? [0-9A-Z]|\d{8}(-|\.)?[A-Z])$/.test(dni) == false){
        bValido = false;
        mensaje += "\nEl DNI es incorrecto";
        frmAltaCliente.dni.classList.add("error");
        frmAltaCliente.dni.focus();
    }
    if(/[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}/.test(nombre) == false){
        if(bValido){
            bValido = false;
            frmAltaCliente.nombre.focus();
        }
        frmAltaCliente.nombre.classList.add("error");
        mensaje += "\nEl nombre es incorrecto";
    }
    if(/[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,64}/.test(apellidos) == false){
        if(bValido){
            bValido = false;
            frmAltaCliente.apellidos.focus();
        }
        mensaje += "\nLos apellidos son incorrectos";
        frmAltaCliente.apellidos.classList.add("error");
    }
    if(/^[a-zA-Z\s0-9]{2,20}$/.test(direccion) == false){
        if(bValido){
            bValido = false;
            frmAltaCliente.direccion.focus();
        }
        mensaje += "\nLa dirección es incorrecta";
        frmAltaCliente.direccion.classList.add("error");
    }
    if(/[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/.test(correo) == false){
        if(bValido){
            bValido = false;
            frmAltaCliente.correo.focus();
        }
        mensaje += "\nEl correo es incorrecto";
        frmAltaCliente.correo.classList.add("error");
    }
    if(/^[9678]\d{8}$/.test(tlf) == false){
        if(bValido){
            bValido = false;
            frmAltaCliente.tlf.focus();
        }
        mensaje += "\nEl teléfono es incorrecto";
        frmAltaCliente.tlf.classList.add("error");
    }
    if(!bValido){
        alert(mensaje);
    }else{
        //Llamada POST ayax
        let oCliente = {
            dni: dni,
            nombre: nombre,
            apellidos: apellidos, 
            direccion: direccion, 
            correo: correo, 
            tlf: tlf
        };
            // Instanciar objeto Ajax
            var oAjax = instanciarXHR();

            // Parametros
            let sParametros = "datos=" + JSON.stringify(oCliente);
            sParametros = encodeURI(sParametros);

            //Configurar la llamada --> Asincrono por defecto
            oAjax.open("POST", "altaCliente/altaCliente.php");

            //Asociar manejador de evento de la respuesta
            oAjax.addEventListener("readystatechange", respuestaAltaCliente, false);

            // Cabecera POST
            oAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            //Hacer la llamada
            oAjax.send(sParametros);
        
        
        //let parametros = "datos=" + JSON.stringify(oCliente);
        //$.post("altaCliente/altaCliente.php", encodeURI(parametros), respuestaAltaCliente, "json");
        
    }
    function respuestaAltaCliente(oDatos){
        if (oDatos.error) {
            alert(oDatos.mensaje);
        } else {
            alert(oDatos.mensaje);
            frmAltaCliente.reset();
            $("#frmAltaCliente").hide("normal");
        }
    }

    function limpiarErrores(){
        frmAltaCliente.dni.classList.remove("error");
        frmAltaCliente.nombre.classList.remove("error");
        frmAltaCliente.apellidos.classList.remove("error");
        frmAltaCliente.direccion.classList.remove("error");
        frmAltaCliente.correo.classList.remove("error");
        frmAltaCliente.tlf.classList.remove("error");
    }
}
//Fin alta cliente
function instanciarXHR() {
    var xhttp = null;

    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    } else // code for IE5 and IE6
    {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    return xhttp;
}
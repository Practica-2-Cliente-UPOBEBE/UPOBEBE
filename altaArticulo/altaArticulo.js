//# sourceURL=altaArticulo.js;
$("#aceptarAltaArticulo").click(fAceptarAltaArticulo);

function fAceptarAltaArticulo()
{
    let sIDArticulo = frmAltaArticulo.txtIDArticulo.value.trim();
    let sNombreArticulo = frmAltaArticulo.txtNombreArticulo.value.trim();
    let sDescripcionArticulo = frmAltaArticulo.txtDescripcionArticulo.value.trim();
    let sCategoria = frmAltaArticulo.selectCategoria.value;
    let fPrecioArticulo = frmAltaArticulo.txtPrecioArticulo.value.trim();
    let mensaje = "ERROR:";
    let bValido = true;
    limpiarErrores();

    let oExpRegID = /^[a-zA-Z\s0-9]{5}$/;
    if (oExpRegID.test(sIDArticulo) == false) {
        bValido = false;
        mensaje += "\nEl campo ID debe contener 5 dígitos alfanuméricos.";
        frmAltaArticulo.txtIDArticulo.classList.add("error");
        frmAltaArticulo.txtIDArticulo.focus();
    }

    let oExpRegNombre = /[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}/;
    if(oExpRegNombre.test(sNombreArticulo)==false)
    {
        bValido = false;
        mensaje += "\nEl nombre es incorrecto.";
        frmAltaArticulo.txtNombreArticulo.classList.add("error");
        frmAltaArticulo.txtNombreArticulo.focus();
    }
    let oExpRegDescripcion = /^[a-zA-Z\s0-9]{5,40}$/;
    if(oExpRegDescripcion.test(sDescripcionArticulo)==false)
    {
        bValido = false;
        mensaje += "\nEl campo descripción es erróneo";
        frmAltaArticulo.txtDescripcionArticulo.classList.add("error");
        frmAltaArticulo.txtDescripcionArticulo.focus();
    }
    if (sCategoria == 0) {
        bValido = false;
        mensaje += "\nDebe elegir una categoria";
        frmAltaArticulo.selectCategoria.classList.add("error");
        frmAltaArticulo.selectCategoria.focus();
    }
    
    if (fPrecioArticulo == "") {
        bValido = false;
        mensaje += "\nDebe rellenar el campo PRECIO";
        frmAltaArticulo.txtPrecioArticulo.classList.add("error");
        frmAltaArticulo.txtPrecioArticulo.focus();
    }

    if (!bValido) {
        alert(mensaje);
    } else {
       
        let oArticulo ={
            Id: sIDArticulo,
            Nombre: sNombreArticulo,
            Descripcion: sDescripcionArticulo,
            Categoria: sCategoria,
            Precio: fPrecioArticulo
        };

        $.ajax({
            url: "altaArticulo/altaArticulo.php",
            data: "datos=" + JSON.stringify(articulo),
            cache: false,
            async: true, // por defecto
            method: "POST",
            success: respuestaAltaArticulo
        });

    }

    function respuestaAltaArticulo(resultado) {
        let datos = JSON.parse(resultado);
        if (datos["error"]) {
            alert(datos["mensaje"]);
        } else {
            alert(datos["mensaje"]);
            frmAltaArticulo.reset();
            $("#frmAltaArticulo").parent().hide("normal");
        }
    }

    function limpiarErrores() {
        frmAltaArticulo.txtIDArticulo.classList.remove("error");
        frmAltaArticulo.txtNombreArticulo.classList.remove("error");
        frmAltaArticulo.txtDescripcionArticulo.classList.remove("error");
        frmAltaArticulo.selectCategoria.classList.remove("error");
        frmAltaArticulo.txtPrecioArticulo.classList.remove("error");
    }
}




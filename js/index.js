// Carga dinámica de formularios
$("#altaArticulo").click(abrirAltaArticulo);


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
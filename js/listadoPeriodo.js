//# sourceURL=listadoPeriodo.js;
$("#aceptarListarVentasPeriodo").click(fListarListado);

function fListarListado(){
    if(frmVentasPeriodo.fechaVentaInicio.value<=frmVentasPeriodo.fechaVentaFin.value || 
		frmVentasPeriodo.fechaVentaInicio.value.trim()!="" || frmVentasPeriodo.fechaVentaFin.value.trim()!=""){
		var sParametros={
			fechaInicio: frmVentasPeriodo.fechaVentaInicio.value,
			fechaFin: frmVentasPeriodo.fechaVentaFin.value
		};
		$.ajax({
	        url: "./php/getListadoVentasPeriodo.php",
	        type: "GET",
	        async: false,
	        data: "datos=" + JSON.stringify(sParametros),
	        dataType: "xml",
	        success: procesoRespuestaFechas
	    });
	}else {
		alert("Error en Fechas.")
	}
}

var sOptions="";
function procesoRespuestaFechas(oDatos, sStatus, oXHR){

	var oOptions = oDatos.querySelectorAll("venta");
    sOptions = "<table broder='2'><thead><tr><th>ID</th><th>Nombre del Cliente</th><th>Nombre del Empleado</th><th>Lineas de los artículo</th><th>Total del pedido</th><th>Fecha</th></tr></thead><tbody>";
    var totalPrecio="";
    for (var i = 0; i < oOptions.length; i++) {
    	sOptions += "<tr>";
		sOptions += "<td>"+oOptions[i].querySelector("id").textContent+"</td><td>"+oOptions[i].querySelector("nombre").textContent+"</td><td>"+oOptions[i].querySelector("nombre").textContent+"</td><td>";
		totalPedido+=oOptions[i].querySelector("total").textContent
		sOptions += "</tr>";
    }
    sOptions += "</tbody></table><br>";
    //$("#lstEventos").html(sOptions);
    //var oVentana = window.open("", "_blank");

    //oVentana.document.body.innerHTML = sOptions;
}
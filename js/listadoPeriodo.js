//# sourceURL=listadoPeriodo.js;
$("#aceptarListarVentasPeriodo").click(fMostrarListadoVentasPeriodo);
function fMostrarListadoVentasPeriodo(){
	console.log("lista");
    fOcultarFormularios();
    fVaciarTabla();
    

    
	var sParametros={
		fechaInicio: frmVentasPeriodo.fechaVentaInicio.value,
		fechaFin: frmVentasPeriodo.fechaVentaFin.value
	};

    let tabla = document.getElementById("tabla");
    let cabecera = tabla.createTHead();
    let fila= cabecera.insertRow(-1);
    let celda = fila.insertCell(-1);
    celda.textContent = "ID";
    celda = fila.insertCell(-1);
    celda.textContent = "Nombre del cliente";
    celda = fila.insertCell(-1);
    celda.textContent = "Nombre del empleado";
    celda = fila.insertCell(-1);
    celda.textContent = "Lineas de los artículos";
    celda = fila.insertCell(-1);
    celda.textContent = "Total del pedido";
    celda = fila.insertCell(-1);
    celda.textContent = "Fecha";
    let cuerpito = document.createElement("tbody");


    $.get("listadoVentasPeriodo/getListadoVentasPeriodo.php",sParametros, respuestaListadoVentasPeriodo);
    function respuestaListadoVentasPeriodo(oXML){
      let lineas = oXML.querySelectorAll("venta");
      
      lineas.forEach(function(venta){
          let fila = cuerpito.insertRow(-1);
          fila.insertCell(-1).textContent = venta.querySelector("id").textContent;
          fila.insertCell(-1).textContent = venta.querySelector("nombreCli").textContent;
          fila.insertCell(-1).textContent = venta.querySelector("nombreEmple").textContent;
          fila.insertCell(-1).textContent = venta.querySelector("total").textContent;
          fila.insertCell(-1).textContent = venta.querySelector("fecha").textContent;
          
      });
      
	}
	document.getElementById("tabla").append(cuerpito);
  
  document.getElementById("tabla").style.display = "table";
  //$("#body").style.display = "block";
  $("#body").show("normal");

}

function fListarListado(){
	
	
	$.ajax({
		url: "listadoVentasPeriodo/getListadoVentasPeriodo.php",
		type: "GET",
		async: false,
		data: "datos=" + JSON.stringify(sParametros),
		//dataType: "xml",
		success: procesoRespuestaFechas
	});

/*
    if(frmVentasPeriodo.fechaVentaInicio.value<=frmVentasPeriodo.fechaVentaFin.value || 
		frmVentasPeriodo.fechaVentaInicio.value.trim()!="" || frmVentasPeriodo.fechaVentaFin.value.trim()!=""){
		var sParametros={
			fechaInicio: frmVentasPeriodo.fechaVentaInicio.value,
			fechaFin: frmVentasPeriodo.fechaVentaFin.value
		};
		$.ajax({
	        url: "../listadoVentasPeriodo/getListadoVentasPeriodo.php",
	        type: "GET",
	        async: false,
	        data: "datos=" + JSON.stringify(sParametros),
	        //dataType: "xml",
	        success: procesoRespuestaFechas
	    });
	}else {
		alert("Error en Fechas.");
	}*/
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
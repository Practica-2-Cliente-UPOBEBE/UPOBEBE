"use strict";
var oUpoBebe = new UpoBebe();
var idLinea = 0;
var idVenta = 0;
var idReparacion = 0;
var contadorTotalLineas;
fDatosIniciales();

fOcultarFormularios();
fOcultarTablasListado();



//Mostrar listado de artículos por defecto
window.addEventListener("load", fMostrarListadoArticulo);
//mostrar pagina principal - evento:
document.getElementById("mostrarPaginaPrincipal").addEventListener("click",fMostrarPaginaPrincipal,false);

//mostrar formularios:
//document.getElementById("altaArticulo").addEventListener("click",fMostrarAltaArticulo,false);
//document.getElementById("altaCliente").addEventListener("click",fMostarAltaCliente,false);
//document.getElementById("altaEmpleado").addEventListener("click",fMostarAltaEmpleado,false);
document.getElementById("altaTaller").addEventListener("click",fMostrarAltaTaller,false);
document.getElementById("fMostrarBajaModificarCliente").addEventListener("click", fMostrarBajaModificarCliente, false);
document.getElementById("altaReparacion").addEventListener("click", fMostrarAltaReparacion, false);

//evento - mostrar listado
document.getElementById("mostrarListadoVentas").addEventListener("click",fMostrarListadoVentas,false);
//document.getElementById("mostrarListadoEmpleados").addEventListener("click",fMostrarListadoEmpleados,false);
document.getElementById("mostrarListadoCliente").addEventListener("click",fMostrarListadoCliente,false);
document.getElementById("mostrarListadoTaller").addEventListener("click",fMostrarListadoTaller,false);
document.getElementById("mostrarListadoArticulo").addEventListener("click",fMostrarListadoArticulo,false);

document.getElementById("mostrarFormularioVentasPeriodo").addEventListener("click",fMostrarFormularioVentasPeriodos,false);
document.getElementById("aceptarListarVentasPeriodo").addEventListener("click",fMostrarListadoVentasPeriodo,false);
//evento - mostrar carrito:
//document.getElementById("mostrarCarrito").addEventListener("click",fMostrarCarrito,false);

//eventos - botones Dar de ALTA:
//document.getElementById("aceptarAltaEmpleado").addEventListener("click",fAltaEmpleado,false);
//document.getElementById("aceptarAltaCliente").addEventListener("click",aceptarAltaCliente,false);
//document.getElementById("aceptarAltaArticulo").addEventListener("click",altaArticulo,false);
document.getElementById("aceptarAltaTaller").addEventListener("click",altaTaller,false);


//eventos - botones mod/borrar cliente:
document.getElementById("buscarDniCliente").addEventListener("click",buscarDniCliente,false);
document.getElementById("modificarCliente").addEventListener("click",modificarCliente,false);
document.getElementById("darDeBajaCliente").addEventListener("click",darDeBajaCliente,false);


// DATOS INICIALES:
    function fDatosIniciales(){
        
        // Cargar XML
        let oXML = loadXMLDoc("datosUpoBebe.xml");

        //Datos empleados
        /*
        let oEmpleados = oXML.querySelectorAll("empleado");
        for(let i=0;i < oEmpleados.length ; i++){
            let dni = oEmpleados[i].querySelector("dni").textContent;
            let nombre = oEmpleados[i].querySelector("nombre").textContent;
            let apellidos = oEmpleados[i].querySelector("apellidos").textContent;
            let salario = oEmpleados[i].querySelector("salario").textContent;
            let direccion = oEmpleados[i].querySelector("direccion").textContent;
            let correo = oEmpleados[i].querySelector("correo").textContent;
            let rol = oEmpleados[i].querySelector("rol").textContent;
            let tlf = oEmpleados[i].querySelector("telefono").textContent;
            
            oUpoBebe.altaEmpleado(new Empleado(dni, nombre, apellidos, salario, direccion, correo, rol, tlf));
        }*/
        //Datos clientes
        /*let oCLientes = oXML.querySelectorAll("cliente");
        for(let i=0;i < oCLientes.length ; i++){
            let dni = oCLientes[i].querySelector("dni").textContent;
            let nombre = oCLientes[i].querySelector("nombre").textContent;
            let apellidos = oCLientes[i].querySelector("apellidos").textContent;
            let direccion = oCLientes[i].querySelector("direccion").textContent;
            let correo = oCLientes[i].querySelector("correo").textContent;
            let tlf = oCLientes[i].querySelector("telefono").textContent;

            oUpoBebe.altaCliente(new Cliente(dni, nombre, apellidos, direccion, correo, tlf));
        }*/
       //Datos talleres
        let oTalleres = oXML.querySelectorAll("taller");
        for(let i = 0 ; i < oTalleres.length ; i++){
            let nombre = oTalleres[i].querySelector("nombre").textContent;
            let nif = oTalleres[i].querySelector("nif").textContent;
            let direccion = oTalleres[i].querySelector("direccion").textContent;

            oUpoBebe.altaTaller(new Taller(nombre, nif, direccion));
        }
        //Datos categorías
        let oCategorias = oXML.querySelectorAll("categoria");
        for(let i = 0 ; i < oCategorias.length ; i++){
            let nombre = oCategorias[i].querySelector("nombre").textContent;
            let id = oCategorias[i].querySelector("id").textContent;
            let descripcion = oCategorias[i].querySelector("descripcion").textContent;

            oUpoBebe.altaCategoria(new Categoria(id, nombre, descripcion));
        }
        //Datos artículos
        let oArticulos = oXML.querySelectorAll("articulo");
        for(let i = 0 ; i < oArticulos.length ; i++){
            
            let id = oArticulos[i].querySelector("id").textContent;
            let nombre = oArticulos[i].querySelector("nombre").textContent;
            let descripcion = oArticulos[i].querySelector("descripcion").textContent;
            let categoria = oArticulos[i].getAttribute("categoria");
            let precio = parseInt(oArticulos[i].querySelector("precio").textContent, 10);
            let oCategoria = null;
            oUpoBebe.tCategorias.forEach(valor => {
                if(categoria == valor.nombreCategoria){
                    oCategoria = valor;
                }
            });

            oUpoBebe.altaArticulo(new Articulo(id, nombre, descripcion, oCategoria, precio));
        }
        
    }
// fin de datos INICIALES
// Función para cargar el ficheroXML
function loadXMLDoc(filename) {
    let xhttp = null;

    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    }
    else // code for IE5 and IE6
    {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET", filename, false);

    xhttp.send();

    return xhttp.responseXML;
}

// mostrar y ocultar formularios cuando hacemos click:
function fOcultarFormularios(){
    document.getElementById("divIzquierdo").style.display = "none";
    frmAltaEmpleado.style.display = "none";
    if(document.getElementById("frmAltaArticulo") != null){
        frmAltaArticulo.style.display = "none";
    }
    /*if($.contains(document.body, document.getElementById("frmAltaArticulo") )) {
        frmAltaArticulo.style.display = "none";
    }*/
    if(document.getElementById("frmAltaCliente") != null){
        frmAltaCliente.style.display = "none";
    }
    //frmAltaCliente.style.display = "none";
    frmAltaTaller.style.display = "none";
    frmModCliente.style.display = "none";
    frmAltaReparacion.style.display = "none";
    document.getElementById("divFrmListaVentasPeriodo").style.display = "none";
    document.getElementById("formularioCompra").style.visibility = "hidden";
    if(document.getElementById("tablaCarrito")){
        document.getElementById("tablaCarrito").style.display = "none";
    }
}
function fMostrarPaginaPrincipal(){
    //le damos al LOGO/HOME:
    fOcultarFormularios();
    fOcultarTablasListado();
    fMostrarListadoArticulo();
    // Mostrar por defecto la lista de los artículos
}
function fOcultarTablasListado(){
    document.getElementById("tabla").style.display = "none";
    if(document.getElementById("tablaCarrito")){
        document.getElementById("tablaCarrito").style.display = "none";
    }
    if(document.getElementById("formularioCompra")){
        document.getElementById("formularioCompra").style.visibility = "hidden";
    }
    
}
// Ventas periodo
function fMostrarFormularioVentasPeriodos(){
    fOcultarFormularios();
    fOcultarTablasListado();
    document.getElementById("divFrmListaVentasPeriodo").style.display = "block";
    frmVentasPeriodo.reset();
}
function fMostrarListadoVentasPeriodo(){
    fOcultarFormularios();
    document.getElementById("tabla").style.display = "table";
    fVaciarTabla();
    let dtInicio = (new Date(frmVentasPeriodo.fechaVentaInicio.value));
    let dtFin = (new Date(frmVentasPeriodo.fechaVentaFin.value));
    oUpoBebe.listadoVentasPeriodo(dtInicio,dtFin);
    
}
//fin ventas periodo
// EMPLEADO
/*
function fMostarAltaEmpleado(){
    fOcultarFormularios();
    fOcultarTablasListado();
    frmAltaEmpleado.style.display = "block";
    frmAltaEmpleado.reset();
}
function fMostrarListadoEmpleados(){
    fOcultarFormularios();
    document.getElementById("tabla").style.display = "table";
    fVaciarTabla();
    
    let tablaAMostrar = oUpoBebe.listadoEmpleados();
    document.getElementById("tabla").append(tablaAMostrar);
    
}
*/
// fin EMPLEADO

function fVaciarTabla(){
    let hijosTabla = document.querySelectorAll('#tabla > *');
    if(hijosTabla.length > 0){
        hijosTabla.forEach(hijo=>{
            hijo.remove();
        })
    }
}

// Articulo
/*
function fMostrarAltaArticulo(oEvento)
{
    var oE = oEvento || window.event;
    fOcultarFormularios();
    fOcultarTablasListado();
   frmAltaArticulo.style.display = "block";
    frmAltaArticulo.reset();
}*/

function fMostrarListadoArticulo(){
    fOcultarFormularios();
    fOcultarTablasListado();
    document.getElementById("divIzquierdo").style.display = "block";
    document.getElementById("tabla").style.display = "table";
    fVaciarTabla();
    let tablaAMostrar = oUpoBebe.listadoArticulo();
    document.getElementById("tabla").append(tablaAMostrar);
    
}
// fin articulo

// Cliente
function fMostarAltaCliente(){
    fOcultarFormularios();
    fOcultarTablasListado();
    frmAltaCliente.reset();
    frmAltaCliente.style.display = "block";
    

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
    oUpoBebe.tClientes.forEach(element => {
        tBody.appendChild(element.toString()); 
    });
    
    document.getElementById("tabla").style.display = "table";
}

function fMostrarBajaModificarCliente(){
    fOcultarFormularios();
    fOcultarTablasListado();
    frmModCliente.reset();
    frmModCliente.style.display = "block";

}
function buscarDniCliente(){
    let dni = frmModCliente.dni2.value.trim();
    let oCliente = oUpoBebe.buscarCliente(dni);
    if(oCliente == null){
        alert("El cliente no existe");
    }else{

        frmModCliente.nombre2.value = oCliente.nombreCliente;
        frmModCliente.apellidos2.value = oCliente.apellidosCliente;
        frmModCliente.direccion2.value = oCliente.direccionCliente;
        frmModCliente.correo2.value = oCliente.correoCliente;
        frmModCliente.tlf2.value = oCliente.tlfCliente;
    }
    
}

function darDeBajaCliente(){
    let dni = frmModCliente.dni2.value.trim();
    let oCliente = oUpoBebe.buscarCliente(dni);
    frmModCliente.dni2.classList.remove("error");
    if(oCliente == null){
        alert("No existe ningún cliente con ese DNI");
        frmModCliente.dni2.classList.add("error");
        frmModCliente.dni2.focus();
    }else{
        alert(oUpoBebe.darDeBajaCliente(oCliente));
        frmModCliente.reset();
    }
}
function modificarCliente(){
    let dni2 = frmModCliente.dni2.value.trim();
    let nombre2 = frmModCliente.nombre2.value.trim();
    let apellidos2 = frmModCliente.apellidos2.value.trim();
    let direccion2 = frmModCliente.direccion2.value.trim();
    let correo2 = frmModCliente.correo2.value.trim();
    let tlf2 = frmModCliente.tlf2.value.trim();
    let mensaje = "ERROR:";
    let bValido = true;
    limpiarErrores();
    if(/^(X(-|\.)?0?\d{7}(-|\.)?[A-Z]|[A-Z](-|\.)?\d{7}(-|\.)? [0-9A-Z]|\d{8}(-|\.)?[A-Z])$/.test(dni2) == false){
        bValido = false;
        mensaje += "\nEl DNI es incorrecto";
        frmModCliente.dni2.classList.add("error");
        frmModCliente.dni2.focus();
    }
    if(/[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}/.test(nombre2) == false){
        if(bValido){
            bValido = false;
            frmModCliente.nombre2.focus();
        }
        frmModCliente.nombre2.classList.add("error");
        mensaje += "\nEl nombre es incorrecto";
    }
    if(/[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,64}/.test(apellidos2) == false){
        if(bValido){
            bValido = false;
            frmModCliente.apellidos2.focus();
        }
        mensaje += "\nLos apellidos son incorrectos";
        frmModCliente.apellidos2.classList.add("error");
    }
    if(/^[a-zA-Z\s0-9]{2,20}$/.test(direccion2) == false){
        if(bValido){
            bValido = false;
            frmModCliente.direccion2.focus();
        }
        mensaje += "\nLa dirección es incorrecta";
        frmModCliente.direccion2.classList.add("error");
    }
    if(/[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/.test(correo2) == false){
        if(bValido){
            bValido = false;
            frmModCliente.correo2.focus();
        }
        mensaje += "\nEl correo es incorrecto";
        frmModCliente.correo2.classList.add("error");
    }
    if(/^[9678]\d{8}$/.test(tlf2) == false){
        if(bValido){
            bValido = false;
            frmModCliente.tlf2.focus();
        }
        mensaje += "\nEl teléfono es incorrecto";
        frmModCliente.tlf2.classList.add("error");
    }
    if(!bValido){
        alert(mensaje);
    }else{
        alert(oUpoBebe.modificarCliente(new Cliente(dni2, nombre2, apellidos2, direccion2, correo2, tlf2)));
        frmModCliente.reset();
    }

    function limpiarErrores(){
        frmModCliente.dni2.classList.remove("error");
        frmModCliente.nombre2.classList.remove("error");
        frmModCliente.apellidos2.classList.remove("error");
        frmModCliente.direccion2.classList.remove("error");
        frmModCliente.correo2.classList.remove("error");
        frmModCliente.tlf2.classList.remove("error");
    }
}
// fin cliente

//taller
    function fMostrarAltaTaller(){
        fOcultarFormularios();
        fOcultarTablasListado();
        frmAltaTaller.style.display = "block";
        frmAltaTaller.reset();
    }

    function fMostrarListadoTaller(){
        fOcultarFormularios();
        document.getElementById("tabla").style.display = "table";
        fVaciarTabla();
        let tablaAMostrar = oUpoBebe.listadoTaller();
        document.getElementById("tabla").append(tablaAMostrar);
    }
// fin taller

// mostrar ventas
function fMostrarListadoVentas(){
    fOcultarFormularios();
    fOcultarTablasListado();
    document.getElementById("tabla").style.display = "table";
    fVaciarTabla();
    oUpoBebe.listadoVentas();
    //document.getElementById("body").append(tablaAMostrar);
}

// mostar listados periodo vendidos
function fMostrarListadoPeriodoVendidos(){
    fOcultarFormularios();
    fOcultarTablasListado();
}

// mostrar listados periodo compras
function fMostrarListadoPeriodoComprados(){
    fOcultarFormularios();
    fOcultarTablasListado();
}


// FIN mostrar y ocultar formularios


//**** ALTAS  *******************************/
// alta Empleado
/*
    function fAltaEmpleado()
    {
        //frmAltaEmpleado.aceptarAltaEmpleado.addEventListener("click", fValidarAltaEmpleado, false);
        
        let sNifEmpleado = frmAltaEmpleado.txtNIF.value.trim();
        let sNombreEmpleado = frmAltaEmpleado.txtNombreEmpleado.value.trim();
        let sApellidosEmpleado = frmAltaEmpleado.txtApellidoEmpleado.value.trim();
        let fSalarioEmpleado = frmAltaEmpleado.txtSalarioEmpleado.value.trim();
        let sDireccionEmpleado = frmAltaEmpleado.txtDireccionEmpleado.value.trim();
        let sCorreoEmpleado = frmAltaEmpleado.txtCorreoEmpleado.value.trim();
        let sRolEmpleado = frmAltaEmpleado.txtRolEmpleado.value.trim();
        let iTlfEmpleado = frmAltaEmpleado.txtTlfEmpleado.value.trim();
        let oEmpleado = new Empleado(sNifEmpleado,sNombreEmpleado,sApellidosEmpleado,fSalarioEmpleado,sDireccionEmpleado,sCorreoEmpleado,sRolEmpleado,iTlfEmpleado);

        let bValido = true;
        let sError = "";
        limpiarErroresAltaEmpleado();
        //DNI
        let oExpRegDni = /^(X(-|\.)?0?\d{7}(-|\.)?[A-Z]|[A-Z](-|\.)?\d{7}(-|\.)? [0-9A-Z]|\d{8}(-|\.)?[A-Z])$/;

        if(oExpRegDni.test(sNifEmpleado)==false){
            bValido = false;
           frmAltaEmpleado.txtNIF.classList.add("error");
           frmAltaEmpleado.txtNIF.focus();
           sError+= "\nEl DNI es erroneo";
        }
        //validar nombre Empleado
        let oExpRegNombre = /^[a-zA-Z\s]{2,20}$/;

        if(oExpRegNombre.test(sNombreEmpleado)==false)
        {
            bValido = false;
            frmAltaEmpleado.txtNombreEmpleado.classList.add("error");
            frmAltaEmpleado.txtNombreEmpleado.focus();
            sError += "\nEl nombre debe ser compredido solo de letras entre 10 y 20 caracteres";
        }
        // validar apellidos Empleado
        let oExpRegApellidos = /^[a-zA-Z\s]{2,20}$/;
        if(oExpRegApellidos.test(sApellidosEmpleado)==false){
            bValido = false;
            frmAltaEmpleado.txtApellidoEmpleado.classList.add("error");
            frmAltaEmpleado.txtApellidoEmpleado.focus();
            sError += "\nLos apellidos debe ser comprendido solo de letras entre 10 y 20 caracteres";
        }
        //validar salario
        if(fSalarioEmpleado==""){
            bValido = false;
            frmAltaEmpleado.txtSalarioEmpleado.classList.add("error");
            frmAltaEmpleado.txtSalarioEmpleado.focus();
            sError += "\nIntroduzca un salario de al menos 3 cifras";
        }
        //rol
        if(sRolEmpleado==""){
            bValido = false;
            frmAltaEmpleado.txtRolEmpleado.classList.add("error");
            frmAltaEmpleado.txtRolEmpleado.focus();
            sError += "\nIntroduzca un Rol al empleado";
        }

        // validar direccion:
        let oExpRegDireccion = /^[a-zA-Z\s0-9]{2,20}$/;
        if(oExpRegDireccion.test(sDireccionEmpleado)==false){
            bValido = false;
            frmAltaEmpleado.txtDireccionEmpleado.classList.add("error");
            frmAltaEmpleado.txtDireccionEmpleado.focus();
            sError += "\nLa dirección es incorrecta";
        }
        //validar correo
        let oExpRegCorreo = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
        if(oExpRegCorreo.test(sCorreoEmpleado)==false){
            bValido = false;
            frmAltaEmpleado.txtCorreoEmpleado.classList.add("error");
            frmAltaEmpleado.txtCorreoEmpleado.focus();
            sError += "\nEl correo electronico es erroneo";
        }
        //validar telefono
        let oExpRegTelefono = /^[9678]\d{8}$/;
        if(oExpRegTelefono.test(iTlfEmpleado)==false){
            bValido = false;
            frmAltaEmpleado.txtTlfEmpleado.classList.add("error");
            frmAltaEmpleado.txtTlfEmpleado.focus();
            sError += "\nEl telefono es incorrecto";
        }


        //alerta
        if(bValido == false){
            alert(sError);
        }else{
            
            
            if(oUpoBebe.altaEmpleado(oEmpleado))
            {
                alert("Dado de alta");
                //frmAltaEmpleado.submit();
                frmAltaEmpleado.reset();
            }else{
                alert("El empleado YA EXISTE con ese DNI");
                
            }
        }
        function limpiarErroresAltaEmpleado(){
            frmAltaEmpleado.txtNIF.classList.remove("error");
            frmAltaEmpleado.txtNombreEmpleado.classList.remove("error");
            frmAltaEmpleado.txtApellidoEmpleado.classList.remove("error");
            frmAltaEmpleado.txtSalarioEmpleado.classList.remove("error");
            frmAltaEmpleado.txtDireccionEmpleado.classList.remove("error");
            frmAltaEmpleado.txtCorreoEmpleado.classList.remove("error");
            frmAltaEmpleado.txtTlfEmpleado.classList.remove("error");
        }
    }
    */
    
//fin alta empleado



//Alta artículo
/*
function altaArticulo() {
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
        alert(oUpoBebe.altaArticulo(new Articulo(sIDArticulo, sNombreArticulo, sDescripcionArticulo, sCategoria, fPrecioArticulo)));
    }

    function limpiarErrores() {
        frmAltaArticulo.txtIDArticulo.classList.remove("error");
        frmAltaArticulo.txtNombreArticulo.classList.remove("error");
        frmAltaArticulo.txtDescripcionArticulo.classList.remove("error");
        frmAltaArticulo.selectCategoria.classList.remove("error");
        frmAltaArticulo.txtPrecioArticulo.classList.remove("error");
    }

}*/
//Fin alta artículo


//Alta taller
function altaTaller() {
    let sNombreTaller = frmAltaTaller.txtNombreTaller.value.trim();
    let sNifTaller = frmAltaTaller.txtNIFTaller.value.trim();
    let sDireccionTaller = frmAltaTaller.txtDireccionTaller.value.trim();
    let mensaje = "ERROR:";
    let bValido = true;
    limpiarErrores();


    let oExpRegNombre = /[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}/;
    if(oExpRegNombre.test(sNombreTaller)==false)
    {
        bValido = false;
        mensaje += "\nEl nombre es incorrecto.";
        frmAltaTaller.txtNombreTaller.classList.add("error");
        frmAltaTaller.txtNombreTaller.focus();
    }

    let oExpRegNif = /^(X(-|\.)?0?\d{7}(-|\.)?[A-Z]|[A-Z](-|\.)?\d{7}(-|\.)? [0-9A-Z]|\d{8}(-|\.)?[A-Z])$/;

    if(oExpRegNif.test(sNifTaller)==false){
       bValido = false;
       mensaje += "\nEl nif es incorrecto.";
       frmAltaTaller.txtNIFTaller.classList.add("error");
       frmAltaTaller.txtNIFTaller.focus();
    }

    let oExpRegDireccion= /^[a-zA-Z\s0-9]{5,40}$/;
    if(oExpRegDireccion.test(sDireccionTaller)==false)
    {
        bValido = false;
        mensaje += "\nEl campo direccion es erróneo";
        frmAltaTaller.txtDireccionTaller.classList.add("error");
        frmAltaTaller.txtDireccionTaller.focus();
    }

    if (!bValido) {
        alert(mensaje);
    } else {
        alert(oUpoBebe.altaTaller(new Taller(sNombreTaller, sNifTaller, sDireccionTaller)));
    }

    function limpiarErrores() {
        frmAltaTaller.txtNombreTaller.classList.remove("error");
        frmAltaTaller.txtNIFTaller.classList.remove("error");
        frmAltaTaller.txtDireccionTaller.classList.remove("error");

    }

}
//Fin alta taller

//** fin ALTAS */


//Boton +
function añadirUnProducto(oEvento){
    let oE = oEvento || window.event;
    //Buscar esa linea de pedido y sumarle una unidad al producto
    var oLinea = null;
    oUpoBebe.tLineaArticulo.forEach(linea =>{
        if(linea.oVenta == null && linea.oArt.nombreArticulo == oE.target.parentNode.parentNode.firstChild.textContent){
            linea.unidades = linea.unidades+1;
            oLinea = linea;
            contadorTotalLineas = contadorTotalLineas + linea.oArt.precioArticulo;
        }
        
    });
    //Modificar la tabla con los nuevos datos
    oE.target.parentNode.parentNode.firstChild.nextSibling.textContent = oLinea.unidades;
    oE.target.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.textContent = oLinea.totalLinea();
    document.querySelector("#body table:last-child tbody tr:last-child td:last-child").textContent = contadorTotalLineas;
}
//Boton -
function quitarUnProducto(oEvento){
    let oE = oEvento || window.event;
    //Buscar esa linea de pedido y restarle una unidad al producto
    var oLinea = null;
    oUpoBebe.tLineaArticulo.forEach(function(linea, indice){
        if(linea.oVenta == null && linea.oArt.nombreArticulo == oE.target.parentNode.parentNode.firstChild.textContent){
            if(linea.unidades == 1){
                oE.target.parentNode.parentNode.remove();
                oUpoBebe.tLineaArticulo.splice(indice, 1);
            }else{
                linea.unidades = linea.unidades-1;
                contadorTotalLineas = contadorTotalLineas - linea.oArt.precioArticulo;
                oLinea = linea;
            }
        }
    });
    if(oLinea != null){
        //Modificar la tabla con los nuevos datos
        oE.target.parentNode.parentNode.firstChild.nextSibling.textContent = oLinea.unidades;
        oE.target.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.textContent = oLinea.totalLinea();
        document.querySelector("#body table:last-child tbody tr:last-child td:last-child").textContent = contadorTotalLineas;
    }
    
}
//Boton X
function eliminarProducto(oEvento){
    let oE = oEvento || window.event;
    //Buscar esa linea de pedido y eliminarla
    
        let indiceABorrar = oUpoBebe.tLineaArticulo.findIndex(function(valor){
            return valor.oArt.nombreArticulo == oE.target.parentNode.parentNode.firstChild.textContent && valor.oVenta == null;
        });
        oUpoBebe.tLineaArticulo.splice(indiceABorrar, 1);
        oE.target.parentNode.parentNode.remove();
        contadorTotalLineas = contadorTotalLineas - oE.target.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.textContent;
        document.querySelector("#body table:last-child tbody tr:last-child td:last-child").textContent = contadorTotalLineas;
        if(contadorTotalLineas == 0){
            document.querySelector("#body table:last-child tbody tr:last-child").remove();
        }

}

//Boton de añadir articulo al carrito
function añadirArticuloACarrito(oEvento){
    let oE = oEvento || window.event;
    //Cogemos el objeto artículo y lo añadimos a la linea de artículo ----- idLinea, oArt, oVenta, unid
    let oArticulo = oUpoBebe._buscarArticulo(oE.target.parentNode.parentNode.dataset.id);
    
        if(oUpoBebe.añadirLineaArticulo(new LineaDeArticulo(idLinea, oArticulo, null, 1))){
            //Si no existe aún lo añade como una nueva linea
            idLinea++;
            alert("Artículo añadido al carrito");

        }else{
            //Buscar esa linea de pedido y sumarle una unidad al producto si ya existia
            oUpoBebe.tLineaArticulo.forEach(linea =>{
                if(linea.oVenta == null && linea.oArt.nombreArticulo == oArticulo.nombreArticulo){
                    linea.unidades = linea.unidades+1;
                }
            });
        }
}

// mostrar alta reparacion
function fMostrarAltaReparacion()
{
    fOcultarFormularios();
    fOcultarTablasListado();
    fBorrarDesplegableArticulo();
    fBorrarDesplegableTaller();
    frmAltaReparacion.reset();
    frmAltaReparacion.style.display = "block";
}
// cuando le damos al boton buscar:
document.getElementById("btnBuscarVenta").addEventListener("click", fBuscarVenta,false);
// cuando le damos al boton AceptarReparacion:
document.getElementById("aceptarAltaReparacion").addEventListener("click", faceptarReparacion,false);


function fBuscarVenta(){
    //fBuscaDatos();
    
    let idVenta = frmAltaReparacion.txtIdVenta.value.trim();

    let busquedaVenta = oUpoBebe._buscarVenta(idVenta);
    if(busquedaVenta == null){
        alert("Ese ID de VENTA no existe");
    }else{
        fMostarDesplegables(busquedaVenta);
    }
    
}

function fMostarDesplegables(venta){
    fBorrarDesplegableArticulo();
    //talleres:
    let arrayTaller = oUpoBebe.tTalleres;
    let taller = document.getElementById("comboBoxTaller");
    //let oTalleres = oXML.querySelectorAll("taller");
    
    for (var i = 0; i < arrayTaller.length; i++) {
        //Crear option
         var oOption = document.createElement("option");
         oOption.value = arrayTaller[i].nombreTaller;
         oOption.textContent = arrayTaller[i].nombreTaller;

        //Agregar option en el último lugar
        taller.appendChild(oOption);
    }

    
    let articulo = document.getElementById("comboBoxArticulos");
    for(let i=0; i<venta.aLineaArticulo.length; i++){
        let nombresArticulos =venta.aLineaArticulo[i].oArt.nombreArticulo;
        var oOption = document.createElement("option");
        oOption.value = nombresArticulos;
        oOption.textContent = nombresArticulos;

        articulo.appendChild(oOption);

    }
    
    
}

function fBorrarDesplegableArticulo(){
    document.querySelectorAll("#comboBoxArticulos option").forEach(option=>option.remove());
}
function fBorrarDesplegableTaller(){
    document.querySelectorAll("#comboBoxTaller option").forEach(option=>option.remove());
}

//cuando click boton AceptarReparacion:
function faceptarReparacion(){
    let idVenta = frmAltaReparacion.txtIdVenta.value.trim();
    let articulo = document.getElementById("comboBoxArticulos").value;
    let taller = document.getElementById("comboBoxTaller").value;
    let descripcion = document.getElementById("areaObservaciones").value;
    let fecha = document.getElementById("fechaReparacion").value;
    limpiarError();
    let oVenta = oUpoBebe._buscarVenta(idVenta);
    if(idVenta == "" || oVenta == null){
        alert("Debe introducir un ID de venta válido");
        frmAltaReparacion.txtIdVenta.classList.add("error");
        frmAltaReparacion.txtIdVenta.focus();
    }else{
        //Buscar el oArticulo
        let oArticulo;
       oVenta.aLineaArticulo.forEach(function(lineaArt){
           if(lineaArt.oArt.nombreArticulo == articulo){
               oArticulo = lineaArt.oArt;
           }
       });
       //Buscar oTaller
       let oTaller;
       oUpoBebe.tTalleres.forEach(t => {
           if(t.nombreTaller == taller){
               oTaller = t;
           }
       })
        if(descripcion == ""){
            alert("\nEscriba en observaciones, el error del articulo");
            frmAltaReparacion.areaObservaciones.classList.add("error");
            frmAltaReparacion.areaObservaciones.focus();
        }else{
            if(oUpoBebe.reparar(new Reparacion(idReparacion, oVenta, oArticulo,oTaller,descripcion,fecha))){
                idReparacion++;
                alert("Reparación realizada con éxito");
            }else{
                alert("Esta reparación ya está registrada");
            }
        }
    }
    
}
function limpiarError() {
    frmAltaReparacion.txtIdVenta.classList.remove("error");
    
}
// fin alta reparacion


//Filtardo de la tabla artículos:
document.getElementById("buscarPorNombre").addEventListener("click", fFiltrarPorNombre, false);
document.getElementById("limpiarBusqueda").addEventListener("click", fLimpiarFiltros, false);
document.getElementById("selectCat").addEventListener("change", fCategoria, false);

function fFiltrarPorNombre(){
    let nombreABuscar = document.getElementById("filtrarPorNombre").value.trim();

    
    let tdNombres = document.querySelectorAll("#tabla tbody tr td:first-child");
    let check = false;
    if(nombreABuscar == ""){
        alert("No ha introducido ninguna cadena de texto");
    }else{
        for(let i = 0; i<tdNombres.length ; i++){
            if(tdNombres[i].textContent.indexOf(nombreABuscar) != -1){
                check = true;
            }
        }
        if(check){
            for(let i = 0; i<tdNombres.length ; i++){
                if(tdNombres[i].textContent.indexOf(nombreABuscar) == -1){
                    tdNombres[i].parentNode.remove();
                }
            }
        }else{
            alert("No hay mingún producto que contenga esa cadena");
        }
    }
    
}
window.addEventListener("load", function(){let oXML = loadXMLDoc("datosUpoBebe.xml");
    
//Datos categorías
let oCategorias = oXML.querySelectorAll("categoria");
for(let i = 0 ; i < oCategorias.length ; i++){
    let nombre = oCategorias[i].querySelector("nombre").textContent;
    let option = document.createElement("option");
    option.textContent = nombre;
    option.value = nombre;
    document.getElementById("selectCat").appendChild(option);
}});

function fCategoria(oEvento){
    let oE = oEvento || window.event;

    if(oE.target.value == 0){
        fMostrarListadoArticulo();
    }else{
        let categoria = oE.target.value;
        let tdCategorias = document.querySelectorAll("#tabla tbody tr td:nth-child(3)");
        for(let i = 0; i<tdCategorias.length ; i++){
            if(tdCategorias[i].textContent.indexOf(categoria) == -1){
                tdCategorias[i].parentNode.remove();
            }
        }
    }
}

function fLimpiarFiltros(){
    document.getElementById("filtrarPorNombre").value = "";
    fMostrarListadoArticulo();

}
// Convierte una fecha DD/MM/AAAA a Date
function fechaToDate(fecha){
    let dia = fecha.split("/")[0];
    let mes = fecha.split("/")[1];
    let año = fecha.split("/")[2];
    return new Date(año + "/" + mes + "/" + dia);
}
"use strict";
var oUpoBebe = new UpoBebe();
var idLinea = 0;
var idVenta = 0;
var contadorTotalLineas;
fDatosIniciales();

fOcultarFormularios();
fOcultarTablasListado();



//Mostrar listado de artículos por defecto
window.addEventListener("load", fMostrarListadoArticulo);
//mostrar pagina principal - evento:
document.getElementById("mostrarPaginaPrincipal").addEventListener("click",fMostrarPaginaPrincipal,false);

//mostrar formularios:
document.getElementById("altaArticulo").addEventListener("click",fMostrarAltaArticulo,false);
document.getElementById("altaCliente").addEventListener("click",fMostarAltaCliente,false);
document.getElementById("altaEmpleado").addEventListener("click",fMostarAltaEmpleado,false);
document.getElementById("altaTaller").addEventListener("click",fMostrarAltaTaller,false);
document.getElementById("fMostrarBajaModificarCliente").addEventListener("click", fMostrarBajaModificarCliente, false);
document.getElementById("altaReparacion").addEventListener("click", fMostrarAltaReparacion, false);

//evento - mostrar listado
document.getElementById("mostrarListadoVentas").addEventListener("click",fMostrarListadoVentas,false);
document.getElementById("mostrarListadoEmpleados").addEventListener("click",fMostrarListadoEmpleados,false);
document.getElementById("mostrarListadoCliente").addEventListener("click",fMostrarListadoCliente,false);
document.getElementById("mostrarListadoTaller").addEventListener("click",fMostrarListadoTaller,false);
document.getElementById("mostrarListadoArticulo").addEventListener("click",fMostrarListadoArticulo,false);
document.getElementById("mostrarListadoPeriodoVendidos").addEventListener("click",fMostrarListadoPeriodoVendidos,false);
document.getElementById("mostrarListadoPeriodoComprados").addEventListener("click",fMostrarListadoPeriodoComprados,false);
//evento - mostrar carrito:
document.getElementById("mostrarCarrito").addEventListener("click",fMostrarCarrito,false);

//eventos - botones Dar de ALTA:
document.getElementById("aceptarAltaEmpleado").addEventListener("click",fAltaEmpleado,false);
document.getElementById("aceptarAltaCliente").addEventListener("click",aceptarAltaCliente,false);
document.getElementById("aceptarAltaArticulo").addEventListener("click",altaArticulo,false);
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
        }
        //Datos clientes
        let oCLientes = oXML.querySelectorAll("cliente");
        for(let i=0;i < oCLientes.length ; i++){
            let dni = oCLientes[i].querySelector("dni").textContent;
            let nombre = oCLientes[i].querySelector("nombre").textContent;
            let apellidos = oCLientes[i].querySelector("apellidos").textContent;
            let direccion = oCLientes[i].querySelector("direccion").textContent;
            let correo = oCLientes[i].querySelector("correo").textContent;
            let tlf = oCLientes[i].querySelector("telefono").textContent;

            oUpoBebe.altaCliente(new Cliente(dni, nombre, apellidos, direccion, correo, tlf));
        }
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
    frmAltaEmpleado.style.display = "none";
    frmAltaArticulo.style.display = "none";
    frmAltaCliente.style.display = "none";
    frmAltaTaller.style.display = "none";
    frmModCliente.style.display = "none";
    frmAltaReparacion.style.display = "none";
    document.getElementById("formularioCompra").style.visibility = "hidden";
    if(document.getElementById("tablaCarrito")){
        document.getElementById("tablaCarrito").style.display = "none";
    }
}
function fMostrarPaginaPrincipal(){
    //le damos al LOGO/HOME:
    fOcultarFormularios();
    fOcultarTablasListado();
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
// EMPLEADO
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
    //document.getElementById("tabla").innerHTML = oUpoBebe.listadoEmpleados();
    let tablaAMostrar = oUpoBebe.listadoEmpleados();
    document.getElementById("tabla").append(tablaAMostrar);
    
}
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
function fMostrarAltaArticulo(oEvento)
{
    var oE = oEvento || window.event;
    fOcultarFormularios();
    fOcultarTablasListado();
   frmAltaArticulo.style.display = "block";
    frmAltaArticulo.reset();
}

function fMostrarListadoArticulo(){
    fOcultarFormularios();
    fOcultarTablasListado();
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
    let tablaAMostrar = oUpoBebe.listadoVentas();
    document.getElementById("tabla").append(tablaAMostrar);
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

        /*
        let oEmpleado = new Empleado(sNifEmpleado,sNombreEmpleado,sApellidosEmpleado,fSalarioEmpleado,sDireccionEmpleado,sCorreoEmpleado,sRolEmpleado,iTlfEmpleado);


        if(oUpoBebe.altaEmpleado(oEmpleado))
        {
            alert("Dado de alta");
            frmAltaEmpleado.reset();
        }else{
            alert("El empleado YA EXISTE con ese DNI");
            
        }
        */
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
            
            //let oEmpleado = new Empleado(sNifEmpleado,sNombreEmpleado,sApellidosEmpleado,fSalarioEmpleado,sDireccionEmpleado,sCorreoEmpleado,sRolEmpleado,iTlfEmpleado);
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
    
    
//fin alta empleado
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
            alert(oUpoBebe.altaCliente(new Cliente(dni, nombre, apellidos, direccion, correo, tlf)));
            frmAltaCliente.reset();
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


//Alta artículo
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

}
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
///////////////////////// Mostrar carrito /////////////////////////

function fMostrarCarrito(){

    /*if()){
        let contenedorLineas = document.getElementById("body").appendChild(document.createElement("DIV"));
        contenedorLineas.id = "divMensajeCarrito";
        contenedorLineas.appendChild(document.createElement("P")).appendChild(document.createTextNode("El carrito está vacío"));
    }*/
    
    
    //Si hay alguna linea que aun no se le ha asignado a una venta es porque esta en el carrito, entonces se pinta en pantalla:
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
//Pulsar el botón de comprar
function darAltaCompra(){
    //Recoger en variables los dni de cliente y vendedor
    let dniCliente = document.getElementById("dniCliente").value.trim();
    let dniEmpleado = document.getElementById("dniEmpleado").value.trim();
    //Comprobar que existan
    
    let oCliente = oUpoBebe.buscarCliente(dniCliente);
    let oEmpleado = oUpoBebe._buscarEmpleado(dniEmpleado);
    if(oCliente == null){
        alert("No hay ningún cliente con ese DNI");
        document.getElementById("dniCliente").classList.add("error");
        document.getElementById("dniCliente").focus();
    }else if(oEmpleado == null){
        alert("No hay ningún empleado con ese DNI");
        document.getElementById("dniEmpleado").classList.add("error");
        document.getElementById("dniEmpleado").focus();
        document.getElementById("dniCliente").classList.remove("error");
    }else{
        let arrayLineas = oUpoBebe.tLineaArticulo.filter(linea => linea.oVenta == null);
        let fecha = new Date().getDate + "/" + (new Date().getMonth() +1) + "/" + new Date().getFullYear();
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

    //articulos segun el idVentas:
    console.log(venta.aLineaArticulo);
    let articulo = document.getElementById("comboBoxArticulos");
    for(let i=0; i<venta.aLineaArticulo.length; i++){
        let nombresArticulos =venta.aLineaArticulo[i].oArt.nombreArticulo;
        var oOption = document.createElement("option");
        oOption.value = nombresArticulos;
        oOption.textContent = nombresArticulos;

        articulo.appendChild(oOption);

    }
    
}



//cuando click boton AceptarReparacion:
function faceptarReparacion(){
    let idVenta = frmAltaReparacion.txtIdVenta.value.trim();
    let articulo = document.getElementById("comboBoxArticulos").value;
    let taller = document.getElementById("comboBoxTaller").value;
    let descripcion = document.getElementById("areaObservaciones").value;
    let fecha = document.getElementById("fechaReparacion").value;
    limpiarError();
    if(idVenta = ""){
        alert("Debe introducir un ID de venta");
        frmAltaReparacion.txtIdVenta.classList.add("error");
        frmAltaReparacion.txtIdVenta.focus();
    }else{
      

    }
    
}
function limpiarError() {
    frmAltaReparacion.txtIdVenta.classList.remove("error");
    
}
// fin alta reparacion

"use strict";
var oUpoBebe = new UpoBebe();
fDatosIniciales();
fOcultarFormularios();
fOcultarTablasListado();
document.addEventListener(onload, f, false);

// DATOS INICIALES EN LOS LISTADOS:
    function fDatosIniciales(){

        // Datos empleados
        oUpoBebe.altaEmpleado(new Empleado ("111A","Lola","Lorenzo Lomas",1004.02,"Calle 1","lola@email.com","Encargada",999999999));
        oUpoBebe.altaEmpleado(new Empleado ("222A","Juan","Rodríguez Tomás",960.02,"Calle 2","juan@email.com","Dependiente",888888888));
        oUpoBebe.altaEmpleado(new Empleado ("333A","Ana","Pérez Ramona",1200,"Calle 3","ana@email.com","Jefa",777777777));
    }
// fin de datos INICIALES

// mostrar y ocultar formularios cuando hacemos click:
function fOcultarFormularios(){
    frmAltaEmpleado.style.display = "none";
    frmAltaArticulo.style.display = "none";
    frmAltaCliente.style.display = "none";
    frmAltaTaller.style.display = "none";
}
function fMostrarPaginaPrincipal(){
    //le damos al LOGO/HOME:
    fOcultarFormularios();
    fOcultarTablasListado();
    // Mostrar por defecto la lista de los artículos
}
function fOcultarTablasListado(){
    document.getElementById("tabla").style.display = "none";
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
function fMostrarAltaArticulo()
{
    fOcultarFormularios();
    fOcultarTablasListado();
    frmAltaArticulo.style.display = "block";
    frmAltaArticulo.reset();
}

function fMostrarListadoArticulo(){
    fOcultarFormularios();
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
// fin cliente

//taller
    function fMostrarAltaTaller(){
        fOcultarFormularios();
        fOcultarTablasListado();
        frmAltaTaller.style.display = "block";
        frmAltaTaller.reset();
    }

    function fMostrarListadoTaller(){

    }
// fin taller

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

//** fin ALTAS */
///////////////////////// Mostrar carrito /////////////////////////

function fMostrarCarrito(){
    fOcultarFormularios();
    fOcultarTablasListado();
    console.log(oUpoBebe.tLineaArticulo.length);
    let contenedorLineas = document.getElementById("body").appendChild(document.createElement("DIV"));
    //Si hay alguna linea que aun no se le ha asignado a una venta es porque esta en el carrito, entonces se pinta en pantalla:
    if( oUpoBebe.tLineaArticulo.length == 0 || oUpoBebe.tLineaArticulo[(oUpoBebe.tLineaArticulo.length-1)].oVenta != null){
        contenedorLineas.appendChild(document.createElement("P")).appendChild(document.createTextNode("El carrito está vacío"));
    }else{
        let contadorTotalLineas = 0;
        let tablaLineas = document.createElement("TABLE");
        let filaCabecera = tablaLineas.createTHead().insertRow(-1);
        filaCabecera.insertCell(-1).textContent = "ARTÍCULO";
        filaCabecera.insertCell(-1).textContent = "UNIDADES";
        filaCabecera.insertCell(-1).textContent = "PRECIO";
        filaCabecera.insertCell(-1).textContent = "TOTAL DE LÍNEA";
        let cuerpoTabla = tablaLineas.createTBody();
        oUpoBebe.tLineaArticulo.forEach(elemento =>{
            if(elemento.oVenta == null){
                let fila = cuerpoTabla.insertRow(-1);
                fila.insertCell(-1).textContent = elemento.oArt.nombreArticulo;
                fila.insertCell(-1).textContent = elemento.unidades;
                fila.insertCell(-1).textContent = elemento.oArt.precioArticulo;
                fila.insertCell(-1).textContent = elemento.totalLinea();
                contadorTotalLineas += elemento.totalLinea();
            }
            let fila = cuerpoTabla.insertRow(-1);
            let celda = fila.insertCell(-1);
            celda.textContent("TOTAL PEDIDO");
            celda.setAttribute("rowspan", "3");
            fila.insertCell(-1).textContent = contadorTotalLineas;
            //QUEDA AÑADIR LOS BOTONES
        });

    }
}

function f(){
    let oL = new LineaDeArticulo(1, null, null, 2, 3);
    let oU = new UpoBebe(); 
    oU.tLineaArticulo.push(oL);
    oU.tLineaArticulo.push(oL);
    oU.tLineaArticulo.push(oL);
}
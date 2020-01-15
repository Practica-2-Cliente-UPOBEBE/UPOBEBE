"use strict";
var oUpoBebe = new UpoBebe();
fDatosIniciales();
fOcultarFormularios();
fOcultarTablasListado();


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
    document.getElementById("tabla").style.display = "block";
    document.getElementById("tabla").innerHTML = oUpoBebe.listadoEmpleados();
}
// fin EMPLEADO

// Articulo
 function fMostrarAltaArticulo()
{
    fOcultarFormularios();
    fOcultarTablasListado();
    frmAltaArticulo.style.display = "block";
    frmAltaArticulo.reset();
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
    //Borrar los nodos hijos de la tabla
    while (document.getElementById("tabla").firstChild) {
        document.getElementById("tabla").removeChild(document.getElementById("tabla").firstChild);
      }
    //Añadir las filas a la tabla
    oUpoBebe.tClientes.forEach(element => {
        document.getElementById("tabla").appendChild(element.toString()); 
    });
    
    document.getElementById("tabla").style.display = "block";
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
        if(dni == ""){
            bValido = false;
            mensaje += "\nDebe rellenar el campo DNI";
            frmAltaCliente.dni.classList.add("error");
            frmAltaCliente.dni.focus();
        }
        if(nombre == ""){
            if(bValido){
                bValido = false;
                frmAltaCliente.nombre.focus();
            }
            frmAltaCliente.nombre.classList.add("error");
            mensaje += "\nDebe rellenar el campo Nombre";
        }
        if(apellidos == ""){
            if(bValido){
                bValido = false;
                frmAltaCliente.apellidos.focus();
            }
            mensaje += "\nDebe rellenar el campo Apellidos";
            frmAltaCliente.apellidos.classList.add("error");
        }
        if(direccion == ""){
            if(bValido){
                bValido = false;
                frmAltaCliente.direccion.focus();
            }
            mensaje += "\nDebe rellenar el campo Dirección";
            frmAltaCliente.direccion.classList.add("error");
        }
        if(correo == ""){
            if(bValido){
                bValido = false;
                frmAltaCliente.correo.focus();
            }
            mensaje += "\nDebe rellenar el campo Correo";
            frmAltaCliente.correo.classList.add("error");
        }
        if(tlf == ""){
            if(bValido){
                bValido = false;
                frmAltaCliente.tlf.focus();
            }
            mensaje += "\nDebe rellenar el campo Teléfono";
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

//** fin ALTAS */
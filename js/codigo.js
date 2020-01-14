"use strict";
var oUpoBebe = new UpoBebe();
fDatosIniciales();
fOcultarFormularios();
fOcultarTablasListado();


// DATOS INICIALES EN LOS LISTADOS:
function fDatosIniciales() {

    // Datos empleados
    oUpoBebe.altaEmpleado(new Empleado("111A", "Lola", "Lorenzo Lomas", 1004.02, "Calle 1", "lola@email.com", "Encargada", 999999999));
    oUpoBebe.altaEmpleado(new Empleado("222A", "Juan", "Rodríguez Tomás", 960.02, "Calle 2", "juan@email.com", "Dependiente", 888888888));
    oUpoBebe.altaEmpleado(new Empleado("333A", "Ana", "Pérez Ramona", 1200, "Calle 3", "ana@email.com", "Jefa", 777777777));
}
// fin de datos INICIALES

// mostrar y ocultar formularios cuando hacemos click:
function fOcultarFormularios() {
    frmAltaEmpleado.style.display = "none";
    frmAltaArticulo.style.display = "none";
    frmAltaCliente.style.display = "none";
    frmAltaTaller.style.display = "none";
}

function fMostrarPaginaPrincipal() {
    //le damos al LOGO/HOME:
    fOcultarFormularios();
    fOcultarTablasListado();
}

function fOcultarTablasListado() {
    document.getElementById("tabla").style.display = "none";
}
// EMPLEADO
function fMostarAltaEmpleado() {
    fOcultarFormularios();
    fOcultarTablasListado();
    frmAltaEmpleado.style.display = "block";
    frmAltaEmpleado.reset();
}

function fMostrarListadoEmpleados() {
    fOcultarFormularios();
    document.getElementById("tabla").style.display = "block";
    document.getElementById("tabla").innerHTML = oUpoBebe.listadoEmpleados();
}
// fin EMPLEADO

// Articulo
function fMostrarAltaArticulo() {
    fOcultarFormularios();
    fOcultarTablasListado();
    frmAltaArticulo.style.display = "block";
    frmAltaArticulo.reset();
}
// fin articulo

// Cliente
function fMostarAltaCliente() {
    fOcultarFormularios();
    fOcultarTablasListado();
    frmAltaCliente.reset();
    frmAltaCliente.style.display = "block";


}

function fMostrarListadoCliente() {

}
// fin cliente

//taller
function fMostrarAltaTaller() {
    fOcultarFormularios();
    fOcultarTablasListado();
    frmAltaTaller.style.display = "block";
    frmAltaTaller.reset();
}

function fMostrarListadoTaller() {

}
// fin taller

// FIN mostrar y ocultar formularios


//**** ALTAS  *******************************/
// alta Empleado
function fAltaEmpleado() {
    frmAltaEmpleado.aceptarAltaEmpleado.addEventListener("click", fValidarAltaEmpleado, false);
    /*
        let sNifEmpleado = frmAltaEmpleado.txtNIF.value.trim();
        let sNombreEmpleado = frmAltaEmpleado.txtNombreEmpleado.value.trim();
        let sApellidosEmpleado = frmAltaEmpleado.txtApellidoEmpleado.value.trim();
        let fSalarioEmpleado = frmAltaEmpleado.txtSalarioEmpleado.value.trim();
        let sDireccionEmpleado = frmAltaEmpleado.txtDireccionEmpleado.value.trim();
        let sCorreoEmpleado = frmAltaEmpleado.txtCorreoEmpleado.value.trim();
        let sRolEmpleado = frmAltaEmpleado.txtRolEmpleado.value.trim();
        let iTlfEmpleado = frmAltaEmpleado.txtTlfEmpleado.value.trim();

        let oEmpleado = new Empleado(sNifEmpleado,sNombreEmpleado,sApellidosEmpleado,fSalarioEmpleado,sDireccionEmpleado,sCorreoEmpleado,sRolEmpleado,iTlfEmpleado);

        if(oUpoBebe.altaEmpleado(oEmpleado))
        {
            alert("Dado de alta");
            frmAltaEmpleado.reset();
        }else{
            alert("El empleado YA EXISTE con ese DNI");
            
        }
      */

}

function fValidarAltaEmpleado(oEvento) {

    var oE = oEvento || window.event;
    var bValido = true;
    var sError = "";
    limpiarErrores();

    let sNifEmpleado = frmAltaEmpleado.txtNIF.value.trim();
    //let oExpRep = ;

}

//fin alta empleado
//Alta cliente
function aceptarAltaCliente() {
    let dni = frmAltaCliente.dni.value.trim();
    let nombre = frmAltaCliente.nombre.value.trim();
    let apellidos = frmAltaCliente.apellidos.value.trim();
    let direccion = frmAltaCliente.direccion.value.trim();
    let correo = frmAltaCliente.correo.value.trim();
    let tlf = frmAltaCliente.tlf.value.trim();
    let mensaje = "ERROR:";
    let bValido = true;
    limpiarErrores();
    if (dni == "") {
        bValido = false;
        mensaje += "\nDebe rellenar el campo DNI";
        frmAltaCliente.dni.classList.add("error");
        frmAltaCliente.dni.focus();
    }
    if (nombre == "") {
        if (bValido) {
            bValido = false;
            frmAltaCliente.nombre.focus();
        }
        frmAltaCliente.nombre.classList.add("error");
        mensaje += "\nDebe rellenar el campo Nombre";
    }
    if (apellidos == "") {
        if (bValido) {
            bValido = false;
            frmAltaCliente.apellidos.focus();
        }
        mensaje += "\nDebe rellenar el campo Apellidos";
        frmAltaCliente.apellidos.classList.add("error");
    }
    if (direccion == "") {
        if (bValido) {
            bValido = false;
            frmAltaCliente.direccion.focus();
        }
        mensaje += "\nDebe rellenar el campo Dirección";
        frmAltaCliente.direccion.classList.add("error");
    }
    if (correo == "") {
        if (bValido) {
            bValido = false;
            frmAltaCliente.correo.focus();
        }
        mensaje += "\nDebe rellenar el campo Correo";
        frmAltaCliente.correo.classList.add("error");
    }
    if (tlf == "") {
        if (bValido) {
            bValido = false;
            frmAltaCliente.tlf.focus();
        }
        mensaje += "\nDebe rellenar el campo Teléfono";
        frmAltaCliente.tlf.classList.add("error");
    }
    if (!bValido) {
        alert(mensaje);
    } else {
        alert(oUpoBebe.altaCliente(new Cliente(dni, nombre, apellidos, direccion, correo, tlf)));
    }

    function limpiarErrores() {
        frmAltaCliente.dni.classList.remove("error");
        frmAltaCliente.nombre.classList.remove("error");
        frmAltaCliente.apellidos.classList.remove("error");
        frmAltaCliente.direccion.classList.remove("error");
        frmAltaCliente.correo.classList.remove("error");
        frmAltaCliente.tlf.classList.remove("error");
    }
}
//Fin alta cliente

function altaArticulo() {
    let sIDArticulo = frmAltaArticulo.txtIDArticulo.value.trim();
    let sNombreArticulo = frmAltaArticulo.txtNombreArticulo.value.trim();
    let sDescripcionArticulo = frmAltaArticulo.txtDescripcionArticulo.value.trim();
    let sCategoria = frmAltaArticulo.selectCategoria.value;
    let fPrecioArticulo = parseFloat(frmAltaArticulo.txtPrecioArticulo.value.trim());
    let mensaje = "ERROR:";
    let bValido = true;
    limpiarErrores();
    if (sIDArticulo == "") {
        bValido = false;
        mensaje += "\nDebe rellenar el campo ID";
        frmAltaArticulo.txtIDArticulo.classList.add("error");
        frmAltaArticulo.txtIDArticulo.focus();
    }
    if (sNombreArticulo == "") {
        bValido = false;
        mensaje += "\nDebe rellenar el campo nombre";
        frmAltaArticulo.txtNombreArticulo.classList.add("error");
        frmAltaArticulo.txtNombreArticulo.focus();
    }

    if (sDescripcionArticulo == "") {
        bValido = false;
        mensaje += "\nDebe rellenar el campo descripcion";
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
//Fin alta cliente

//** fin ALTAS */
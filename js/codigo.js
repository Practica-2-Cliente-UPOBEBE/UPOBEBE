"use strict";
var oUpoBebe = new UpoBebe();
//fDatosIniciales();
fOcultarFormularios();


// mostrar y ocultar formularios cuando hacemos click:
function fOcultarFormularios(){

    frmAltaEmpleado.style.display = "none";
}
function fMostrarPaginaPrincipal(){
    //le damos al LOGO/HOME:
    fOcultarFormularios();
}

function fMostarAltaEmpleado(){
    fOcultarFormularios();
    frmAltaEmpleado.style.display = "block";
    frmAltaEmpleado.reset();
}

// FIN mostrar y ocultar formularios
"use strict";
var oUpoBebe = new UpoBebe();
fDatosIniciales();
fOcultarFormularios();


// DATOS INICIALES EN LOS LISTADOS:
    function fDatosIniciales(){

        // Datos empleados
        oUpoBebe.altaEmpleado(new Empleado ("111A","Lola","Lorenzo Lomas",1004.02,"lola@email.com","Encargada",999999999));
        oUpoBebe.altaEmpleado(new Empleado ("222A","Juan","Rodríguez Tomás",960.02,"juan@email.com","Dependiente",888888888));
        oUpoBebe.altaEmpleado(new Empleado ("333A","Ana","Pérez Ramona",1200,"ana@email.com","Jefa",777777777));
    }
// fin de datos INICIALES

// mostrar y ocultar formularios cuando hacemos click:
function fOcultarFormularios(){

    frmAltaEmpleado.style.display = "none";
}
function fMostrarPaginaPrincipal(){
    //le damos al LOGO/HOME:
    fOcultarFormularios();
}
// EMPLEADO
function fMostarAltaEmpleado(){
    fOcultarFormularios();
    frmAltaEmpleado.style.display = "block";
    frmAltaEmpleado.reset();
}
function fMostrarListadoEmpleados(){
    fOcultarFormularios();
    document.getElementById("tabla").innerHTML = oUpoBebe.listadoEmpleados();
}
// fin EMPLEADO

// FIN mostrar y ocultar formularios
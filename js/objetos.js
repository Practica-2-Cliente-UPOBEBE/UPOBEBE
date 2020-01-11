//CLASE UPOBEBE
function UpoBebe(){
    this.tClientes = new Array();
    this.tEmpleados = new Array();
    this.tVentas = new Array();
    this.tArticulos = new Array();
    this.tTalleres = new Array();
}

//métodos de la clase UPOBEBE

///*****ALTAS  */
UpoBebe.prototype.altaCliente = function(oCliente){

}

UpoBebe.prototype.altaArticulo = function(oArticulo){

}

UpoBebe.prototype.altaEmpleado = function(oEmpleado){
    var añadido = false;

    if(this._buscarEmpleado(oEmpleado.dniEmpleado) == null){
        this.tEmpleados.push(oEmpleado);
        añadido = true;
    }

    return añadido;
}

UpoBebe.prototype.altaTaller = function(oTaller){

}

//****FIN ALTAS */

//****BUSQUEDAS ***métodos de búsquedas:
UpoBebe.prototype._buscarEmpleado = function(sDNI){
    var oEmpleado = null;
    var i = 0;

    while(i < this.tEmpleados.length && oEmpleado == null){
        
        if(this.tEmpleados[i].dni == sDNI){
            oEmpleado = this.tEmpleados[i];
        }
        i++;
    }

    return oEmpleado;
}

//******fin métodos de búsquedas

//*** Método reparar */
    UpoBebe.prototype.reparar = function(sNifTaller,sIDventas,sNombreReparacion,sDescripcionRep,fCosteRep,dcFechaRep){
        var cReparado = false;
        var oTaller = this._buscarTaller(sNif);
        var oVenta = this._buscarVenta(sID);
        


        return cReparado;

    }
//** fin método REPARAR */




//fin métodos de la clase UPOBEBE
//fin clase UPO BEBE*****************************************************************************

//clase EMPLEADO
class Empleado{

    constructor(sDNI,sNombre,sApellidos,fSalario,sDireccion,sCorreo,sRol,iTelefono){
        this.dniEmpleado = sDNI;
        this.nombreEmpleado = sNombre;
        this.apellidosEmpleado = sApellidos;
        this.salarioEmpleado = parseFloat(fSalario);
        this.direccionEmpleado = sDireccion;
        this.correoEmpleado = sCorreo;
        this.rolEmpleado = sRol;
        this.telefonoEmpleado = parseInt(iTelefono);
    }
    toHTMLrow(){
        var sFila="<tr>";
	    sFila+="<td>"+this.dniEmpleado+"</td>";
	    sFila+="<td>"+this.nombreEmpleado+"</td>";
	    sFila+="<td>"+this.apellidosEmpleado+"</td>";
        sFila+="<td>"+this.salarioEmpleado+"</td>";
        sFila+="<td>"+this.direccionEmpleado+"</td>";
        sFila+="<td>"+this.correoEmpleado+"</td>";
        sFila+="<td>"+this.rolEmpleado+"</td>";
        sFila+="<td>"+this.telefonoEmpleado+"</td>";
	    sFila+="</tr>";
	    return sFila;
    }
}
// fin clase EMPLEADO

// Clase Reparación:
class Reparacion{

    constructor(sNombre,sDescripcion,fCoste,dtFecha_Reparacion){
        this.nombreReparacion = sNombre;
        this.descripcionReparacion = sDescripcion;
        this.costeReparacion = parseFloat(fCoste);
        this.fecha_reparacion = dtFecha_Reparacion;

    }
    toString(){
        var sFila="<tr>";
	    sFila+="<td>"+this.nombreReparacion+"</td>";
	    sFila+="<td>"+this.descripcionReparacion+"</td>";
	    sFila+="<td>"+this.costeReparacion+"</td>";
        sFila+="<td>"+this.fecha_reparacion+"</td>";
	    sFila+="</tr>";
	    return sFila;
    }
}
//fin clase Reparación
//CLASE UPOBEBE
function UpoBebe(){
    this.tClientes = new Array();
    this.tEmpleados = new Array();
    this.tVentas = new Array();
    this.tArticulos = new Array();
    this.tTalleres = new Array();
    this.tReparaciones = new Array();
    
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

UpoBebe.prototype._buscarReparacion = function(sNombre){
    var oReparacion = null;
    var i = 0;
    
    while(i < this.tReparaciones.length && oReparacion == null){
        
        if(this.tEmpleados[i].dni == sDNI){
            oEmpleado = this.tEmpleados[i];
        }
        i++;
    }

    

    return oReparacion;
}

//******fin métodos de búsquedas

//*** Método reparar */
    UpoBebe.prototype.reparar = function(sNifTaller,sIDventas,sNombreReparacion,sDescripcionRep,fCosteRep,dcFechaRep){
        var cReparado = false;
        var oTaller = this._buscarTaller(sNifTaller);
        var oVenta = this._buscarVenta(sIDventas);
        var oReparacion = this._buscarReparacion(sNombreReparacion);
        var oReparacionHecha = null;

        



        return cReparado;

    }
//** fin método REPARAR */

// *********LISTADOS ******

UpoBebe.prototype.listadoEmpleados = function(){
    var tabla = '<h1>Empleados : </h1><table border="1"><thead><tr><th>DNI</th><th>Nombre</th><th>Apelldio</th><th>Salario</th><th>Dirección</th><th>Correo</th><th>Rol</th><th>Teléfono</th></tr></thead>';

    for(var i=0; i< this.tEmpleados.length; i++){
        tabla += this.tEmpleados[i].toHTMLrow();
    }
    tabla += "</table>";

    return tabla;
}

///**** FIN LISTADOS ************* */

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

    constructor(ID_Reparacion,ID_Articulo,ID_Venta,dtFecha_Reparacion){
        this.IDReparacion = ID_Reparacion;
        //DUDA SOBRE ID_ARTICULO e ID_VENTA viniendo de los objetos de estos// 
        this.fechaReparacion = dtFecha_Reparacion;

    }
    toString(){
        var sFila="<tr>";
	    sFila+="<td>"+this.IDReparacion+"</td>";
	    //sFila+="<td>"++"</td>";
	    //sFila+="<td>"++"</td>";
        
	    sFila+="</tr>";
	    return sFila;
    }
}
//fin clase Reparación

//Clase Venta:
class Venta{
    constructor(){
        
    }
}
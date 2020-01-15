"use strict";
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
    let mensaje;
    if(this.buscarCliente(oCliente.dniCliente) != null){
        mensaje = "ERROR: El cliente ya existe";
        console.log(this.buscarCliente(oCliente.dni))
    }else{
        this.tClientes.push(oCliente);
        mensaje = "Cliente añadido con éxito";
    }
        
    return mensaje;
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
    var array = this.tEmpleados.filter(tEmpleados => tEmpleados.dniEmpleado == sDNI);
    if(array.length>0){
        oEmpleado=array[0];
    }
    return oEmpleado;
    /*
    var i = 0;

    while(i < this.tEmpleados.length && oEmpleado == null){
        
        if(this.tEmpleados[i].dni == sDNI){
            oEmpleado = this.tEmpleados[i];
        }
        i++;
    }

    return oEmpleado;
    */
}

UpoBebe.prototype._buscarReparacion = function(sNombre){
    var oReparacion = null;
    var i = 0;
    
    while(i < this.tReparaciones.length && oReparacion == null){
        
        if(this.tEmpleados[i].nombre == sNombre){
            oEmpleado = this.tEmpleados[i];
        }
        i++;
    }

    

    return oReparacion;
}
UpoBebe.prototype.buscarCliente = function(dni){
    let oCliente = null;
    this.tClientes.forEach(function(value){
        if(value.dniCliente == dni) {
            oCliente=value;
        } 
    });
    return oCliente;
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
    var tabla = "<table border='1'><thead><tr><th>DNI</th><th>Nombre</th><th>Apelldio</th><th>Salario</th><th>Dirección</th><th>Correo</th><th>Rol</th><th>Teléfono</th></tr></thead>";

    for(var i=0; i< this.tEmpleados.length; i++){
        tabla += this.tEmpleados[i].toHTMLrow();
    }
    tabla += "</table>";

    return tabla;
}

UpoBebe.prototype.listadoClientes = function(){
    var tabla = "<table border='1'><thead><tr><th>DNI</th><th>Nombre</th><th>Apelldios</th><th>Dirección</th><th>Correo</th><th>Teléfono</th></tr></thead>";

    for(var i=0; i< this.tClientes.length; i++){
        tabla += this.tClientes[i].toString();
    }
    tabla += "</table>";

    return tabla;
}

///**** FIN LISTADOS ************* */

//fin métodos de la clase UPOBEBE
//fin clase UPO BEBE*****************************************************************************


//***** CLASES  */
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
        // carlos dice: que son objetos , oArticulo, oVenta y oTaller
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
//Clase LineaDeArticulo:
class LineaDeArticulo{
    constructor(idLinea, oArt, oVenta, unid, precio){
        this.idLinea = idLinea;
        this.oArt = oArt;
        // Carlos:
        //poner el objeto.  En objeto venta, crear LINEAS y que sea nulo en el constructo de objeto Venta
        //boton aceptar -> inserta todas las líneas en el objeto venta
        //en el propio método del objeto venta , agregamos la linea
        //oVenta -> método -> agregarlínea()
        //oVenta tendrá una array
        this.oVenta = oVenta;
        this.unidades = unid;
        this.precioArticulo = precio;
    }
    totalLinea(){
        return this.unidades * this.precioArticulo;
    }
    toString(){
        let sFila = "<tr><td>"+ this.aLineaArticulo.idArticulo +"</td>";
        sFila += "<td>"+ this.aLineaArticulo.idVenta +"</td>";
        sFila += "<td>"+ this.aLineaArticulo.unidades +"</td>";
        sFila += "<td>"+ this.aLineaArticulo.precioArticulo +"</td>";
        sFila += "<td>"+ this.aLineaArticulo.totalLinea() +"</td></tr>";
        return sFila;
    }
}
//Fin clase LineaDeArticulo

//Clase Venta:
class Venta{
    constructor(id, oCliente, oEmpleado, aLineaArticulo, fecha){
        this.idVenta = id;
        this.oCliente = oCliente;
        this.oEmpleado = oEmpleado;
        this.aLineaArticulo = aLineaArticulo;
        this.fVenta = fecha;
    }
    importe(){
        this.aLineaArticulo.reduce(function(total, valor){
            return total + valor.totalLinea();
        });
    }
    toString(){
        let nFilas = this.aLineaArticulo.length;
        let sFila="<tr>";
        sFila+="<td rowspan='"+ nFilas +"'>"+ this.idVenta +"</td>";
        for(let i = 0; i < nFilas ; i++){
            sFila += this.aLineaArticulo[i].toString();
        }
	    sFila+="<td rowspan='"+ nFilas +"'>"+ this.fVenta +"</td>";
	    return sFila;
    }
}
//Fin clase Venta

//Clase Cliente:
class Cliente{
    constructor(dni, nombre, apellidos, direccion, correo, tlf){
        this.dniCliente = dni;
        this.nombreCliente = nombre;
        this.apellidosCliente = apellidos;
        this.direccionCliente = direccion;
        this.correoCliente = correo;
        this.tlfCliente = tlf;
    }
    toString(){
        let tr = document.createElement("TR");
        let td1 = document.createElement("TD");
        let td2 = document.createElement("TD");
        let td3 = document.createElement("TD");
        let td4 = document.createElement("TD");
        let td5 = document.createElement("TD");
        let td6 = document.createElement("TD");
        
        
        td1.appendChild(document.createTextNode(this.dniCliente));
        td2.appendChild(document.createTextNode(this.nombreCliente));
        td3.appendChild(document.createTextNode(this.apellidosCliente));
        td4.appendChild(document.createTextNode(this.direccionCliente));
        td5.appendChild(document.createTextNode(this.correoCliente));
        td6.appendChild(document.createTextNode(this.tlfCliente));

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        return tr;


	    /*sFila+="<td>"+this.dniCliente+"</td>";
	    sFila+="<td>"+this.nombreCliente+"</td>";
	    sFila+="<td>"+this.apellidosCliente+"</td>";
        sFila+="<td>"+this.direccionCliente+"</td>";
        sFila+="<td>"+this.correoCliente+"</td>";
        sFila+="<td>"+this.tlfCliente+"</td>";
	    sFila+="</tr>";
	    return sFila;*/
    }
}
//Fin clase Cliente
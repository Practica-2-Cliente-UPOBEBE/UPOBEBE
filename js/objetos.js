"use strict";
//CLASE UPOBEBE
function UpoBebe(){
    this.tLineaArticulo = [];
    this.tClientes = [];
    this.tEmpleados = [];
    this.tVentas = [];
    this.tArticulos = [];
    this.tTalleres = [];
    this.tReparaciones = [];
    this.tCategorias = [];
    
}

//métodos de la clase UPOBEBE

///*****ALTAS  */
UpoBebe.prototype.añadirLineaArticulo = function(oLinea){
    let existeYa = this.tLineaArticulo.some(function(e){
        return e.oArt.nombreArticulo == oLinea.oArt.nombreArticulo && e.oVenta == null;
    });
    if(!existeYa){
        this.tLineaArticulo.push(oLinea);
        return true;
    }else
        return false;
}
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
UpoBebe.prototype.altaCategoria = function(oCategoria){
    this.tCategorias.push(oCategoria);
}
UpoBebe.prototype.altaArticulo = function(oArticulo){
    let mensaje;
    if (this._buscarArticulo(oArticulo.idArticulo) != null){
        mensaje = "ERROR: El artículo ya existe";
        console.log(this._buscarArticulo(oArticulo.sIdArticulo))
    }else{
        this.tArticulos.push(oArticulo);
        mensaje = "Artículo añadido"
    }
    return mensaje;
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
    let mensaje;
    if (this._buscarTaller(oTaller.nifTaller) != null){
        mensaje = "ERROR: El taller ya existe";
        console.log(this._buscarTaller(oTaller.sNifTaller))
    }else{
        this.tTalleres.push(oTaller);
        mensaje = "Taller añadido"
    }
    return mensaje;
}
UpoBebe.prototype.altaVenta = function(oVenta){
    //Si el dni del cliente y del empleado y la fecha son las mismas supondremos que es la misma compra y no se podrá realizar
    let existeYa = this.tVentas.some(function(e){
        return e.oCliente.dniCliente == oVenta.oCliente.dniCliente && e.oEmpleado.dniEmpleado == oVenta.oEmpleado.dniEmpleado && e.fVenta == oVenta.fVenta;
    });
    //Si el array de lineas esta vacío también da fallo
    if(!existeYa && oVenta.aLineaArticulo.length != 0){
        this.tVentas.push(oVenta);
        return true;
    }else
        return false;

}
//****FIN ALTAS */
// MODIFICAR/BORRAR CLIENTE:
UpoBebe.prototype.darDeBajaCliente = function(oCliente){
    let indiceABorrar = this.tClientes.findIndex(function(valor){
        return valor.dniCliente == oCliente.dniCliente;
    })
    this.tClientes.splice(indiceABorrar, 1);
    return "Cliente borrado con éxito";
} 
UpoBebe.prototype.modificarCliente = function(oCliente){
    if(this.buscarCliente(oCliente.dniCliente) == null){
        return "No hay ningún cliente con ese DNI";
    }else{
        let indiceAModificar = this.tClientes.findIndex(function(valor){
            return valor.dniCliente == oCliente.dniCliente;
        })
        this.tClientes[indiceAModificar].nombreCliente = oCliente.nombreCliente;
        this.tClientes[indiceAModificar].apellidosCliente = oCliente.apellidosCliente;
        this.tClientes[indiceAModificar].direccionCliente = oCliente.direccionCliente;
        this.tClientes[indiceAModificar].correoCliente = oCliente.correoCliente;
        this.tClientes[indiceAModificar].tlfCliente = oCliente.tlfCliente;
        return "Cliente modificado con éxito";
    }
    
}

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
UpoBebe.prototype._buscarTaller = function(sNifTaller){
    let oTaller = null;
    this.tTalleres.forEach(function(value){
        if(value.nifTaller == sNifTaller) {
            oTaller=value;
        } 
    });
    return oTaller;
}

UpoBebe.prototype._buscarArticulo = function(sIdArticulo){
    var oArticulo = null;
    this.tArticulos.forEach(function(value){
        if(value.idArticulo == sIdArticulo){
            oArticulo=value;
        }
    });
    return oArticulo;
}

UpoBebe.prototype._buscarVenta = function(sIDventa){
    let oVenta = null;
    this.tVentas.forEach(function(value){
        if(value.idVenta == sIDventa){
            oVenta = value;
        }
    });
    return oVenta;
}
// LO VEEES???????
//******fin métodos de búsquedas

//*** Método reparar */
    /*
    UpoBebe.prototype.reparar = function(sNifTaller,sIDventas,sNombreReparacion,sDescripcionRep,fCosteRep,dcFechaRep){
        var cReparado = false;
        var oTaller = this._buscarTaller(sNifTaller);
        var oVenta = this._buscarVenta(sIDventas);
        var oReparacion = this._buscarReparacion(sNombreReparacion);
        var oReparacionHecha = null;
        return cReparado;

    }*/
    UpoBebe.prototype.reparar =function(oReparacion){
        /*let reparar = false;
        let contador = 0;
        let oVenta = this._buscarVenta(idVenta);
        let articulo = this._buscarArticulo(idArticulo);
        let taller = this._buscarTaller(idTaller);
        let descripcion = sDescripcion;
        let fecha = dtFecha;
        let oReparacion = null;
        */



        //Si ya hay una reparación con ese id(lo cual es imposible que pase si los valores introducidos 
        //estan bién porque siempre le vamos a sumar uno al id despues de haberlo añadido..(pero lo comprobamos igualmente..)), 
        //entonces no lo añadimos:
        if(this.tReparaciones.some(function(valor){
            return valor.IDReparacion == oReparacion.IDReparacion;
        })){
            return false;
        }else{
            this.tReparaciones.push(oReparacion);
            return true;
        }

        /*if (this.tReparaciones.indexOf(articulo) == -1) {
            this.tReparaciones.push(articulo);
            reparar = true;
            contador++;
        } else if (this.tReparaciones.indexOf(articulo) > -1) {
           reparar = false;
        }
        if(reparar == true){
            oReparacion = new Reparacion(idReparacion,oVenta, articulo,taller,descripcion,fecha);
            return oReparacion;
        }
        else{
            return oReparacion;
        }*/
    }

//** fin método REPARAR */

// *********LISTADOS ******
UpoBebe.prototype.listadoVentas = function(){
    let tabla = document.getElementById("tabla");
    let cabecera = tabla.createTHead();
    let fila= cabecera.insertRow(-1);
    let celda = fila.insertCell(-1);
    celda.textContent = "ID";
    celda = fila.insertCell(-1);
    celda.textContent = "Nombre del cliente";
    celda = fila.insertCell(-1);
    celda.textContent = "Nombre del empleado";
    celda = fila.insertCell(-1);
    celda.textContent = "Lineas de los artículos";
    celda = fila.insertCell(-1);
    celda.textContent = "Total del pedido";
    celda = fila.insertCell(-1);
    celda.textContent = "Fecha";
    let cuerpito = document.createElement("tbody");
    this.tVentas.forEach(x =>{
        cuerpito.appendChild(x.toString());
    });
    tabla.appendChild(cuerpito);
    return tabla;

}
Array.prototype.swap = function (x,y) {
	var b = this[x];
	this[x] = this[y];
	this[y] = b;
	return this;
  }
UpoBebe.prototype.listadoVentasPeriodo = function(fInicio,fFin){
    let dtInicio =fInicio;
    let dtFin = fFin;
    
    let tabla = document.getElementById("tabla");
    let cabecera = tabla.createTHead();
    let fila= cabecera.insertRow(-1);
    let celda = fila.insertCell(-1);
    celda.textContent = "ID";
    celda = fila.insertCell(-1);
    celda.textContent = "Nombre del cliente";
    celda = fila.insertCell(-1);
    celda.textContent = "Nombre del empleado";
    celda = fila.insertCell(-1);
    celda.textContent = "Lineas de los artículos";
    celda = fila.insertCell(-1);
    celda.textContent = "Total del pedido";
    celda = fila.insertCell(-1);
    celda.textContent = "Fecha";
    let cuerpito = document.createElement("tbody");

    let arrayVentasPeriodo = [];
    for(let i=0; i<this.tVentas.length;i++){
        let fVenta = fechaToDate(this.tVentas[i].fVenta)
        if(fVenta>dtInicio && fVenta<dtFin){
            arrayVentasPeriodo.push(this.tVentas[i]);
        }
    }
/*
    for(let i=0;i<(arrayVentasPeriodo.length-1);i++){
        for(let j=i+1;j<arrayVentasPeriodo.length;j++){
            if(arrayVentasPeriodo[i].fecha>arrayVentasPeriodo[j].fecha)
                arrayVentasPeriodo.swap(i,j);
        }
    }
*/
    for(let i=0; i<arrayVentasPeriodo.length; i++){
        let idVenta = arrayVentasPeriodo[i].idVenta;
        let oCliente = arrayVentasPeriodo[i].oCliente;
        let oEmpleado = arrayVentasPeriodo[i].oEmpleado;
        let lineaArticulos = arrayVentasPeriodo[i].oLinea;
        let fTotalPedido = arrayVentasPeriodo[i].importe();
       /*
        cuerpito = fila.insertCell(-1);

        cuerpito.textContent +=cuerpito.appendChild(idVenta.id);
        cuerpito.textContent  = fila.insertCell(-1);
        cuerpito.textContent  +=cuerpito.appendChild(oCliente.nombreCliente);
        cuerpito.textContent  = fila.insertCell(-1);
        cuerpito.textContent  += cuerpito.appendChild(oEmpleado.nombreEmpleado);
        cuerpito.textContent  = fila.insertCell(-1);
        cuerpito.textContent  += cuerpito.appendChild(lineaArticulos.aLineaArticulo);
        cuerpito.textContent  = fila.insertCell(-1);
        cuerpito.textContent  += cuerpito.appendChild(fTotalPedido.importe);
        cuerpito.textContent  = fila.insertCell(-1);
        cuerpito.textContent  += cuerpito.appendChild(arrayVentasPeriodo[i].fVenta);
        */
       fila= cuerpito.insertRow(-1);
        celda = fila.insertCell(-1);
        celda.textContent = idVenta.idVenta;

        celda =fila.insertCell(-1);
        celda.textContent = oCliente.nombreCliente;

        celda =fila.insertCell(-1);
        celda.textContent = oEmpleado.nombreEmpleado;

        celda =fila.insertCell(-1);
        celda.textContent = lineaArticulos.aLineaArticulo;

        celda =fila.insertCell(-1);
        celda.textContent = fTotalPedido.importe;

        celda =fila.insertCell(-1);
        celda.textContent = arrayVentasPeriodo[i].fVenta;

        cuerpito.append(fila);
    }

    tabla.appendChild(cuerpito);
    return tabla;

}
UpoBebe.prototype.listadoEmpleados = function(){
    
    //let tabla = document.createElement("table");
    //tabla.id ="listadito";
    let tabla = document.getElementById("tabla");
    let cabecera = tabla.createTHead();
    let fila= cabecera.insertRow(-1);
    let celda = fila.insertCell(-1);
    celda.textContent = "DNI";
    celda = fila.insertCell(-1);
    celda.textContent = "Nombre";
    celda = fila.insertCell(-1);
    celda.textContent = "Apellido";
    celda = fila.insertCell(-1);
    celda.textContent = "Salario";
    celda = fila.insertCell(-1);
    celda.textContent = "Dirección";
    celda = fila.insertCell(-1);
    celda.textContent = "Correo";
    celda = fila.insertCell(-1);
    celda.textContent = "Rol";
    celda = fila.insertCell(-1);
    celda.textContent = "Teléfono";
    let cuerpito = document.createElement("tbody");
    
    for(var i=0; i< this.tEmpleados.length; i++){
       cuerpito.append(this.tEmpleados[i].toHTMLrow());
    }
    return cuerpito;

    /*
    var tabla = "<table border='1'><thead><tr><th>DNI</th><th>Nombre</th><th>Apelldio</th><th>Salario</th><th>Dirección</th><th>Correo</th><th>Rol</th><th>Teléfono</th></tr></thead>";

    for(var i=0; i< this.tEmpleados.length; i++){
        tabla += this.tEmpleados[i].toHTMLrow();
    }
    tabla += "</table>";

    return tabla;*/
}

UpoBebe.prototype.listadoClientes = function(){
    var tabla = "<table border='1'><thead><tr><th>DNI</th><th>Nombre</th><th>Apelldios</th><th>Dirección</th><th>Correo</th><th>Teléfono</th></tr></thead>";

    for(var i=0; i< this.tClientes.length; i++){
        tabla += this.tClientes[i].toString();
    }
    tabla += "</table>";

    return tabla;
}


UpoBebe.prototype.listadoArticulo = function(){
    
    let tabla = document.getElementById("tabla");
    let cabecera = tabla.createTHead();
    let fila= cabecera.insertRow(-1);
    let celda = fila.insertCell(-1);
    celda.textContent = "Nombre";
    celda = fila.insertCell(-1);
    celda.textContent = "Descripcion";
    celda = fila.insertCell(-1);
    celda.textContent = "Categoria";
    celda = fila.insertCell(-1);
    celda.textContent = "Precio";
    let cuerpo = document.createElement("tbody");
    
    for(var i=0; i< this.tArticulos.length; i++){
       cuerpo.append(this.tArticulos[i].toHTMLrow());
    }
    return cuerpo;
}


UpoBebe.prototype.listadoTaller = function(){
    
    let tabla = document.getElementById("tabla");
    let cabecera = tabla.createTHead();
    let fila= cabecera.insertRow(-1);
    let celda = fila.insertCell(-1);
    celda.textContent = "Nombre";
    celda = fila.insertCell(-1);
    celda.textContent = "Nif";
    celda = fila.insertCell(-1);
    celda.textContent = "Direccion";

    let cuerpo = document.createElement("tbody");
    
    for(var i=0; i< this.tTalleres.length; i++){
       cuerpo.append(this.tTalleres[i].toHTMLrow());
    }
    return cuerpo;
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
        let linea = document.createElement("tr"); 
        let celda = linea.insertCell(-1);
        celda.textContent=this.dniEmpleado;

        celda = linea.insertCell(-1);
        celda.textContent=this.nombreEmpleado;

        celda = linea.insertCell(-1);
        celda.textContent=this.apellidosEmpleado;

        celda = linea.insertCell(-1);
        celda.textContent=this.salarioEmpleado;

        celda = linea.insertCell(-1);
        celda.textContent=this.direccionEmpleado;

        celda = linea.insertCell(-1);
        celda.textContent=this.correoEmpleado;
        celda = linea.insertCell(-1);
        celda.textContent=this.rolEmpleado;

        celda = linea.insertCell(-1);
        celda.textContent=this.telefonoEmpleado;
        return linea;
        /*
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
        */
     

    }
}
// fin clase EMPLEADO

// Clase Reparación:
class Reparacion{
    /*
    constructor(sIdReparacion,oArticulo,oVenta,dtFechaReparacion){
        this.IDReparacion = sIdReparacion;
        this.oArt = oArticulo;
        this.oVent = oVenta;
        this.fechaReparacion = dtFechaReparacion;
        */
       constructor(sIdReparacion,venta, idArticulo,idTaller,sDescripcion,dtFechaReparacion){
        this.IDReparacion = sIdReparacion;
        this.oVenta = venta;
        this.oArticulo = idArticulo;
        this.oTaller = idTaller
        this.sDescripcion = sDescripcion;
        this.dtFechaReparacion = dtFechaReparacion;

    }
    toString(){
        var sFila="<tr>";
	    sFila+="<td>"+this.IDReparacion+"</td>";
	    sFila+="<td>"+this.idArticulo+"</td>";
	    sFila+="<td>"+this.idTaller+"</td>";
        sFila+="<td>"+this.sDescripcion+"</td>";
        sFila+="<td>"+this.dtFechaReparacion+"</td>";
	    sFila+="</tr>";
	    return sFila;
    }
}
//fin clase Reparación
//Clase LineaDeArticulo:
class LineaDeArticulo{
    constructor(idLinea, oArt, oVenta, unid){
        this.idLinea = idLinea;
        this.oArt = oArt;
        this.oVenta = oVenta;
        this.unidades = unid;
    }
    totalLinea(){
        return parseInt(this.unidades * this.oArt.precioArticulo);
    }
    toString(){
        
        let fila= document.createElement("P");
        //let celda = fila.insertCell(-1);
        fila.textContent = this.oArt.nombreArticulo + " - ";

        //celda = fila.insertCell(-1);
        fila.textContent += this.oArt.precioArticulo + " - ";
        
        //celda = fila.insertCell(-1);
        fila.textContent += this.unidades + " - ";

        //celda = fila.insertCell(-1);
        fila.textContent += this.totalLinea() + "\n";

        return fila;
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
        let devolver = 0;
        for(let i = 0; i < this.aLineaArticulo.length ; i++){
            devolver += this.aLineaArticulo[i].totalLinea();
        }
        //this.aLineaArticulo.reduce(function(total, valor){
            return devolver;
        //});
    }
    toString(){
        let nFilas = this.aLineaArticulo.length;
        let fila= document.createElement("TR");
        let celda = fila.insertCell(-1);
        //celda.rowSpan = nFilas;
        celda.textContent = this.idVenta;

        celda = fila.insertCell(-1);
        //celda.rowSpan = nFilas;
        celda.textContent = this.oCliente.nombreCliente;
        
        celda = fila.insertCell(-1);
        //celda.rowSpan = nFilas;
        celda.textContent = this.oEmpleado.nombreEmpleado;

        celda = fila.insertCell(-1);
        for(let i = 0; i < nFilas ; i++){
            celda.appendChild(this.aLineaArticulo[i].toString());
            //let fila= ;
        }
        celda = fila.insertCell(-1);
        //celda.rowSpan = nFilas;
        celda.textContent = this.importe();

	    celda = fila.insertCell(-1);
        //celda.rowSpan = nFilas;
        celda.textContent = this.fVenta;
	    return fila;
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

//clase Articulo
class Articulo{

    constructor(sIdArticulo,sNombreArticulo,sDescripcionArticulo,oCategoria,fPrecioArticulo){
        this.idArticulo = sIdArticulo;
        this.nombreArticulo = sNombreArticulo;
        this.descripcionArticulo = sDescripcionArticulo;
        this.categoria = oCategoria;
        this.precioArticulo = parseFloat(fPrecioArticulo);


    }
        toHTMLrow(){
        let linea = document.createElement("tr"); 
        linea.dataset.id = this.idArticulo;
        let celda = linea.insertCell(-1);
        celda.textContent=this.nombreArticulo;

        celda = linea.insertCell(-1);
        celda.textContent=this.descripcionArticulo;

        celda = linea.insertCell(-1);
        celda.textContent=this.categoria.nombreCategoria;

        celda = linea.insertCell(-1);
        celda.textContent=this.precioArticulo;

        celda = linea.insertCell(-1);
        let botonCarrito = document.createElement("img");
        botonCarrito.setAttribute("src", "img/carro.png");
        botonCarrito.setAttribute("width", "100%");
        celda.setAttribute("style", "width:5%;")
        botonCarrito.addEventListener("click", añadirArticuloACarrito, false);
        celda.appendChild(botonCarrito);

        return linea;
        /*/*
    toHTMLrow(){
        var sFila="<tr>";
	    sFila+="<td>"+this.idArticulo+"</td>";
	    sFila+="<td>"+this.nombreArticulo+"</td>";
	    sFila+="<td>"+this.descripcionArticulo+"</td>";
        sFila+="<td>"+this.categoria+"</td>";
        sFila+="<td>"+this.precioArticulo+"</td>";
	    sFila+="</tr>";
	    return sFila;*/
    }
}
//Fin clase artículo


//clase Taller
class Taller{

    constructor(sNombreTaller,sNifTaller,sDireccionTaller){
        this.nombreTaller = sNombreTaller;
        this.nifTaller = sNifTaller;
        this.direccionTaller = sDireccionTaller;
    }
        toHTMLrow(){
        let linea = document.createElement("tr"); 
        let celda = linea.insertCell(-1);
        celda.textContent=this.nombreTaller;

        celda = linea.insertCell(-1);
        celda.textContent=this.nifTaller;

        celda = linea.insertCell(-1);
        celda.textContent=this.direccionTaller;



        return linea;
       
    }
}
//Fin clase taller
//Clase categoría
class Categoria{
    constructor(id, nombre, descripcion){
        this.idCategoria = id;
        this.nombreCategoria = nombre;
        this.descripcionCategoria = descripcion;
    }
}
//Fin clase categoría
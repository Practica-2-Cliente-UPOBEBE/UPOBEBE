//# sourceURL=altaEmpleado.js;

$("#aceptarAltaEmpleado").click(fAceptarAltaEmpleado);
alert("asd")
function fAceptarAltaEmpleado(){
    
    let sNifEmpleado = frmAltaEmpleado.txtNIF.value.trim();
    let sNombreEmpleado = frmAltaEmpleado.txtNombreEmpleado.value.trim();
    let sApellidosEmpleado = frmAltaEmpleado.txtApellidoEmpleado.value.trim();
    let fSalarioEmpleado = frmAltaEmpleado.txtSalarioEmpleado.value.trim();
    let sDireccionEmpleado = frmAltaEmpleado.txtDireccionEmpleado.value.trim();
    let sCorreoEmpleado = frmAltaEmpleado.txtCorreoEmpleado.value.trim();
    let sRolEmpleado = frmAltaEmpleado.txtRolEmpleado.value.trim();
    let iTlfEmpleado = frmAltaEmpleado.txtTlfEmpleado.value.trim();
    //let oEmpleado = new Empleado(sNifEmpleado,sNombreEmpleado,sApellidosEmpleado,fSalarioEmpleado,sDireccionEmpleado,sCorreoEmpleado,sRolEmpleado,iTlfEmpleado);

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

        let oEmpleado = {
            DniEmpleado: sNifEmpleado,
            NombreEmpleado: sNombreEmpleado,
            ApellidosEmpleado: sApellidosEmpleado,
            SalarioEmpleado: fSalarioEmpleado,
            DireccionEmpleado: sDireccionEmpleado,
            CorreoEmpleado: sCorreoEmpleado,
            RolEmpleado: sRolEmpleado,
            TelefonoEmpleado: iTlfEmpleado
        };
        
        //let sParametros = "datos=" + JSON.stringify(oEmpleado);

        $.post("altaEmpleado/altaEmpleado.php", oEmpleado, respuestaAltaEmpleado, 'json');

        /*
        if(oUpoBebe.altaEmpleado(oEmpleado))
        {
            alert("Dado de alta");
            //frmAltaEmpleado.submit();
            frmAltaEmpleado.reset();
        }else{
            alert("El empleado YA EXISTE con ese DNI");
            
        }*/

    }// fin else

        function respuestaAltaEmpleado(oDatos, sStatus, oXHR)
        {
            if(oDatos.error){
                alert(oDatos.mensaje);
            }else{
                alert(oDatos.mensaje);
                frmAltaEmpleado.reset();
                $("#frmAltaEmpleado").parent().hide("normal");
            }
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
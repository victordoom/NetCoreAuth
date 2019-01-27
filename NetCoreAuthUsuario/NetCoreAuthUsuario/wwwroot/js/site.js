// Write your JavaScript code.
$('#modalEditar').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus');
});
$('#modalAC').on('shown.bs.modal', function () {
    $('#Nombre').trigger('focus');
});

function getUsuario(id, action) {
    $.ajax({
        type: "POST",
        url: action,
        data: { id },
        success: function (response) {
            //los datos que obtenemos con nuestra funcion se las vamos a pasar a la funcion mostarUsuario
            mostrarUsuario(response);
        }
    });
}
//variable global
var items;
var j = 0;
//variables por cada propiedad del usuario
var id;
var userName;
var email;
var phoneNumber;
var role;
var selectRole;

//Otras variables donde almacenaremos los datos del registro, pero estos datos no serán modificados
var accessFailedCount;
var concurrencyStamp;
var emailConfirmed;
var lockoutEnabled;
var lockoutEnd;
var normalizedUserName;
var normalizedEmail;
var passwordHash;
var phoneNumberConfirmed;
var securityStamp;
var twoFactorEnabled;

function mostrarUsuario(response) {
    items = response;
    j = 0;

    //dejamos vacio el objeto de formulario select
    for (var i = 0; i < 3; i++) {
        var x = document.getElementById('Select');
        x.remove(i);

    }
    //recorro el items y con la siguiente funcion llenare las cajas de texto
    $.each(items, function (index, val) {
        $('input[name=Id]').val(val.id);
        $('input[name=UserName]').val(val.userName);
        $('input[name=Email]').val(val.email);
        $('input[name=PhoneNumber]').val(val.phoneNumber);
        document.getElementById('Select').options[0] = new Option(val.role, val.roleId);

        //mostar los detalles del usuario
        $("#dEmail").text(val.email);
        $("#dUserName").text(val.userName);
        $("#dPhoneNumber").text(val.phoneNumber);
        $("#dRole").text(val.role);

        //mostar los datos del usuario que deseo eliminar
        $("#eUsuario").text(val.email);
        $('input[name=EIdUsuario]').val(val.id);

    });

}

function getRoles(action) {
    $.ajax({
        type: "POST",
        url: action,
        data: {},
        success: function (response) {
            if (j==0) {
                for (var i = 0; i < response.length; i++) {
                    document.getElementById('Select').options[i] = new Option(response[i].text, response[i].value);
                    document.getElementById('SelectNuevo').options[i] = new Option(response[i].text, response[i].value);
                }
                j = 1;
            }
        }
    });
}

function editarUsuario(action) {
    //obtenemos los datos del input respectivo del formulario
    id = $('input[name=Id]')[0].value;
    email = $('input[name=Email]')[0].value;
    phoneNumber = $('input[name=PhoneNumber]')[0].value;
    role = document.getElementById('Select');
    selectRole = role.options[role.selectedIndex].text;

    $.each(items, function (index, val) {
        accessFailedCount = val.accessFailedCount;
        concurrencyStamp = val.concurrencyStamp;
        emailConfirmed = val.emailConfirmed;
        lockoutEnabled = val.lockoutEnabled;
        lockoutEnd = val.lockoutEnd;
        userName = val.userName;
        normalizedUserName = val.normalizedUserName;
        normalizedEmail = val.normalizedEmail;
        passwordHash = val.passwordHash;
       
        securityStamp = val.securityStamp;
        twoFactorEnabled = val.twoFactorEnabled;
    });

    $.ajax({
        type: "POST",
        url: action,
        data: {
            id, userName, email, phoneNumber, accessFailedCount,
            concurrencyStamp, emailConfirmed, lockoutEnabled, lockoutEnd,
            normalizedEmail, normalizedUserName, passwordHash, phoneNumberConfirmed,
            securityStamp, twoFactorEnabled, selectRole
        },
        success: function (response) {
            if (response == "Save") {
                window.location.href = "Users";
            }
            else {
                alert("no se pudo actualizar el usuario");
            }
        }
    });
}

function ocultarDetalleUsuario() {
    $("#modalDetalle").modal("hide");
}

function eliminarUsuario(action) {
    var id = $('input[name=EIdUsuario]')[0].value;
    $.ajax({
        type: "POST",
        url: action,
        data: { id },
        success: function (response) {
            if (response === "Delete") {
                window.location.href = "Users";
            }
            else {
                alert("No se puede eliminar el registro");
            }
        }
    });
}

function crearUsuario(action) {
    //obtener los datos ingresados en los input respectivos
    email = $('input[name=EmailNuevo]')[0].value;
    phoneNumber = $('input[name=PhoneNumberNuevo]')[0].value;
    passwordHash = $('input[name=PasswordHashNuevo]')[0].value;
    role = document.getElementById('SelectNuevo');
    selectRole = role.options[role.selectedIndex].text;

    //vamos a validar que los datos del ususario no esten vacios
    if (email == "") {
        $('#EmailNuevo').focus();
        alert("Ingrese el email del usuario");
    }
    else {
        if (passwordHash == "") {
            $('#PasswordHashNuevo').focus();
            alert("Ingrese el password del usuario");
        }
        else {
            $.ajax({
                type: "POST",
                url: action,
                data: {
                    email, phoneNumber, passwordHash, selectRole
                },
                success: function (response) {
                    if (response === "Save") {
                        window.location.href = "Users";
                    }
                    else {
                        $('#mensajenuevo').html("No se pudo guardar el usuario. <br/>Selecione un rol. <br/>Ingrese un Email correcto. <br/>El password debe tener de 6-100 carateres, al menos un caracter especial, una letra mayuscula y un numero");

                    }
                }
            });
        }
    }

}

//funcion cada que se carga nuestra vista index
$().ready(() => {
    document.getElementById("filtrar").focus();
    filtrarDatos(1);
});

//obtener los datos de los campos de categoria
function agregarCategoria() {
    var nombre = document.getElementById("Nombre").value;
    var descripcion = document.getElementById("Descripcion").value;
    var estados = document.getElementById("Estado").value;
    var estado = document.options[estados.selectedIndex].value;
    var action = 'Categorias/guardarCategoria';
    var categoria = new Categorias(nombre, descripcion, estado, action);
    categoria.agregarCategoria();
}

var filtrarDatos = (numPagina) => {
    var valor = document.getElementById("filtrar").value;
    var action = 'Categorias/filtrarDatos';
    var categoria = new Categorias(valor, "", "", action);
    categoria.filtrarDatos(numPagina);
}
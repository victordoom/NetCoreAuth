// Write your JavaScript code.
$('#modalEditar').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus');
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
    //recorro el items y con la siguiente funcion llenare las cajas de texto
    $.each(items, function (index, val) {
        $('input[name=Id]').val(val.id);
        $('input[name=UserName]').val(val.userName);
        $('input[name=Email]').val(val.email);
        $('input[name=PhoneNumber]').val(val.phoneNumber);
    });

}

function editarUsuario(action) {
    //obtenemos los datos del input respectivo del formulario
    id = $('input[name=Id]')[0].value;
    email = $('input[name=Email]')[0].value;
    phoneNumber = $('input[name=PhoneNumber]')[0].value;

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
        phoneNumber = val.phoneNumber;
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
            securityStamp, twoFactorEnabled
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

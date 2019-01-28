
//funcion cada que se carga nuestra vista index
$().ready(function () {
    document.getElementById("filtrar").focus();
    filtrarDatos(1);
});

//obtener los datos de los campos de categoria
function agregarCategoria(action) {
    var nombre = $('input[name=Nombre]')[0].value
    var descripcion = $('input[name=Descripcion]')[0].value
    var estado = document.getElementById('Estado').value;
    var mensaje;

    if (nombre == "") {
        $('#Nombre').focus();
    } else {
        if (descripcion == "") {
            $('#Descripcion').focus();
        } else {
            if (estado == "0") {
                $('#mensaje').html("Seleccione un estado");
            } else {


                $.ajax({
                    type: "POST",
                    url: action,
                    data: {
                        nombre, descripcion, estado
                    },
                    success: function (response) {
                        $.each(response, function (index, val) {
                            mensaje = val.code;
                        });

                        if (mensaje === "Save") {
                            window.location.href = "Categorias";
                        } else {
                            document.getElementById("mensaje").innerHTML = "No se pudo guardar la categoria";
                        }
                    }
                });
            }
        }
    }


    //var categoria = new Categorias(nombre, descripcion, estado, action);
    //categoria.agregarCategoria();
}

function filtrarDatos(numPagina) {
    var valor = $('input[name=filtrar]')[0].value;
    var action = 'Categorias/filtrarDatos';
    

    if (valor == "") {
        valor = "null";
    }
    $.ajax({
        type: "POST",
        url: action,
        data: { valor, numPagina },
        success: function (response) {
            console.log(response);
            $.each(response, function (index, val) {

                $("#resultSearch").html(val[0]);
                $("#paginado").html(val[1]);
            });
        }
    });
}


        function restablecer() {
            //se limpia los input
            document.getElementById("Nombre").value = "";
            document.getElementById("Descripcion").value = "";
            document.getElementById("mensaje").value = "";
            document.getElementById("Estado").selectedIndex = 0;
            //ocultamos el modal
            $('modalAC').modal('hide');

        }

using Microsoft.AspNetCore.Identity;
using NetCoreAuthUsuario.Data;
using NetCoreAuthUsuario.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreAuthUsuario.ModelsClass
{
    public class CategoriaModels
    {
        private ApplicationDbContext _context;

        public CategoriaModels(ApplicationDbContext context)
        {
            _context = context;
        }

        public  List<IdentityError> guardarCategoria(string nombre, string descripcion, string estado)
        {
            var errorList = new List<IdentityError>();
            var categoria = new Categoria {
                Nombre = nombre,
                Descripcion = descripcion,
                Estado = Boolean.Parse(estado)
            };

            _context.Add(categoria);
             _context.SaveChangesAsync();

            errorList.Add(new IdentityError
            {
                //en code se almacena el numero de error y en descripcion de la misma
                Code = "Save",
                Description = "Save"
            });

            return errorList;
        }

        public List<object[]> filtrarDatos(int numPagina, string valor)
        {
            int count = 0, cant, numRegistros = 0, inicio = 0, reg_por_pagina = 1;
            int can_paginas, pagina;
            string dataFilter = "", paginador = "", Estado = null;
            List<object[]> data = new List<object[]>();
            IEnumerable<Categoria> query;
            var categorias = _context.Categoria.OrderBy(c => c.Nombre).ToList();
            numRegistros = categorias.Count;
            inicio = (numPagina - 1) * reg_por_pagina;
            can_paginas = (numRegistros / reg_por_pagina);
            if (valor == "null")
            {
                //skip omite los registros segun "inicio" y Take retorna la cantidad de datos segun nuestra propiedad
                query = categorias.Skip(inicio).Take(reg_por_pagina);
            }
            else
            {

                query = categorias.Where(u => u.Nombre.StartsWith(valor) || u.Descripcion.StartsWith(valor)).Skip(inicio).Take(reg_por_pagina);

            }
            cant = query.Count();
            foreach (var item in query)
            {
                if (item.Estado == true)
                {
                    Estado = "<a class='btn btn-success'>Activo</a>";
                }
                else
                {
                    Estado = "<a class='btn btn-danger'>No activo</a>";
                }
                dataFilter += "<tr>" +
                    "<td>" + item.Nombre + "</td>" +
                    "<td>" + item.Descripcion + "</td>" +
                    "<td>" + Estado + "</td>" +
                    "<td>" +
                    "<a data-toggle='modal' data-target='#myModal' class='btn btn-success'>Edit</a> |" +
                    "<a data-toggle='modal' data-target='#myModal3' class='btn btn-danger'>Delete</a>" +
                    "</td>" +
                    "</tr>";
            }
            object[] dataObj = { dataFilter, paginador };
            data.Add(dataObj);
            return data;
        }
    }
}

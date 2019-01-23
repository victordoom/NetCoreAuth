using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using NetCoreAuthUsuario.Data;
using NetCoreAuthUsuario.Models;

namespace NetCoreAuthUsuario.Controllers
{
    public class UsersController : Controller
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Users
        public async Task<IActionResult> Index()
        {
            return View(await _context.ApplicationUser.ToListAsync());
        }

        public async Task<List<ApplicationUser>> GetUsuario (string id)
        {
            List<ApplicationUser> usuario = new List<ApplicationUser>();
            var appusuario = await _context.ApplicationUser.SingleOrDefaultAsync(m => m.Id == id);
            usuario.Add(appusuario);
            return usuario;
        }
        // GET: Users/Details/5
       
        public async Task<string> EditUsuario(string id,string userName,string email,
            string phoneNumber,int accessFailedCount,
            string concurrencyStamp,bool emailConfirmed,bool lockoutEnabled,DateTimeOffset lockoutEnd,
            string normalizedEmail,string normalizedUserName,string passwordHash,bool phoneNumberConfirmed,
            string securityStamp,bool twoFactorEnabled, ApplicationUser applicationUser)
        {
            var resp = "";
            try
            {
                applicationUser = new ApplicationUser
                {
                    Id = id,
                    UserName = userName,
                    Email = email,
                    PhoneNumber = phoneNumber,
                    EmailConfirmed = emailConfirmed,
                    LockoutEnabled = lockoutEnabled,
                    LockoutEnd = lockoutEnd,
                    NormalizedEmail = normalizedEmail,
                    NormalizedUserName = normalizedUserName,
                    PasswordHash = passwordHash,
                    PhoneNumberConfirmed = phoneNumberConfirmed,
                    SecurityStamp = securityStamp,
                    TwoFactorEnabled = twoFactorEnabled,
                    AccessFailedCount = accessFailedCount,
                    ConcurrencyStamp = concurrencyStamp

                };
                //actualizamod datos
                _context.Update(applicationUser);
                await _context.SaveChangesAsync();
                resp = "Save";
            }
            catch 
            {

                resp = "No Save";
            }
            return resp;

        }

        private bool ApplicationUserExists(string id)
        {
            return _context.ApplicationUser.Any(e => e.Id == id);
        }
    }
}

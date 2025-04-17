using EmpCrudAPI.Data;
using EmpCrudAPI.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmpCrudAPI.Controllers
{
    [Route("api/login")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == loginDto.Username);
            if (user == null)
            {
                return BadRequest(new { message = "User not Found" });
            }
            else if (user.Password != loginDto.Password)
            {
                return BadRequest(new { message = "Password is Incorrect!" });
            }
            return Ok(new {message = "Login Successful", user = user.Username});
        }
    }
}

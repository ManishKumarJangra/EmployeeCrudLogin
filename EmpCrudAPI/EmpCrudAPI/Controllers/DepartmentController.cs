using EmpCrudAPI.Data;
using EmpCrudAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmpCrudAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public DepartmentController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDepartments()
        {
            var departments = await _context.Departments.ToListAsync();

            return Ok(departments);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDepartmentById(int id)
        {
            if (id < 1) return BadRequest();
            var department = await _context.Departments.FindAsync(id);

            if (department == null) return NotFound(new { message = $"Department with Id = {id} not found!" });

            return Ok(department);
        }
        [HttpPost]
        public async Task<IActionResult> CreateDepartment(Department department)
        {
            if (!ModelState.IsValid) return BadRequest();

            _context.Departments.Add(department);
            await _context.SaveChangesAsync();

            return Ok(new { result = true, message = "Department created successfully!" });
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDepartment(int id, Department department)
        {
            if (id < 1) return BadRequest();

            if (!ModelState.IsValid) return BadRequest();

            var departmentInDb = await _context.Departments.FindAsync(id);
            if(departmentInDb == null) return NotFound(new { message = $"Department with Id = {id} not found!" });
            
            _context.Departments.Update(departmentInDb);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepartment(int id)
        {
            if(id < 1) return BadRequest();

            var departmentInDb = await _context.Departments.FindAsync(id);
            if (departmentInDb == null) return NotFound(new { message = $"Department with Id = {id} not found!" });

            _context.Departments.Remove(departmentInDb);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Department deleted successfully!" });
        }
    }
}

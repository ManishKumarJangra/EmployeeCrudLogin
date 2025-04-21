using EmpCrudAPI.Data;
using EmpCrudAPI.DTOs;
using EmpCrudAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmpCrudAPI.Controllers
{
    [Route("api/employees")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public EmployeeController(ApplicationDbContext context)
        {
            _context = context;
        }
        #region Employee APIs

        [HttpGet]
        public async Task<IActionResult> GetEmployees()
        {
            var employees = await _context.Employees.Include(r => r.Role).Include(d => d.Department).ToListAsync();

            //Modifying the Output
            var result = employees.Select(r => new EmployeeDto
            {
                Id = r.Id,
                Name = r.Name,
                Address = r.Address,
                PhoneNumber = r.PhoneNumber,
                Gender = r.Gender.ToString(),
                RoleId = r.RoleId,
                RoleName = r.Role?.Name,
                DepartmentId = r.DepartmentId,
                DepartmentName = r.Department.Name
            });

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployee(int id)
        {
            if (id < 1) return BadRequest();

            var employee = await _context.Employees.Include(r => r.Role).Include(d => d.Department).FirstOrDefaultAsync(e => e.Id == id);

            if (employee == null) return NotFound();

            //Modifying the Output
            var result = new EmployeeDto
            {
                Id = employee.Id,
                Name = employee.Name,
                Address = employee.Address,
                PhoneNumber = employee.PhoneNumber,
                Gender = employee.Gender.ToString(),
                RoleId = employee.RoleId,
                RoleName = employee.Role?.Name,
                DepartmentId = employee.DepartmentId,
                DepartmentName = employee.Department.Name
            };
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateEmployee(CreateEmployeeDto empDto)
        {
            if (!ModelState.IsValid) return BadRequest();
            //Checking if a Role exists for Role ID entered
            var roleExists = await _context.Roles.AnyAsync(r => r.Id == empDto.RoleId);
            if (!roleExists) return BadRequest(new {message = "Invalid Role ID"});

            var departmentExists = await _context.Departments.AnyAsync(d => d.Id == empDto.DepartmentId);
            if (!departmentExists) return BadRequest(new { message = "Invalid Department ID" });

            var employee = new Employee
            {
                Name = empDto.Name,
                Address = empDto.Address,
                PhoneNumber = empDto.PhoneNumber,
                Gender = empDto.Gender,
                RoleId = empDto.RoleId,
                DepartmentId = empDto.DepartmentId
            };

            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return Ok(new {result = true, message = "Employee created successfuly!"});
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, UpdateEmployeeDto empDto)
        {
            if (id < 1) return BadRequest();

            if (!ModelState.IsValid) return BadRequest();
            //Checking if a Role exists for Role ID entered
            var roleExists = await _context.Roles.AnyAsync(r => r.Id == empDto.RoleId);
            if (!roleExists) return BadRequest(new { message = "Invalid Role ID" });

            var departmentExists = await _context.Departments.AnyAsync(d => d.Id == empDto.DepartmentId);
            if (!departmentExists) return BadRequest(new { message = "Invalid Department ID" });

            //Finding Employee Data in table with id entered
            var employeeInDb = await _context.Employees.FindAsync(id);
            if (employeeInDb == null) return NotFound(new { message = $"Employee with Id = {id} not found" });

            employeeInDb.Name = empDto.Name;
            employeeInDb.Address = empDto.Address;
            employeeInDb.PhoneNumber = empDto.PhoneNumber;
            employeeInDb.Gender = empDto.Gender;
            employeeInDb.RoleId = empDto.RoleId;
            employeeInDb.DepartmentId = empDto.DepartmentId;

            try
            {
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating data");
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            if (id < 1) return BadRequest();

            var empInDb = await _context.Employees.FindAsync(id);
            if (empInDb == null) return NotFound(new {result = false, message = $"Employee with Id = {id} not found" });

            _context.Employees.Remove(empInDb);
            await _context.SaveChangesAsync();

            return Ok(new { result = true, message = "Employee deleted successfully!" });
        }
        #endregion
        #region List APIs
        [HttpGet("/api/roles")]
        public IActionResult GetRoles()
        {
            var roles = _context.Roles.Select(r => new { r.Id, r.Name }).ToList();
            return Ok(roles);
        }

        [HttpGet("/api/genders")]
        public IActionResult GetGenders()
        {
            var genders = Enum.GetValues(typeof(GenderType))
                              .Cast<GenderType>()
                              .Select(g => new { Id = (int)g, Name = g.ToString() })
                              .ToList();
            return Ok(genders);
        }
        #endregion
    }
}

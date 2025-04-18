using EmpCrudAPI.Data;
using EmpCrudAPI.DTOs;
using EmpCrudAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmpCrudAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public StudentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllStudents([FromQuery] QueryParameters query)
        {
            IQueryable<Student> students = _context.Students;

            //Searching
            if (!string.IsNullOrWhiteSpace(query.Search))
            {
                students = students.Where(s =>
                    s.Name.Contains(query.Search) ||
                    s.Class.Contains(query.Search) ||
                    s.Address.Contains(query.Search)
                );
            }
            // Sorting
            bool ascending = query.SortOrder?.ToLower() == "asc";
            if (!string.IsNullOrEmpty(query.SortBy))
            {
                students = ascending
                    ? students.OrderBy(s => EF.Property<object>(s, query.SortBy))
                    : students.OrderByDescending(s => EF.Property<object>(s, query.SortBy));
            }
            // Pagination
            int totalRecords = await students.CountAsync();
            var pagedData = await students
                .Skip((query.PageNumber - 1) * query.PageSize)
                .Take(query.PageSize)
                .ToListAsync();

            // Response
            var response = new
            {
                TotalRecords = totalRecords,
                query.PageNumber,
                query.PageSize,
                Data = pagedData
            };

            return Ok(response);
        }
    }
}

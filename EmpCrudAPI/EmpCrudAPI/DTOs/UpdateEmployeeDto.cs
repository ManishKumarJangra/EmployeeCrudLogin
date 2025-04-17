using EmpCrudAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace EmpCrudAPI.DTOs
{
    public class UpdateEmployeeDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        [Phone]
        public string PhoneNumber { get; set; }

        [Required]
        public GenderType Gender { get; set; }

        [Required]
        public int RoleId { get; set; }
    }
}

using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace EmpCrudAPI.Models
{
    public class Employee
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [StringLength(100)]
        public string Address { get; set; }

        [Required]
        [Phone]
        public string PhoneNumber { get; set; }

        [Required]
        public GenderType Gender { get; set; }

        public int RoleId { get; set; }

        [ForeignKey("RoleId")]
        public Role? Role { get; set; }
        public int DepartmentId { get; set; }
        [ForeignKey("DepartmentId")]
        public Department? Department { get; set; }

        [NotMapped]
        public string GenderDisplay => Gender.ToString();
    }

    public enum GenderType
    {
        Male = 1,
        Female = 2
    }
}

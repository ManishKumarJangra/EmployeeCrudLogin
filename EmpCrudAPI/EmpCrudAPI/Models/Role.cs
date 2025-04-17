using System.ComponentModel.DataAnnotations;

namespace EmpCrudAPI.Models
{
    public class Role
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}

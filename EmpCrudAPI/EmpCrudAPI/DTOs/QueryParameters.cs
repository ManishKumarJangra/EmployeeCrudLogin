namespace EmpCrudAPI.DTOs
{
    public class QueryParameters
    {
        public string? Search { get; set; }
        public string? SortBy { get; set; } = "Id";
        public string? SortOrder { get; set; } = "asc";
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}

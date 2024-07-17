using Domain;

namespace Application.Program.DTO;

public class CatalogDTO
{
    public List<Village> Villages { get; set; } = [];
    public List<Stage> Stages { get; set; } = [];
    public List<DateTime> Dates { get; set; } = [];
}

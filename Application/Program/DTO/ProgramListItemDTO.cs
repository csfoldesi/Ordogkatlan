namespace Application.Program.DTO;

public class ProgramListItemDTO
{
    public required string Id { get; set; }

    public required string Title { get; set; }

    public string? Description { get; set; }

    public string? Thumbnail { get; set; }

    public Guid PerformanceId { get; set; }

    public DateTime Date { get; set; }

    public DateTime? StartTime { get; set; }

    public DateTime? EndTime { get; set; }

    public int? Duration { get; set; }

    public required string VillageId { get; set; }

    public required string VillageName { get; set; }

    public required string StageId { get; set; }

    public required string StageName { get; set; }

    public bool IsSelected { get; set; }
}

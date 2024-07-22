namespace Domain;

public class Program
{
    public required string Id { get; set; }

    public required string Title { get; set; }

    public string? Description { get; set; }

    public string? Thumbnail { get; set; }

    public List<TimeTable> TimeTables { get; set; } = [];

    public bool IsTicketed { get; set; }

    public List<Genre> Genres { get; set; } = [];
}

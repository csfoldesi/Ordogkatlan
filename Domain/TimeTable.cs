namespace Domain;

public class TimeTable
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public required Program Program { get; set; }

    public DateTime? StartTime { get; set; }

    public DateTime? EndTime { get; set; }

    public int? Duration { get; set; }

    public required Stage Stage { get; set; }

    public ICollection<UserTimetable> UserTimetables { get; set; } = [];
}

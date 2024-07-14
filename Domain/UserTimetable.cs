namespace Domain;

public class UserTimetable
{
    public required string UserId { get; set; }

    public User? User { get; set; }

    public required Guid TimetableId { get; set; }

    public TimeTable? TimeTable { get; set; }
}

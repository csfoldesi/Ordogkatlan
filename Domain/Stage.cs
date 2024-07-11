namespace Domain;

public class Stage
{
    public required string Id { get; set; }

    public required string Name { get; set; }

    public required Village Village { get; set; }
}

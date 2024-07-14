using Application.Core;

namespace Application.Program;

public class ProgramParams : PagingParams
{
    public DateTime? Date { get; set; }

    public string? Village { get; set; }

    public string? Stage { get; set; }

    public string? SearchText { get; set; }
}

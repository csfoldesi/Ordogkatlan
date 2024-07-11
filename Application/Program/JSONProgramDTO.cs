namespace Application.Program;

public class JSONProgramDTO
{
    public required Data data { get; set; }
    public required string[] display { get; set; }
    public required object[] lightbox { get; set; }
    public required string rawSeo { get; set; }
    public required Seo seo { get; set; }
}

public class Data
{
    public required Centerpiece[] centerpiece { get; set; }
    public required Controls controls { get; set; }
    public required string prequel { get; set; }
    public required string sequel { get; set; }
}

public class Controls
{
    public required Day[] days { get; set; }
    public required Genre[] genres { get; set; }
    public required object[] stages { get; set; }
    public required Time time { get; set; }
    public required Village[] villages { get; set; }
}

public class Time
{
    public required string selected { get; set; }
    public required string[] values { get; set; }
}

public class Day
{
    public required string id { get; set; }
    public required string name { get; set; }
    public required bool selected { get; set; }
}

public class Genre
{
    public required Featuredcolor featuredColor { get; set; }
    public required string id { get; set; }
    public required string name { get; set; }
    public required bool selected { get; set; }
}

public class Featuredcolor
{
    public required string background { get; set; }
    public required string foreground { get; set; }
}

public class Village
{
    public required string id { get; set; }
    public required string name { get; set; }
    public required bool selected { get; set; }
}

public class Centerpiece
{
    public string? description { get; set; }
    public int? duration { get; set; }
    public string? href { get; set; }
    public Label[]? labels { get; set; }
    public string? productionId { get; set; }
    public Stage? stage { get; set; }
    public Thumbnail? thumbnail { get; set; }
    public Time1? time { get; set; }
    public string? title { get; set; }
    public Village1? village { get; set; }
    public Ticketed? ticketed { get; set; }
}

public class Stage
{
    public required string href { get; set; }
    public required string name { get; set; }
}

public class Thumbnail
{
    public required string mobile { get; set; }
    public required string web { get; set; }
}

public class Time1
{
    public required string href { get; set; }
    public required string name { get; set; }
}

public class Village1
{
    public required string href { get; set; }
    public required string name { get; set; }
}

public class Ticketed
{
    public required string href { get; set; }
    public required string name { get; set; }
}

public class Label
{
    public required Featuredcolor1 featuredColor { get; set; }
    public required string href { get; set; }
    public required string name { get; set; }
}

public class Featuredcolor1
{
    public required string background { get; set; }
    public required string foreground { get; set; }
}

public class Seo
{
    public required object[] link { get; set; }
    public required Meta[] meta { get; set; }
    public required string title { get; set; }
}

public class Meta
{
    public required string content { get; set; }
    public string? property { get; set; }
    public string? name { get; set; }
}

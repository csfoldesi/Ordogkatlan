namespace Application.Program.DTO;

public class JSONProgramDTO
{
    public required JSONData data { get; set; }
    public required string[] display { get; set; }
    public required object[] lightbox { get; set; }
    public required string rawSeo { get; set; }
    public required JSONSeo seo { get; set; }
}

public class JSONData
{
    public required JSONCenterpiece[] centerpiece { get; set; }
    public required JSONControls controls { get; set; }
    public required string prequel { get; set; }
    public required string sequel { get; set; }
}

public class JSONControls
{
    public required JSONDay[] days { get; set; }
    public required JSONGenre[] genres { get; set; }
    public required object[] stages { get; set; }
    public required JSONTime time { get; set; }
    public required JSONVillage[] villages { get; set; }
}

public class JSONTime
{
    public required string selected { get; set; }
    public required string[] values { get; set; }
}

public class JSONDay
{
    public required string id { get; set; }
    public required string name { get; set; }
    public required bool selected { get; set; }
}

public class JSONGenre
{
    public required JSONFeaturedcolor featuredColor { get; set; }
    public required string id { get; set; }
    public required string name { get; set; }
    public required bool selected { get; set; }
}

public class JSONFeaturedcolor
{
    public required string background { get; set; }
    public required string foreground { get; set; }
}

public class JSONVillage
{
    public required string id { get; set; }
    public required string name { get; set; }
    public required bool selected { get; set; }
}

public class JSONCenterpiece
{
    public string? description { get; set; }
    public int? duration { get; set; }
    public string? href { get; set; }
    public JSONLabel[]? labels { get; set; }
    public string? productionId { get; set; }
    public JSONStage? stage { get; set; }
    public JSONThumbnail? thumbnail { get; set; }
    public JSONTime1? time { get; set; }
    public string? title { get; set; }
    public JSONVillage1? village { get; set; }
    public JSONTicketed? ticketed { get; set; }
}

public class JSONStage
{
    public required string href { get; set; }
    public required string name { get; set; }
}

public class JSONThumbnail
{
    public required string mobile { get; set; }
    public required string web { get; set; }
}

public class JSONTime1
{
    public required string href { get; set; }
    public required string name { get; set; }
}

public class JSONVillage1
{
    public required string href { get; set; }
    public required string name { get; set; }
}

public class JSONTicketed
{
    public required string href { get; set; }
    public required string name { get; set; }
}

public class JSONLabel
{
    public required JSONFeaturedcolor1 featuredColor { get; set; }
    public required string href { get; set; }
    public required string name { get; set; }
}

public class JSONFeaturedcolor1
{
    public required string background { get; set; }
    public required string foreground { get; set; }
}

public class JSONSeo
{
    public required object[] link { get; set; }
    public required JSONMeta[] meta { get; set; }
    public required string title { get; set; }
}

public class JSONMeta
{
    public required string content { get; set; }
    public string? property { get; set; }
    public string? name { get; set; }
}

using Application.Program.DTO;
using Domain;
using MediatR;
using Persistence;
using System.Globalization;
using System.Net.Http.Json;
using System.Text.RegularExpressions;
using System.Web;

namespace Application.Program.Command;

public class Download
{
    public class Command : IRequest<Unit>
    {
        public required string BaseUrl { get; set; }
    }

    public class Handler : IRequestHandler<Command, Unit>
    {
        private readonly HttpClient _httpClient;
        private readonly DataContext _dataContext;

        public Handler(DataContext dataContext)
        {
            _dataContext = dataContext;
            _httpClient = new HttpClient();
        }

        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            JSONProgramDTO? programDTO;
            HttpResponseMessage response = await _httpClient.GetAsync(request.BaseUrl);
            if (response.IsSuccessStatusCode)
            {
                programDTO = await response.Content.ReadFromJsonAsync<JSONProgramDTO>(
                    cancellationToken
                );
                SaveProgramData(programDTO!);
            }
            return Unit.Value;
        }

        private void SaveProgramData(JSONProgramDTO programDTO)
        {
            foreach (var item in programDTO.data.controls.genres)
            {
                if (!_dataContext.Genres.Any(x => x.Id == item.id))
                {
                    var genre = new Domain.Genre { Id = item.id, Name = item.name };
                    _dataContext.Genres.Add(genre);
                    _dataContext.SaveChanges();
                }
            }
            foreach (var item in programDTO.data.controls.villages)
            {
                if (!_dataContext.Villages.Any(x => x.Id == item.id))
                {
                    var village = new Domain.Village { Id = item.id, Name = item.name };
                    _dataContext.Villages.Add(village);
                    _dataContext.SaveChanges();
                }
            }

            foreach (var item in _dataContext.TimeTables)
            {
                _dataContext.TimeTables.Remove(item);
            }
            _dataContext.SaveChanges();

            foreach (var item in _dataContext.Programs)
            {
                _dataContext.Programs.Remove(item);
            }
            _dataContext.SaveChanges();

            foreach (var item in programDTO.data.centerpiece)
            {
                var id = item.productionId;
                var description = item.description;
                DateTime? startTime = null;
                DateTime? endTime = null;
                int? duration = null;
                if (item.time != null)
                {
                    startTime = DateTime.ParseExact(
                        item.time.name,
                        "MMM d. (dddd) HH:mm",
                        new CultureInfo("hu-HU")
                    );
                    duration = item.duration;
                    endTime = startTime?.AddMinutes(duration != null ? (double)duration! : 0);
                }
                Domain.Stage? stage = null;
                if (item.stage != null)
                {
                    stage = _dataContext.Stages.FirstOrDefault(
                        x => x.Id == item.stage!.href.Substring(1)
                    );
                    if (stage == null)
                    {
                        var village = _dataContext.Villages.FirstOrDefault(
                            x => x.Id == item.village!.href.Substring(1)
                        );
                        stage = new Domain.Stage
                        {
                            Id = item.stage!.href.Substring(1),
                            Name = item.stage!.name,
                            Village = village!
                        };
                        _dataContext.Stages.Add(stage);
                        _dataContext.SaveChanges();
                    }
                }

                var program = _dataContext.Programs.FirstOrDefault(x => x.Id == id);
                if (program == null)
                {
                    program = new Domain.Program
                    {
                        Id = id!,
                        Title = item.title!,
                        Description = StripHtml(description ?? ""),
                        Thumbnail = item.thumbnail?.web
                    };
                    _dataContext.Programs.Add(program);
                    _dataContext.SaveChanges();
                }

                var timeTable = new TimeTable
                {
                    Program = program,
                    StartTime = startTime,
                    EndTime = endTime,
                    Duration = duration,
                    Stage = stage!
                };
                _dataContext.TimeTables.Add(timeTable);
                _dataContext.SaveChanges();
            }
        }

        private string StripHtml(string text)
        {
            string result = Regex.Replace(text, "<.*?>", string.Empty);
            result = HttpUtility.HtmlDecode(result);
            return result.Trim();
        }
    }
}

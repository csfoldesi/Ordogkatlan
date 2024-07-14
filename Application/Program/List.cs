using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Persistence;

namespace Application.Program;

public class List
{
    public class Query : IRequest<Result<PagedList<ProgramListItemDTO>>>
    {
        public required ProgramParams Params { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<PagedList<ProgramListItemDTO>>>
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public Handler(DataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }

        public async Task<Result<PagedList<ProgramListItemDTO>>> Handle(
            Query request,
            CancellationToken cancellationToken
        )
        {
            var query = _dataContext.TimeTables
                .OrderBy(x => x.StartTime)
                .ProjectTo<ProgramListItemDTO>(_mapper.ConfigurationProvider);

            if (request.Params.Date.HasValue)
            {
                query = query.Where(x => x.Date == request.Params.Date.Value);
            }
            if (!string.IsNullOrEmpty(request.Params.Village))
            {
                query = query.Where(x => x.VillageId == request.Params.Village);
            }
            if (!string.IsNullOrEmpty(request.Params.Stage))
            {
                query = query.Where(x => x.StageId == "/" + request.Params.Stage);
            }
            if (!string.IsNullOrEmpty(request.Params.SearchText))
            {
                query = query.Where(
                    x =>
                        x.Title.ToLower().Contains(request.Params.SearchText.ToLower())
                        || (x.Description ?? "")
                            .ToLower()
                            .Contains(request.Params.SearchText.ToLower())
                );
            }

            return Result<PagedList<ProgramListItemDTO>>.Success(
                await PagedList<ProgramListItemDTO>.CreateAsync(
                    query,
                    request.Params.PageNumber,
                    request.Params.PageSize
                )
            );
        }
    }
}

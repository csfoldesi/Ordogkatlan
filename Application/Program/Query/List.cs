using Application.Core;
using Application.Interfaces;
using Application.Program.DTO;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Program.Query;

public class List
{
    public class Query : IRequest<Result<PagedList<ProgramListItemDTO>>>
    {
        public required Params Params { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<PagedList<ProgramListItemDTO>>>
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;

        public Handler(DataContext dataContext, IMapper mapper, IUserAccessor userAccessor)
        {
            _dataContext = dataContext;
            _mapper = mapper;
            _userAccessor = userAccessor;
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
            else
            {
                query = query.Where(x => x.EndTime >= DateTime.Now);
            }
            if (request.Params.Village.Count() > 0)
            {
                query = query.Where(x => request.Params.Village.Contains(x.VillageId));
            }
            if (request.Params.Stage.Count() > 0)
            {
                query = query.Where(x => request.Params.Stage.Contains(x.StageId));
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

            var pagedList = await PagedList<ProgramListItemDTO>.CreateAsync(
                query,
                request.Params.PageNumber,
                request.Params.PageSize
            );

            var user = await _dataContext.Users.FirstOrDefaultAsync(
                x => x.Id == _userAccessor.GetUserId(),
                cancellationToken: cancellationToken
            );
            if (user != null)
            {
                var userSelectedPrograms = await _dataContext.UserTimeTables
                    .Where(x => x.UserId == user.Id)
                    .Select(x => x.TimetableId)
                    .ToListAsync();

                foreach (var item in pagedList)
                {
                    item.IsSelected = userSelectedPrograms.Any(x => x == item.PerformanceId);
                }
            }

            return Result<PagedList<ProgramListItemDTO>>.Success(pagedList);
        }
    }
}

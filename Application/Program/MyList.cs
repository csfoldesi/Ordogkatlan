using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Program;

public class MyList
{
    public class Query : IRequest<Result<PagedList<ProgramListItemDTO>>>
    {
        public required ProgramParams Params { get; set; }
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
            var user = await _dataContext.Users.FirstOrDefaultAsync(
                x => x.Id == _userAccessor.GetUserId(),
                cancellationToken: cancellationToken
            );
            if (user == null)
            {
                return Result<PagedList<ProgramListItemDTO>>.Failure("User not found");
            }

            var query = _dataContext.UserTimeTables
                .Where(x => x.UserId == user.Id)
                .Select(x => x.TimeTable)
                .OrderBy(x => x!.StartTime)
                .ProjectTo<ProgramListItemDTO>(_mapper.ConfigurationProvider);

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

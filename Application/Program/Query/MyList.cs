using Application.Core;
using Application.Interfaces;
using Application.Program.DTO;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Program.Query;

public class MyList
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

            var pagedList = await PagedList<ProgramListItemDTO>.CreateAsync(
                query,
                request.Params.PageNumber,
                request.Params.PageSize
            );
            pagedList.ForEach(item => item.IsSelected = true);

            return Result<PagedList<ProgramListItemDTO>>.Success(pagedList);
        }
    }
}

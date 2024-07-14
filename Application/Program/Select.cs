using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Program;

public class Select
{
    public class Command : IRequest<Result<Unit>>
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _dataContext;
        private readonly IUserAccessor _userAccessor;

        public Handler(DataContext context, IUserAccessor userAccessor)
        {
            _dataContext = context;
            _userAccessor = userAccessor;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _dataContext.Users.FirstOrDefaultAsync(
                x => x.Id == _userAccessor.GetUserId(),
                cancellationToken: cancellationToken
            );
            if (user == null)
            {
                return Result<Unit>.Failure("User not found");
            }

            var userTimeTableItem = await _dataContext.UserTimeTables.FirstOrDefaultAsync(
                x => x.UserId == user.Id && x.TimetableId == request.Id,
                cancellationToken: cancellationToken
            );

            if (userTimeTableItem == null)
            {
                userTimeTableItem = new Domain.UserTimetable
                {
                    TimetableId = request.Id,
                    UserId = user.Id
                };
                _dataContext.UserTimeTables.Add(userTimeTableItem);
            }
            else
            {
                _dataContext.UserTimeTables.Remove(userTimeTableItem);
            }

            var result = await _dataContext.SaveChangesAsync(cancellationToken) > 0;

            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Problem selecting/unselection program");
        }
    }
}

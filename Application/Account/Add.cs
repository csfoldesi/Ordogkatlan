using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Application.Account;

public class Add
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string Email { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly UserManager<User> _userManager;
        private readonly IEmailAccessor _emailAccessor;
        private readonly string _subjectTemplate;
        private readonly string _bodyTemplate;

        public Handler(
            UserManager<User> userManager,
            IEmailAccessor emailAccessor,
            IOptions<RegisterEmailSettings> config
        )
        {
            _userManager = userManager;
            _emailAccessor = emailAccessor;
            _subjectTemplate = config.Value.SubjectTemplate;
            _bodyTemplate = config.Value.BodyTemplate;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == request.Email);
            IdentityResult result;
            if (user == null)
            {
                user = new User
                {
                    UserName = request.Email,
                    Email = request.Email,
                    Token = Guid.NewGuid(),
                    TokenValidationDateTime = DateTime.UtcNow.AddDays(1)
                };
                result = await _userManager.CreateAsync(user);
            }
            else
            {
                user.Token = Guid.NewGuid();
                user.TokenValidationDateTime = DateTime.UtcNow.AddDays(1);
                result = await _userManager.UpdateAsync(user);
            }
            if (result.Succeeded)
            {
                var emailResult = await _emailAccessor.SendEmailAsync(
                    request.Email,
                    _subjectTemplate,
                    string.Format(_bodyTemplate, user.Token.ToString())
                );
                if (emailResult)
                {
                    return Result<Unit>.Success(Unit.Value);
                }
            }
            return Result<Unit>.Failure("Az email elküldése nem sikerült");
        }
    }
}

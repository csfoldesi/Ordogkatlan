using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Account;

public class Add
{
    public class Command : IRequest<Unit>
    {
        public required string Email { get; set; }
    }

    public class Handler : IRequestHandler<Command, Unit>
    {
        private readonly UserManager<User> _userManager;
        private readonly IEmailAccessor _emailAccessor;

        public Handler(UserManager<User> userManager, IEmailAccessor emailAccessor)
        {
            _userManager = userManager;
            _emailAccessor = emailAccessor;
        }

        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == request.Email);
            IdentityResult result;
            if (user == null)
            {
                user = new User
                {
                    UserName = request.Email,
                    Email = request.Email,
                    Token = Guid.NewGuid()
                };
                result = await _userManager.CreateAsync(user);
            }
            else
            {
                user.Token = Guid.NewGuid();
                result = await _userManager.UpdateAsync(user);
            }
            if (result.Succeeded)
            {
                var emailResult = await _emailAccessor.SendEmailAsync(
                    request.Email,
                    "Test",
                    "UserToken: " + user.Token.ToString()
                );
            }
            return Unit.Value;
        }
    }
}

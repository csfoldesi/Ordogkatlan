using API.DTOs;
using API.Services;
using Application.Account;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : BaseApiController
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly TokenService _tokenService;

    public AccountController(
        UserManager<User> userManager,
        SignInManager<User> signInManager,
        TokenService tokenService
    )
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenService = tokenService;
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDTO registerDto)
    {
        await Mediator.Send(new Add.Command { Email = registerDto.Email });
        return Ok();
    }

    [AllowAnonymous]
    [HttpGet("{token}")]
    public async Task<ActionResult<UserDTO>> Login(Guid token)
    {
        var user = await _userManager.Users.FirstOrDefaultAsync(
            x => x.Token == token && x.TokenValidationDateTime >= DateTime.Now
        );
        if (user == null)
        {
            return Unauthorized();
        }
        return new UserDTO
        {
            Email = user.Email!,
            DisplayName = user.DisplayName,
            Token = _tokenService.CreateToken(user)
        };
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<UserDTO>> GetCurrentUser()
    {
        var user = await _userManager.Users.FirstOrDefaultAsync(
            x => x.Email == User.FindFirstValue(ClaimTypes.Email)
        );

        if (user == null)
        {
            return Unauthorized();
        }

        return new UserDTO
        {
            Email = user.Email!,
            DisplayName = user.DisplayName,
            Token = (await HttpContext.GetTokenAsync("access_token"))!
        };
    }
}

﻿using Application.Program;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ProgramController : BaseApiController
{
    [HttpPost]
    public async Task<IActionResult> DownloadProgram()
    {
        await Mediator.Send(
            new Application.Program.Download.Command
            {
                BaseUrl = "https://idevelopment.hu/2024.json"
            }
        );
        return Ok();
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> List([FromQuery] ProgramParams param)
    {
        var result = await Mediator.Send(new Application.Program.List.Query { Params = param });
        return HandlePagedResult(result);
    }
}

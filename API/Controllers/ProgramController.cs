using Application.Program;
using Application.Program.Command;
using Application.Program.Query;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ProgramController : BaseApiController
{
    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> List([FromQuery] Params param)
    {
        var result = await Mediator.Send(new List.Query { Params = param });
        return HandlePagedResult(result);
    }

    [HttpGet("catalog")]
    [AllowAnonymous]
    public async Task<IActionResult> Catalog()
    {
        var result = await Mediator.Send(new Catalog.Query { });
        return HandleResult(result);
    }

    [HttpGet("my")]
    public async Task<IActionResult> ListMy([FromQuery] Params param)
    {
        var result = await Mediator.Send(new MyList.Query { Params = param });
        return HandlePagedResult(result);
    }

    [HttpPost("{id}/select")]
    public async Task<IActionResult> Select(Guid id)
    {
        var result = await Mediator.Send(new Select.Command { Id = id });
        return HandleResult(result);
    }

    [HttpPost]
    public async Task<IActionResult> DownloadProgram()
    {
        await Mediator.Send(new Download.Command { BaseUrl = "https://idevelopment.hu/2024.json" });
        return Ok();
    }
}

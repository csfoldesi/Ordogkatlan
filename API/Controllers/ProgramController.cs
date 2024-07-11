using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

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
}

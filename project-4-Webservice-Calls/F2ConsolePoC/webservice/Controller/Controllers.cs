using Microsoft.AspNetCore.Mvc;

namespace webservice.Controller;

[ApiController]
[Route("api/string")]

public class StringController : ControllerBase
{
    private static readonly List<string> strings = new();

    [HttpPost]
    public IActionResult PostString([FromBody] string message)
    {
        strings.Add(message);
        return Ok($"Recived String: {message}");
    }

    [HttpGet]
    public IActionResult GetString()
    {
        return Ok(strings);
    }
}
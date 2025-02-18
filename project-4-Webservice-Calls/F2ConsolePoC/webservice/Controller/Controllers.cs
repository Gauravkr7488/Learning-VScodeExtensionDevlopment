using Microsoft.AspNetCore.Mvc;

namespace webservice.Controller;

[ApiController]
[Route("api/string")]

public class StringController : ControllerBase
{
    private static readonly List<string> strings = new();

    [HttpPost]
    public IActionResult PostString([FromBody] StringMessage body)
    {
        
        // string message = body.ToString();
        string message = body.String;
        strings.Clear();
        strings.Add(message);
        Console.WriteLine($"Recived String: {message}");
        return Ok($"Recived String: {message}");
    }

    [HttpGet]
    public IActionResult GetString()
    {
        return Ok(strings);
    }
}

public class StringMessage
{
    public required string String { get; set; }
}

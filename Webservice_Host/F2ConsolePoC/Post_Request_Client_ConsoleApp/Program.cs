using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        using HttpClient client = new HttpClient();

        while (true)
        {
            Console.Write("Enter a message (or 'exit' to quit): ");
            string message = Console.ReadLine();

            if (message?.ToLower() == "exit")
                break;

            await SendMessage(client, message);
        }
    }

    static async Task SendMessage(HttpClient client, string message)
    {
        string url = "http://localhost:3000/api/data"; // Update with actual API URL

        // Create JSON object with the correct structure
        var messageObject = new { message = message };
        string json = JsonSerializer.Serialize(messageObject);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        HttpResponseMessage response = await client.PostAsync(url, content);

        string responseText = await response.Content.ReadAsStringAsync();
        Console.WriteLine($"Response: {responseText}");
    }
}

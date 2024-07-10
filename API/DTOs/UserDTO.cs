namespace API.DTOs;

public class UserDTO
{
    public string? DisplayName { get; set; }

    public required string Token { get; set; }

    public required string Email { get; set; }
}

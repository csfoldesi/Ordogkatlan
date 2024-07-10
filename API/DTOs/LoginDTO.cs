using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class LoginDTO
{
    [Required]
    [EmailAddress]
    public required string Email { get; set; }
}

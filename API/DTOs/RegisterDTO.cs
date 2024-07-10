using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDTO
{
    [Required]
    [EmailAddress]
    public required string Email { get; set; }
}

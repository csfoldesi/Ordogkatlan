namespace Application.Interfaces;

public interface IEmailAccessor
{
    Task<bool> SendEmailAsync(string emailAddress, string subject, string body);
}

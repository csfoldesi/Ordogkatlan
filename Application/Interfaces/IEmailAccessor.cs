namespace Application.Interfaces;

public interface IEmailAccessor
{
    Task<string> SendEmailAsync(string emailAddress, string subject, string body);
}

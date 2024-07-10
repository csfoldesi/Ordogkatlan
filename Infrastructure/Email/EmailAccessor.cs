using Application.Interfaces;
using Azure;
using Azure.Communication.Email;
using Microsoft.Extensions.Options;

namespace Infrastructure.Email;

public class EmailAccessor : IEmailAccessor
{
    private readonly EmailClient _client;
    private readonly string _senderAddress;

    public EmailAccessor(IOptions<AzureSettings> config)
    {
        _client = new EmailClient(config.Value.ConnectionString);
        _senderAddress = config.Value.SenderAddress;
    }

    public async Task<string> SendEmailAsync(string emailAddress, string subject, string body)
    {
        try
        {
            var emailSendOperation = await _client.SendAsync(
                WaitUntil.Completed,
                senderAddress: _senderAddress,
                recipientAddress: emailAddress,
                subject: subject,
                htmlContent: body,
                plainTextContent: body
            );

            return emailSendOperation.Value.Status.ToString();
        }
        catch (RequestFailedException ex)
        {
            return ex.Message;
        }
    }
}

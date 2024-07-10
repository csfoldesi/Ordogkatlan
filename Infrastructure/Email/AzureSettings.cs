namespace Infrastructure.Email
{
    public class AzureSettings
    {
        public required string ConnectionString { get; set; }

        public required string SenderAddress { get; set; }
    }
}

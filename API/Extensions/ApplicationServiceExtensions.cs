using Application.Account;
using Application.Core;
using Application.Interfaces;
using Infrastructure.Email;
using Infrastructure.Security;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        services.AddDbContext<DataContext>(options =>
        {
            options.UseSqlite(configuration.GetConnectionString("DefaultConnection")!);
        });

        services.AddCors(options =>
        {
            options.AddPolicy(
                "CorsPolicy",
                policy =>
                {
                    policy
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials()
                        .WithOrigins(
                            [.. configuration
                                .GetSection("AllowedOrigins")!
                                .Get<List<string>>()]
                        );
                }
            );
        });

        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Add.Handler).Assembly));
        services.AddScoped<IEmailAccessor, EmailAccessor>();

        services.AddAutoMapper(typeof(MappingProfiles).Assembly);
        services.AddScoped<IUserAccessor, UserAccessor>();

        /*services.AddFluentValidationAutoValidation();
        services.AddValidatorsFromAssemblyContaining<Create>();*/

        //services.AddSignalR();

        services.Configure<AzureSettings>(configuration.GetSection("AzureEmail"));
        services.Configure<RegisterEmailSettings>(configuration.GetSection("RegisterEmail"));

        return services;
    }
}

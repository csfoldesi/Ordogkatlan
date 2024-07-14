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

        /*services.AddCors(options =>
        {
            options.AddPolicy(
                "CorsPolicy",
                policy =>
                {
                    policy
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials()
                        .WithOrigins("http://localhost:3000");
                }
            );
        });*/

        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Add.Handler).Assembly));
        services.AddScoped<IEmailAccessor, EmailAccessor>();

        services.AddAutoMapper(typeof(MappingProfiles).Assembly);
        services.AddScoped<IUserAccessor, UserAccessor>();
        /*services.AddScoped<IPhotoAccessor, PhotoAccessor>();*/

        /*services.AddFluentValidationAutoValidation();
        services.AddValidatorsFromAssemblyContaining<Create>();*/

        //services.AddSignalR();

        //services.Configure<CloudinarySettings>(configuration.GetSection("Cloudinary"));
        services.Configure<AzureSettings>(configuration.GetSection("AzureEmail"));

        return services;
    }
}

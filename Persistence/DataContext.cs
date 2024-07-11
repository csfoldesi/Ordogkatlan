using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext(DbContextOptions options) : IdentityDbContext<User>(options)
    {
        public DbSet<Village> Villages { get; set; }
        public DbSet<Stage> Stages { get; set; }
        public DbSet<Program> Programs { get; set; }
        public DbSet<TimeTable> TimeTables { get; set; }

        public DbSet<Genre> Genres { get; set; }
    }
}

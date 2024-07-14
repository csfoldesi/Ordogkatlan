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
        public DbSet<UserTimetable> UserTimeTables { get; set; }

        public DbSet<Genre> Genres { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserTimetable>(x => x.HasKey(ut => new { ut.UserId, ut.TimetableId }));
            builder
                .Entity<UserTimetable>()
                .HasOne(ut => ut.User)
                .WithMany(u => u.Timetable)
                .HasForeignKey(ut => ut.UserId);
            builder
                .Entity<UserTimetable>()
                .HasOne(ut => ut.TimeTable)
                .WithMany(t => t.UserTimetables)
                .HasForeignKey(ut => ut.TimetableId);
        }
    }
}

using Microsoft.EntityFrameworkCore;

namespace incubis_assignment;

public class AppDbContext : DbContext
{
    public DbSet<Contacts> Contacts { get; set; }
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Definiranje primarnog ključa za entitet Contacts
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Contacts>()
            .Property(c => c.Id)
            .IsRequired();
    }
}
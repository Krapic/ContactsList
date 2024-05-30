using Microsoft.EntityFrameworkCore;

namespace incubis_assignment;

public class AppDbContext : DbContext
{
    public DbSet<Contacts> Contacts { get; set; }
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Definiranje primarnog ključa za entitet Contacts
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Contacts>()
            .Property(c => c.Id)
            .IsRequired();
    }
}
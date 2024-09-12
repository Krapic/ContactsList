using Microsoft.EntityFrameworkCore;

namespace incubis_assignment
{
    public class AppDbContext : DbContext
    {
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Email> Emails { get; set; }
        public DbSet<PhoneNumber> PhoneNumbers { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure primary key for Contact
            modelBuilder.Entity<Contact>()
                .HasKey(c => c.Id);

            // Configure relationships
            modelBuilder.Entity<Contact>()
                .HasMany(c => c.Emails)
                .WithOne(e => e.Contact)
                .HasForeignKey(e => e.ContactId)
                .OnDelete(DeleteBehavior.Cascade); // Ensure cascading delete

            modelBuilder.Entity<Contact>()
                .HasMany(c => c.PhoneNumbers)
                .WithOne(p => p.Contact)
                .HasForeignKey(p => p.ContactId)
                .OnDelete(DeleteBehavior.Cascade); // Ensure cascading delete

            // Configure primary key for Email
            modelBuilder.Entity<Email>()
                .HasKey(e => e.Id);

            // Configure primary key for PhoneNumber
            modelBuilder.Entity<PhoneNumber>()
                .HasKey(p => p.Id);
        }
    }
}
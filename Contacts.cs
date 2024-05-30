using System.ComponentModel.DataAnnotations;

namespace incubis_assignment
{
    // Definiranje entiteta Contacts
    public class Contacts
    {
        // Definiranje svojstava entiteta Contacts
        [Required]
        // Definiranje primarnog ključa za entitet Contacts
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? Surname { get; set; }
        public string? Email { get; set; }
        [Required]
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? Type { get; set; }
    }
}

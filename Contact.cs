using System.ComponentModel.DataAnnotations;

namespace incubis_assignment
{
    // Definiranje entiteta Contacts
    public class Contact
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Address { get; set; }
        public string Type { get; set; }
        public ICollection<Email> Emails { get; set; }
        public ICollection<PhoneNumber> PhoneNumbers { get; set; }
    }

    public class Email
    {
        public int Id { get; set; }
        public string EmailAddress { get; set; }
        public int ContactId { get; set; }
        public Contact Contact { get; set; }
    }

    public class PhoneNumber
    {
        public int Id { get; set; }
        public string Number { get; set; }
        public int ContactId { get; set; }
        public Contact Contact { get; set; }
    }
}

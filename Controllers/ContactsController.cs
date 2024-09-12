using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace incubis_assignment.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ContactsController(AppDbContext context)
        {
            _context = context;
        }

        // Post API Endpoint
        [HttpPost]
        public JsonResult CreateEdit(Contact contact)
        {
            if (contact.Id == 0)
            {
                _context.Contacts.Add(contact);
            }
            else
            {
                var contactInDb = _context.Contacts
                    .Include(c => c.Emails)
                    .Include(c => c.PhoneNumbers)
                    .FirstOrDefault(c => c.Id == contact.Id);

                if (contactInDb == null)
                    return new JsonResult(NotFound());

                contactInDb.Name = contact.Name;
                contactInDb.Surname = contact.Surname;
                contactInDb.Address = contact.Address;
                contactInDb.Type = contact.Type;

                // Update emails
                _context.Emails.RemoveRange(contactInDb.Emails);
                contactInDb.Emails = contact.Emails;

                // Update phone numbers
                _context.PhoneNumbers.RemoveRange(contactInDb.PhoneNumbers);
                contactInDb.PhoneNumbers = contact.PhoneNumbers;
            }

            _context.SaveChanges();

            return new JsonResult(Ok(contact));
        }

        // Get API Endpoint
        [HttpGet]
        public JsonResult Get(int id)
        {
            var result = _context.Contacts
                .Include(c => c.Emails)
                .Include(c => c.PhoneNumbers)
                .FirstOrDefault(c => c.Id == id);

            if (result == null)
                return new JsonResult(NotFound());

            return new JsonResult(Ok(result));
        }

        // Delete API Endpoint
        [HttpDelete]
        public JsonResult Delete(int id)
        {
            var result = _context.Contacts
                .Include(c => c.Emails)
                .Include(c => c.PhoneNumbers)
                .FirstOrDefault(c => c.Id == id);

            if (result == null)
                return new JsonResult(NotFound());

            _context.Contacts.Remove(result);
            _context.SaveChanges();

            return new JsonResult(NoContent());
        }

        // Get All API Endpoint
        [HttpGet]
        public JsonResult GetAll()
        {
            var result = _context.Contacts
                .Include(c => c.Emails)
                .Include(c => c.PhoneNumbers)
                .ToList();
            return new JsonResult(Ok(result));
        }

        [HttpPut("{id}")]
        public IActionResult UpdateContact(int id, [FromBody] Contact updatedContact)
        {
            var contact = _context.Contacts
                .Include(c => c.Emails)
                .Include(c => c.PhoneNumbers)
                .FirstOrDefault(c => c.Id == id);
            if (contact == null)
            {
                return NotFound();
            }

            contact.Name = updatedContact.Name;
            contact.Surname = updatedContact.Surname;
            contact.Address = updatedContact.Address;
            contact.Type = updatedContact.Type;

            // Update emails
            _context.Emails.RemoveRange(contact.Emails);
            contact.Emails = updatedContact.Emails;

            // Update phone numbers
            _context.PhoneNumbers.RemoveRange(contact.PhoneNumbers);
            contact.PhoneNumbers = updatedContact.PhoneNumbers;

            _context.Contacts.Update(contact);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
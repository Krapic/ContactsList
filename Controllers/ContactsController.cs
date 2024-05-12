using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;

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
        public JsonResult CreateEdit(Contacts contact)
        {
            if (contact.Id == 0)
            {
                _context.Contacts.Add(contact);
            }
            else
            {
                var contactInDb = _context.Contacts.Find(contact.Id);

                if (contactInDb == null)
                    return new JsonResult(NotFound());

                contactInDb = contact;
            }

            _context.SaveChanges();

            return new JsonResult(Ok(contact));
        }

        // Get API Endpoint
        [HttpGet]
        public JsonResult Get(int id)
        {
            var result = _context.Contacts.Find(id);

            if (result == null)
                return new JsonResult(NotFound());

            return new JsonResult(Ok(result));
        }

        // Delete API Endpoint
        [HttpDelete]
        public JsonResult Delete(int id)
        {
            var result = _context.Contacts.Find(id);

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
            var result = _context.Contacts.ToList();
            return new JsonResult(Ok(result));
        }

    }
}

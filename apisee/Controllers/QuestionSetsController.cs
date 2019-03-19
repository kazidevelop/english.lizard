using System.Collections.Generic;
using System.Threading.Tasks;
using apisee.Models;
using apisee.Services;
using apisee.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace apisee.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class QuestionSetsController : ControllerBase {
        private readonly ChiggyContext _context;

        /// <inheritdoc />
        public QuestionSetsController (ChiggyContext context) {
            _context = context;
        }

        // GET: api/QuestionSet
        [HttpGet]
        public IEnumerable<QuestionSetViewModel> GetSets () {
            var service = new QuestionSetService (_context); // TODO inject 
            return service.GetQuestionSets ();
        }

        //TODO async... and return... in same 
        [HttpPost]
        public void SaveSet (QuestionSetViewModel questionSet) {
            var service = new QuestionSetService (_context);
            service.SaveQuestionSet (questionSet);
        }


        // DELETE: api/questionSets/4
        //TODO   return NotFound();
        [HttpDelete("{id}")]
        public IActionResult DeleteTodoItem(int id)
        {
            var service = new QuestionSetService(_context);

            service.DeleteQuestonSet(id);

            return NoContent();
        }


    }
}
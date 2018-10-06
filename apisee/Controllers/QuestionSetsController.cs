using System.Collections.Generic;
using apisee.Models;
using apisee.Services;
using apisee.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace apisee.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionSetsController : ControllerBase
    {
        private readonly ChiggyContext _context;

        /// <inheritdoc />
        public QuestionSetsController(ChiggyContext context)
        {
            _context = context;
        }

        // GET: api/QuestionSet
        [HttpGet]
        public IEnumerable<QuestionSetViewModel> GetSets()
        {
            var service = new QuestionSetService(_context); // TODO inject 
            return service.GetQuestionSets();
        }
        [HttpPost]
        public void SaveSet(QuestionSetViewModel questionSet)
        {
            var service = new QuestionSetService(_context);
            service.SaveQuestionSet(questionSet);

            
        }
    }
}
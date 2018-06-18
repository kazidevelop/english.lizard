using System.Collections.Generic;
using System.Linq;
using apisee.Models;
using apisee.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace apisee.Services
{
    public class QuestionSetService
    {

        private readonly ChiggyContext _context;

        public QuestionSetService(ChiggyContext context)
        {
            _context = context;
        }
        public IEnumerable<QuestionSetViewModel> GetQuestionSets()
        {

            var sets = _context.Sets
                .Include(b => b.Questions)
                .Where(d => d.Questions.Any())
                .ToList();
            var viewSets = new QuestionSetMapper(sets).GetViewSets(); // TODO inject... 
            return viewSets;
        }
    }
}
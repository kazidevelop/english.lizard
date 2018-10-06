using System;
using System.Collections.Generic;
using System.Diagnostics;
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
            try
            {

                var contextSets = _context.Sets;
                var sets = contextSets
                     .Include(b => b.Questions)
                     .Where(d => d.Questions.Any())
                     .ToList();
                var viewSets = new QuestionSetMapper().GetViewSets(sets); // TODO inject... 
                return viewSets;
            }
            catch (Exception e)
            {
                Trace.TraceError($"GetQuestionSets: {e}");
            }
            return new List<QuestionSetViewModel>();
        }

        internal void SaveQuestionSet(QuestionSetViewModel questionSet)
        {
            var previousDatabaseSet = _context.Sets.Include(d => d.Questions).FirstOrDefault(set => set.SetId == questionSet.Id);
            var isNewQuestionSet = previousDatabaseSet == null;

            var newSet = new QuestionSetMapper().GetSet(questionSet); // TODO inject...
            if (isNewQuestionSet)
            {
                AddNewQuestionSet(newSet);
                return;
            }

            var questionsToSave = newSet.Questions.Select(question => question.QuestionId).Where(d => d > 0);
            var removeQuestions = _context.Questions.Where(q => q.FkSetId == questionSet.Id && !questionsToSave.Contains(q.QuestionId));
            foreach (var item in removeQuestions)
            {
                _context.Questions.Remove(item);
            }

            //set database properties....
            newSet.CreatedDate = previousDatabaseSet.CreatedDate;
            newSet.ModifiedDate = DateTime.Now;
            foreach (var item in newSet.Questions)
            {
                item.CreatedDate = DateTime.Now;
                item.ModifiedDate = DateTime.Now;
                item.FkSetId = newSet.SetId;
                var previousQuestion = _context.Questions.FirstOrDefault(q => q.QuestionId == item.QuestionId);
                if(previousQuestion == null)
                {
                      _context.Questions.Add(item);
                }
                else{
                      _context.Entry(previousQuestion).CurrentValues.SetValues(item);
                }
              
            }
            _context.Entry(previousDatabaseSet).CurrentValues.SetValues(newSet);

            _context.SaveChanges();
        }

        private void AddNewQuestionSet(Sets newSet)
        {
            _context.Add(newSet);
            _context.SaveChanges();
        }
    }
}
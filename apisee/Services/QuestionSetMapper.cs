using System.Collections.Generic;
using System.Linq;
using apisee.Models;
using apisee.ViewModels;

namespace apisee.Services
{
    public class QuestionSetMapper
    {
        private readonly List<Sets> _sets;

        /// <inheritdoc />
        public QuestionSetMapper(List<Sets> sets)
        {
            _sets = sets;
        }

        public IEnumerable<QuestionSetViewModel> GetViewSets()
        {
            var viewSets = new List<QuestionSetViewModel>();
            foreach (var set in _sets)
            {
                var viewSet = new QuestionSetViewModel
                {
                    Heading = set.SetName,
                    Questions = GetQuestions(set)
                };
                viewSets.Add(viewSet);
            }

            return viewSets;
        }

        private List<QuestionViewModel> GetQuestions(Sets set)
        {
            var questions = set.Questions?.Select(tblQuestion => new
                {
                    tblQuestion,
                    choices = GetChoices(tblQuestion)
                }).Where(d => d.choices.Any())
                ?.Select(t => new QuestionViewModel
                {
                    Text = t.tblQuestion.Question,
                    Answer = t.choices[t.tblQuestion.CorrectAnswerNo - 1],
                    Choices = t.choices
                }).ToList();
            return questions;
        }

        private List<string> GetChoices(Questions tblQuestion)
        {
            var choices = new List<string>
            {
                tblQuestion.Choice1,
                tblQuestion.Choice2,
                tblQuestion.Choice3,
                tblQuestion.Choice4,
                tblQuestion.Choice5,
                tblQuestion.Choice6
            };

            return choices.Where(d => !string.IsNullOrWhiteSpace(d)).ToList();
        }
    }
}
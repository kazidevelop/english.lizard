using System;
using System.Collections.Generic;
using System.Linq;
using apisee.Models;
using apisee.ViewModels;

namespace apisee.Services
{
    public class QuestionSetMapper
    {

        public IEnumerable<QuestionSetViewModel> GetViewSets(List<Sets> sets)
        {
            var viewSets = new List<QuestionSetViewModel>();
            foreach (var set in sets)
            {
                var viewSet = new QuestionSetViewModel
                {
                    Id = set.SetId,
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
                    Id = t.tblQuestion.QuestionId,
                    Text = t.tblQuestion.Question,
                    Answer = t.choices[t.tblQuestion.CorrectAnswerNo - 1],
                    Choices = t.choices
                }).ToList();
            return questions;
        }

        internal Sets GetSet(QuestionSetViewModel questionSet)
        {
            var set = new Sets();
            set.SetName = questionSet.Heading;
            set.SetId = questionSet.Id;

            var databaseQuestions = new List<Questions>();
            foreach (var viewQuestion in questionSet.Questions)
            {
                var databaseQuestion = new Questions
                {
                    Question = viewQuestion.Text,
                    QuestionId = viewQuestion.Id,
                    CorrectAnswerNo = 1
                };

                var viewChoices = viewQuestion.Choices.ToList();
                if (viewQuestion.Choices.Any())
                {
                    databaseQuestion.Choice1 = viewChoices[0];
                }
                if (viewQuestion.Choices.Count() > 1)
                {
                    databaseQuestion.Choice2 = viewChoices[1];
                }
                if (viewQuestion.Choices.Count() > 2)
                {
                    databaseQuestion.Choice3 = viewChoices[2];
                }
                if (viewQuestion.Choices.Count() > 3)
                {
                    databaseQuestion.Choice4 = viewChoices[3];
                }
                if (viewQuestion.Choices.Count() > 4)
                {
                    databaseQuestion.Choice5= viewChoices[4];
                }
                if (viewQuestion.Choices.Count() > 5)
                {
                    databaseQuestion.Choice6 = viewChoices[5];
                }
                 if (viewQuestion.Choices.Count() > 6)
                {
                    databaseQuestion.Choice7 = viewChoices[6];
                }
                databaseQuestions.Add(databaseQuestion);
            }
            set.Questions = databaseQuestions;
            return set;
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
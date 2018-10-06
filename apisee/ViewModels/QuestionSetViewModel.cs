using System.Collections.Generic;
using System.Runtime.Serialization;

namespace apisee.ViewModels
{
    [DataContract(Name = "questionSet")]
    public class QuestionSetViewModel
    {
        [DataMember(Name = "id")]
        public int Id { get; set; }

        [DataMember(Name = "heading")]
        public string Heading { get; set; }

        [DataMember(Name = "questions")]
        public IEnumerable<QuestionViewModel> Questions { get; set; }
    }
}
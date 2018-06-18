using System.Collections.Generic;
using System.Runtime.Serialization;

namespace apisee.ViewModels
{
    [DataContract(Name = "question")]
    public class QuestionViewModel
    {
        [DataMember(Name = "text")] public string Text { get; set; }

        [DataMember(Name = "choices")] public IEnumerable<string> Choices { get; set; }

        [DataMember(Name = "answer")] public string Answer { get; set; }
    }
}
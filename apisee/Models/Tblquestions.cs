using System;
using System.Collections.Generic;

namespace apisee.Models
{
    public partial class Tblquestions
    {
        public Tblquestions()
        {
            Tbluseranswers = new HashSet<Tbluseranswers>();
        }

        public int QuestionId { get; set; }
        public int FkSetId { get; set; }
        public string Question { get; set; }
        public string Choice1 { get; set; }
        public string Choice2 { get; set; }
        public string Choice3 { get; set; }
        public string Choice4 { get; set; }
        public string Choice5 { get; set; }
        public string Choice6 { get; set; }
        public int CorrectAnswerNo { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        public Tblsets FkSet { get; set; }
        public ICollection<Tbluseranswers> Tbluseranswers { get; set; }
    }
}

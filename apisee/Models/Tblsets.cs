using System;
using System.Collections.Generic;

namespace apisee.Models
{
    public class Tblsets
    {
        public Tblsets()
        {
            Tblquestions = new HashSet<Tblquestions>();
        }

        public int SetId { get; set; }
        public string SetName { get; set; }
        public int FkSubjectId { get; set; }
        public string NoSetOfQuestions { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        public TblSubjects FkSubject { get; set; }
        public ICollection<Tblquestions> Tblquestions { get; set; }
    }
}
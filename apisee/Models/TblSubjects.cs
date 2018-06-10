using System;
using System.Collections.Generic;

namespace apisee.Models
{
    public partial class TblSubjects
    {
        public TblSubjects()
        {
            Tblsets = new HashSet<Tblsets>();
        }

        public int SubjectId { get; set; }
        public string SubjectName { get; set; }
        public string SubjectDescription { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        public ICollection<Tblsets> Tblsets { get; set; }
    }
}

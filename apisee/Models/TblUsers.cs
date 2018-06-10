using System;
using System.Collections.Generic;

namespace apisee.Models
{
    public partial class TblUsers
    {
        public TblUsers()
        {
            Tbluseranswers = new HashSet<Tbluseranswers>();
        }

        public int UserId { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string Middlename { get; set; }
        public string Lastname { get; set; }
        public string Password { get; set; }
        public DateTime Dob { get; set; }
        public string Gender { get; set; }
        public bool Active { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        public ICollection<Tbluseranswers> Tbluseranswers { get; set; }
    }
}

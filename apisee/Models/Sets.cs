using System;
using System.Collections.Generic;

namespace apisee.Models
{
    public class Sets
    {
        public Sets()
        {
            Questions = new HashSet<Questions>();
        }

        public int SetId { get; set; }
        public string SetName { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        public ICollection<Questions> Questions { get; set; }
    }
}
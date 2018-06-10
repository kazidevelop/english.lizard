﻿using System;

namespace apisee.Models
{
    public class Tbluseranswers
    {
        public int UserAnswerId { get; set; }
        public int FkUserId { get; set; }
        public int FkQuestionid { get; set; }
        public int AnswerNo { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        public Tblquestions FkQuestion { get; set; }
        public TblUsers FkUser { get; set; }
    }
}
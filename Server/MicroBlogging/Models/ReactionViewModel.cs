using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MicroBlogging.Models
{
    public class ReactionViewModel
    {
        public int user_id { get; set; }
        public int post_id { get; set; }
        public string is_liked { get; set; }
        public string is_disliked { get; set; }
        public string comment { get; set; }

        [NotMapped]
        public string username { get; set; }

    }
}
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MicroBlogging.Models
{
    public class PostViewModel
    {
        public int user_id { get; set; }
        public int post_id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public int like_count { get; set; }
        public int dislike_count { get; set; }

        [NotMapped]
        public string liked { get; set; }
        public string disliked { get; set; }
        public string comment { get; set; }
        public string liked_by_user { get; set; }
        public string disliked_by_user { get; set; }
        public int current_user { get; set; }
        public List<ReactionViewModel> comment_list { get; set; }
    }
}
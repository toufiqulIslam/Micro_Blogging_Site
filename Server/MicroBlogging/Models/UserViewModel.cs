using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MicroBlogging.Models
{
    public class UserViewModel
    {
        public int user_id { get; set; }
        public string username { get; set; }
        public string email { get; set; }
        public string password { get; set; }
    }
}
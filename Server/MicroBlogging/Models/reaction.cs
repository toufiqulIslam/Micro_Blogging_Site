//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MicroBlogging.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class reaction
    {
        public int reaction_id { get; set; }
        public int user_id { get; set; }
        public int post_id { get; set; }
        public string is_liked { get; set; }
        public string is_disliked { get; set; }
        public string comment { get; set; }
    }
}
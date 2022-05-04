using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace NewsApi.Models
{
    public class Note
    {
        [Key]
        public int noteId { get; set; }

        [Column(TypeName = "nvarchar(250)")]
        public string noteTitle { get; set; }

        [Column(TypeName = "nvarchar(MAX)")]
        public string noteDescription { get; set; }
    }
}

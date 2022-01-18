using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CreateCommentDto
    {
        [Required]
        [MinLength(1)]
        [MaxLength(200)]
        public string Content { get; set; }
    }
}

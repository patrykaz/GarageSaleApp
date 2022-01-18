using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class AddressDto
    {
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string Street { get; set; }
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string City { get; set; }
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string Province { get; set; }
    }
}

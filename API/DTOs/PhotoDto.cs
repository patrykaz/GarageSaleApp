using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class PhotoDto
    {
        public long Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
    }
}

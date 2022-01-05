using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class AnnouncementParams : PaginationParams
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string OrderBy { get; set; } = "DateCreate";
    }
}

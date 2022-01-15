using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class AdminAnnouncementParams : PaginationParams
    {
        public string OrderBy { get; set; } = "DateCreate";
    }
}

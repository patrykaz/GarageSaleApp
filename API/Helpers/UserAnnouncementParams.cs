using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class UserAnnouncementParams : PaginationParams
    {
        public bool IsActive { get; set; } = true;
        public string OrderBy { get; set; } = "DateCreate";
    }
}

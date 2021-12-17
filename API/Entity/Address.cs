using System.Collections.Generic;

namespace API.Entity
{
    public class Address
    {
        public long Id { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public virtual ICollection<Announcement> Announcement { get; set; }
        public virtual ICollection<AppUser> AppUser { get; set; }
    }
}
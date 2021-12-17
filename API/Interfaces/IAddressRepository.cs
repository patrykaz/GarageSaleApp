using API.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IAddressRepository
    {
        public void Update(Address address);
        public void Add(Address address);
        public Address FindAddresByProperties(string Street, string City, string PostalCode);
        public Address GetAddressByIdAsync(long id);
    }
}

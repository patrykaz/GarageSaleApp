using API.Data;
using API.Entity;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public class AddressRepository : IAddressRepository
    {
        private readonly GarageSaleDbContext context;

        public AddressRepository(GarageSaleDbContext context)
        {
            this.context = context;
        }

        public void Update(Address address)
        {
            context.Entry(address).State = EntityState.Modified;
        }

        public void Add(Address address)
        {
            context.Addresses.Add(address);
        }


        public Address GetAddressByIdAsync(long id)
        {
            return context.Addresses
                .FirstOrDefault(a => a.Id == id);
        }

        public Address FindAddresByProperties(string Street, string City, string PostalCode)
        {
            return  context.Addresses
                .FirstOrDefault(u => u.Street == Street && u.City == City && u.PostalCode ==PostalCode);
        }
    }
}

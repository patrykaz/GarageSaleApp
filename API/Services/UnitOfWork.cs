using API.Data;
using API.Interfaces;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly GarageSaleDbContext context;
        private readonly IMapper mapper;

        public UnitOfWork(GarageSaleDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public IUserRepository UserRepository => new UserRepository(context, mapper);

        public IAnnouncementRepository AnnouncementRepository => new AnnouncementRepository(context, mapper);

        public IAddressRepository AddressRepository => new AddressRepository(context);

        public async Task<bool> Complete()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public bool HasChanges()
        {
            return context.ChangeTracker.HasChanges();
        }
    }
}

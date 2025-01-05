using CrudTest.Models;
using CrudTest.Models.Address;
using Microsoft.EntityFrameworkCore;

namespace CrudTest.Services
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {


        }
        public DbSet<Customer>Customers { get; set; }
        public DbSet<Province>Provinces { get; set; }
        public DbSet<District>Districts { get; set; }
        public DbSet<Municipality>Municipalities { get; set; }
        
    }
}

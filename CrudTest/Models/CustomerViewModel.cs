using System.Collections.Generic;
using CrudTest.Models.Address;
using Microsoft.EntityFrameworkCore.Query.Internal;

namespace CrudTest.Models
{
    public class CustomerViewModel
    {
        public Customer Customer { get; set; }
        public List<Province> Provinces { get; set; }
        public List<District> Districts { get; set; }
        public List<Municipality> Municipalities { get; set; }
    }
}

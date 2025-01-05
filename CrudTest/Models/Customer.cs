using System.ComponentModel.DataAnnotations;

namespace CrudTest.Models
{
    public class Customer
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public int ProvinceId { get; set; }
        public int DistrictId { get; set; }
        public int MunId { get; set; }
        public int WardNo { get; set; }
    }
}

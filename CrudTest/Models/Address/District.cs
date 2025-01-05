using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CrudTest.Models.Address
{
    public class District
    {

        [Key]
        public int DistrictId { get; set; }
        public string DistrictName { get; set; }
        [ForeignKey("Province")]
        public int ProvinceId { get; set; }
        public Province Province { get; set; }
    }
}

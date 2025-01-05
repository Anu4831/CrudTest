using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CrudTest.Models.Address
{
    public class Municipality
    {
        [Key]
        public int MunId { get; set; }
        public string MunName { get; set; }

        [ForeignKey("District")]
        public int DistrictId { get; set; }
        public District District { get; set; }
    }
}

using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel.DataAnnotations;

public class EditViewModel
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Name is required")]
    public string Name { get; set; }

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid Email Address")]
    public string Email { get; set; }

    [Required(ErrorMessage = "Phone number is required")]
    [Phone(ErrorMessage = "Invalid Phone Number")]
    public string Phone { get; set; }

    [Display(Name = "Province")]
    public int ProvinceId { get; set; } // Assuming ProvinceId is an integer

    [Required(ErrorMessage = "Ward number is required")]
    public string WardNo { get; set; }

    // Optionally, you can include navigation properties for dropdown lists
    public List<SelectListItem> Provinces { get; set; }
}

using CrudTest.Models;
using CrudTest.Models.Address;
using CrudTest.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrudTest.Controllers
{
    public class CustomerController : Controller
    {
        private readonly ApplicationDbContext context;

        public CustomerController(ApplicationDbContext context)
        {
            this.context = context;

        }
        public IActionResult Index()
        {
            var customers = context.Customers.ToList();


            return View(customers);
        }


        public IActionResult GetCustomer()
        {
            var customers = (from c in context.Customers
                             join p in context.Provinces on c.ProvinceId equals p.ProvinceId
                             join d in context.Districts on c.DistrictId equals d.DistrictId
                             join m in context.Municipalities on c.MunId equals m.MunId
                             orderby c.Id ascending
                             select new CustomerAllDetailsViewModel()
                             {
                                 Id = c.Id,
                                 Name = c.Name,
                                 Email = c.Email,
                                 Phone = c.Phone,
                                 ProvinceName = p.ProvinceName,
                                 DistrictName = d.DistrictName,
                                 MunName = m.MunName,
                                 wardNo = c.WardNo
                             }).ToList();

            return Json(customers);
        }



        public IActionResult Create()
        {
            var customerAllDetailsViewModel = new CustomerAllDetailsViewModel
            {
               
            };

            return View(customerAllDetailsViewModel);
        }
        public IActionResult GetProvince()
        {
            var data = context.Provinces.ToList();
            return new JsonResult(data);
        
        }
        public IActionResult GetDistrict(int provinceId)
        {
            var data = context.Districts.Where( e=>e.Province.ProvinceId == provinceId).ToList();
            return new JsonResult(data);
        }
        public IActionResult GetMunicipality(int districtId)
        {
            var data = context.Municipalities.Where(e => e.District.DistrictId == districtId).ToList();
            return new JsonResult(data);

        }

        [HttpPost]
        public IActionResult AddCustomer(Customer customer)
        {
            try
            {
                ModelState.Remove("Id");
                if (!ModelState.IsValid)
                {
                    return new JsonResult(customer);
                }
                else
                {
                    if (customer.Id == 0)
                    {
                        context.Customers.Add(customer);
                    }
                    else
                    {
                        context.Customers.Update(customer);
                    }
                    context.SaveChanges();
                    return RedirectToAction("Index");
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public IActionResult Edit(int Id)
        {
            var viewModel = new CustomerAllDetailsViewModel
            {
                Id = Id, // Ensure Id is set in your view model
                         // Populate other properties as needed
            };

            return View(viewModel);
        }
        public IActionResult GetDataById(int Id)
        {
            var customers = (from c in context.Customers
                             join p in context.Provinces on c.ProvinceId equals p.ProvinceId
                             join d in context.Districts on c.DistrictId equals d.DistrictId
                             join m in context.Municipalities on c.MunId equals m.MunId
                             select new Customer()
                             {
                                 Id = c.Id,
                                 Name = c.Name,
                                 Email = c.Email,
                                 Phone = c.Phone,
                                 ProvinceId = p.ProvinceId,
                                 DistrictId = d.DistrictId,
                                 MunId = m.MunId,
                                 WardNo = c.WardNo
                             }).Where(e => e.Id == Id).FirstOrDefault();
            return new JsonResult(customers);
        }

        [HttpPost]
        public IActionResult DeleteCustomer(int id)
        {
            var customer = context.Customers.Find(id);
            if (customer == null)
            {
                return NotFound();
            }

            context.Customers.Remove(customer);
            context.SaveChanges();

            return Json(new { success = true });
            
        }
    }
}
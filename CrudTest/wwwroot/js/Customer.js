
//$(document).ready(function () {
//    GetCustomerData();
//});
//$('#btnAdd').click(function () {
//    $('#CustomerModal').modal('show');
//    GetProvince();
//});

$('#Province').on('change', function () {
    let provinceId = $(this).val();
    GetDistrict(provinceId);
})
$('#District').on('change', function () {
    let districtId = $(this).val();
    GetMunicipality(districtId);
})


function GetCustomerData() {
    $.ajax({
        url: '/Customer/GetCustomer',
        type: 'get',
        success: function (response) {
            $.each(response, function (i, item) {
                $('#tblCustomer').append(`
                    <tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone}</td>
                    <td>${item.provinceName}</td>
                    <td>${item.districtName}</td>
                    <td>${item.munName}</td>
                    <td>${item.wardNo}</td>
                    <td>
                        <a class="btn btn-sm btn-primary" onclick="GotoEdit(${item.id})" asp-action="Edit" asp-route-id="@customer.Id">Edit</a> |
                        <a class="btn btn-danger btn-sm" onclick="deleteCustomer(${item.id})" asp-action="Delete" asp-route-id="@customer.Id"
                           onclick="return confirm('Are you sure you want to delete this customer?')">Delete</a>
                     </td>
                    </tr>`);
            });
        }
    })
}
function GetProvince(provinceId) {
    $.ajax({
        url: '/Customer/GetProvince',
        type: 'get',
        success: function (response) {

            $('#Province').html(''); // Clear existing options
            $('#Province').append('<option value="">--Select Province--</option>'); // Add default option
            if (provinceId == null || provinceId == '') {
                $.each(response, function (i, item) {
                    $('#Province').append('<option value=' + item.provinceId + '>' + item.provinceName + '</option>'); // Append options
                });
            }
            else {
                $.each(response, function (i, item) {

                    if (provinceId == item.provinceId) {
                        $('#Province').append('<option value="' + item.provinceId + '" selected="selected">' + item.provinceName + '</option>'); // Append options
                    }
                    else {
                        $('#Province').append('<option value="' + item.provinceId + '">' + item.provinceName + '</option>'); // Append options
                    }
                });
            }
        }
    });
}

function GetDistrict(provinceId,districtId) {
    $.ajax({
        url: '/Customer/GetDistrict?provinceId=' + provinceId,
        type: 'get',
        success: function (response) {
            $('#District').html(''); // Clear existing options
            $('#District').append('<option value="">--Select District--</option>'); // Add default option
            if (districtId == null || districtId == '') {
                $.each(response, function (i, item) {
                    $('#District').append('<option value=' + item.districtId + '>' + item.districtName + '</option>'); // Append options
                });
            }
            else {
                $.each(response, function (i, item) {
                    if (districtId == item.districtId) {
                        $('#District').append('<option value="' + item.districtId + '" selected="selected">' + item.districtName + '</option>');
                    }
                    else {
                        $('#District').append('<option value=' + item.districtId + '>' + item.districtName + '</option>'); // Append options
                    }
                });
            }
        }
    });
}


function GetMunicipality(districtId,munId) {
    $.ajax({
        url: '/Customer/GetMunicipality?districtId=' + districtId,
        type: 'get',
        success: function (response) {
            $('#Municipality').html(''); // Clear existing options
            $('#Municipality').append('<option value="">--Select Municipality--</option>'); // Add default option
            if (munId == null || munId == '') {
                $.each(response, function (i, item) {
                    $('#Municipality').append('<option value=' + item.munId + '>' + item.munName + '</option>'); // Append options
                });
            }
            else {
                $.each(response, function (i, item) {
                    if (munId == item.munId) {
                        $('#Municipality').append('<option value="' + item.munId + '" selected="selected">' + item.munName + '</option>');
                    }
                    else {
                        $('#Municipality').append('<option value=' + item.munId + '>' + item.munName + '</option>'); // Append options
                    }
                });
            }
        }
    });
}



function GetFormData() {
    debugger
    var customerData = {};
    customerData.Id = $('#Id').val();
    customerData.Name = $('#Name').val();
    customerData.Phone = $('#Phone').val();
    customerData.Email = $('#Email').val();
    customerData.ProvinceId = $('#Province').val();
    customerData.DistrictId = $('#District').val();
    customerData.MunId = $('#Municipality').val();
    customerData.WardNo = $('#wardNo').val();
    return customerData;
}
function SaveCustomerData() {
    var data = GetFormData();
    $.ajax({
        url: '/Customer/AddCustomer',
        type: 'post',
        data: data,
        success: function(response) {
            debugger
            GetCustomerData();
            alert('Data Saved');
            window.location.href = '/Customer/Index';
        },
        error: function () {
            alert('Data cannot be saved');
        }
    })
}

function GotoEdit(Id) {
    window.location.href = '/Customer/Edit/' + Id;
}

function EditCustomerData(Id) {
    $.ajax({
        url: '/Customer/GetDataById?id=' + Id,
        type: 'get',
        success: function (response) {
            if (response) {
                $('#Id').val(response.id);
                $('#Name').val(response.name);
                $('#Email').val(response.email);
                $('#Phone').val(response.phone);
                GetProvince(response.provinceId);
                GetDistrict(response.provinceId, response.districtId);
                GetMunicipality(response.districtId, response.munId);
                $('#wardNo').val(response.wardNo);
                /*window.location.href = '/Customer/Edit/' + Id;*/
            } else {
                alert('Data not found!');
            }
        },
        error: function () {
            alert('Data not retrieved!');
        }
    });
}


function deleteCustomer(id) {
    if (confirm('Are you sure you want to delete this customer?')) {
        $.ajax({
            url: '/Customer/DeleteCustomer',
            type: 'POST',
            data: { id: id },
            success: function (response) {
                if (response.success) {
                    alert('Customer deleted successfully');
                    window.location.href = '/Customer/Index';
                    
                } else {
                    alert('Failed to delete customer');
                }
            },
            error: function () {
                alert('Error deleting customer');
            }
        });
    }
}
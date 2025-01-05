$(document).ready(function () {
    GetProvince();

    var provinceId = '@Model.Province';
    var districtId = '@Model.District';
    var municipalityId = '@Model.Municipality';

    if (provinceId) {
        $('#District').prop('disabled', false);
        $('#District').empty().append('<option value="">--Select District--</option>');
        $.ajax({
            url: '/Customer/District?id=' + provinceId,
            success: function (result) {
                $.each(result, function (i, item) {
                    $('#District').append('<option value="' + item.districtId + '">' + item.districtName + '</option>');
                });
                $('#District').val(districtId);
                if (!$('#District').val()) {
                    $('#District').val('');
                }
            }
        });
    }

    if (districtId) {
        $('#Municipality').prop('disabled', false);
        $('#Municipality').empty().append('<option value="">--Select Municipality--</option>');
        $.ajax({
            url: '/Customer/Municipality?id=' + districtId,
            success: function (result) {
                $.each(result, function (i, item) {
                    $('#Municipality').append('<option value="' + item.munId + '">' + item.munName + '</option>');
                });
                $('#Municipality').val(munId);
                if (!$('#Municipality').val()) {
                    $('#Municipality').val('');
                }
            }
        });
    }

    $('#Province').change(function () {
        var provinceId = $(this).val();
        if (provinceId) {
            $('#District').prop('disabled', false);
            $('#District').empty().append('<option value="">--Select District--</option>');
            $.ajax({
                url: '/Customer/District?id=' + provinceId,
                success: function (result) {
                    $.each(result, function (i, item) {
                        $('#District').append('<option value="' + item.districtId + '">' + item.districtName + '</option>');
                    });
                }
            });
        } else {
            $('#District').prop('disabled', true).empty().append('<option value="">--Select District--</option>');
            $('#Municipality').prop('disabled', true).empty().append('<option value="">--Select Municipality--</option>');
        }
    });

    $('#District').change(function () {
        var districtId = $(this).val();
        if (districtId) {
            $('#Municipality').prop('disabled', false);
            $('#Municipality').empty().append('<option value="">--Select Municipality--</option>');
            $.ajax({
                url: '/Customer/Municipality?id=' + districtId,
                success: function (result) {
                    $.each(result, function (i, item) {
                        $('#Municipality').append('<option value="' + item.munId + '">' + item.munName + '</option>');
                    });
                }
            });
        } else {
            $('#Municipality').prop('disabled', true).empty().append('<option value="">--Select Municipality--</option>');
        }
    });
});

function GetProvince() {
    $.ajax({
        url: '/Customer/Province',
        success: function (result) {
            var provinceSelect = $('#Province');
            provinceSelect.empty().append('<option value="">--Select Province--</option>');
            $.each(result, function (i, item) {
                provinceSelect.append('<option value="' + item.provinceId + '">' + item.provinceName + '</option>');
            });
            provinceSelect.val('@Model.Province');
            if (!provinceSelect.val()) {
                provinceSelect.val(''); // 
            }
        }
    });
}

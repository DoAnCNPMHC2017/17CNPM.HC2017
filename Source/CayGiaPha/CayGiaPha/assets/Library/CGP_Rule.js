$(document).ready(function () {
    function ReloadWindow() {
        $.ajax({
            async: false,
            dataType: 'json',
            url: '/CGP/GetBP',
            success: function (result) {
                $('#ddlBP').data("kendoDropDownList").setDataSource(result);
            },
            error: function () {
                alert("Gặp Lỗi trong quá trình lấy dữ liệu 11");
            }
        });

        $.ajax({
            async: false,
            dataType: 'json',
            url: '/CGP/GetJobs',
            success: function (result) {
                $('#ddlJob').data("kendoDropDownList").setDataSource(result);
            },
            error: function () {
                alert("Gặp Lỗi trong quá trình lấy dữ liệu 23");
            }
        });

        $.ajax({
            async: false,
            dataType: 'json',
            url: '/CGP/GetCoD',
            success: function (result) {
                $('#ddlCod').data("kendoDropDownList").setDataSource(result);
            },
            error: function () {
                alert("Gặp Lỗi trong quá trình lấy dữ liệu 35");
            }
        }); 

        $.ajax({
            async: false,
            dataType: 'json',
            url: '/CGP/GetBrP',
            success: function (result) {
                $('#ddlBrP').data("kendoDropDownList").setDataSource(result);
            },
            error: function () {
                alert("Gặp Lỗi trong quá trình lấy dữ liệu 47");
            }
        });
    }

    $("#dialogBirthPlace").kendoDialog({
        width: 600,
        height: 255,
        title: "Thêm quê quán",
        content: divContentbirthplace,
        visible: false
    }).data("kendoDialog");

    var divContentbirthplace = $('#dialogBirthPlace').html();

    $("#dialogJob").kendoDialog({
        width: 600,
        height: 255,
        title: "Thêm nghề nghiệp",
        content: divContentjob,
        visible: false
    }).data("kendoDialog");

    var divContentjob = $('#dialogJob').html();

    var divContentUjob = $('#dialogUjob').html();
    $("#dialogUjob").kendoDialog({
        width: 600,
        height: 255,
        title: "Cập nhật nghề nghiệp",
        content: divContentUjob,
        visible: false
    }).data("kendoDialog");


    var divContentUBP = $('#dialogUBirthPlace').html();
    $("#dialogUBirthPlace").kendoDialog({
        width: 600,
        height: 255,
        title: "Cập nhật quê quán",
        content: divContentUBP,
        visible: false
    }).data("kendoDialog");

    $("#btnShowAddBirthPlace").click(function () {

        var dialog = $("#dialogBirthPlace").data("kendoDialog");
        dialog.open();
    });

    $("#btnShowUpdateBirthPlace").click(function () {

        var dialog = $("#dialogUBirthPlace").data("kendoDialog");
        dialog.open();
    });


    $("#btnShowAddJob").click(function () {

        var dialog = $("#dialogJob").data("kendoDialog");
        dialog.open();
    });

    $("#btnShowUpdateJob").click(function () {

        var dialog = $("#dialogUjob").data("kendoDialog");
        dialog.open();
    });
    $("#btnShowUpdateBP").click(function () {

        var dialog = $("#dialogUjob").data("kendoDialog");
        dialog.open();
    });
    $("#btnAddJob").click(function () {

        $.ajax({
            async: false,
            type: "post",
            dataType: 'json',
            url: '/CGP/AddJob',
            data: { jobname: $('#txtjob').val() },
            success: function (result) {
                alert("Thành công");
                LoadData($('#TreeID').val());
                LoadDataTree();
                $("#txtjob").val("");
                ReloadWindow();
            },
            error: function () {
                alert("Thành thụ");
            }
        });
    });

    $("#btnAddBirthPlace").click(function () {
        $.ajax({
            async: false,
            type: "post",
            dataType: 'json',
            url: '/CGP/AddBirthPlace',
            data: { bpname: $('#txtbirthplace').val() },
            success: function (result) {
                alert("Thành công");
                LoadData($('#TreeID').val());
                LoadDataTree();
                $("#txtbirthplace").val("");
                ReloadWindow();
            },
            error: function () {
                alert("Thành thụ");
            }
        });
    });
    $("#btnUJob").click(function () {
        var jName = $("#txtuJob").val();
        var jID = $("#ddlJob").data("kendoDropDownList").value();
        $.ajax({
            async: false,
            type: "post",
            dataType: 'json',
            url: '/CGP/UpdateJob',
            data: { jID: jID, jName: jName },
            success: function (result) {
                alert("Thành công");
                LoadData($('#TreeID').val());
                LoadDataTree();
                ReloadWindow();
            },
            error: function () {
                alert("Thành thụ");
            }
        });
    });

    $("#ddlJob").kendoDropDownList({
        dataTextField: 'JobName',
        dataValueField: 'JobID',
        dataSource: {
            transport: {
                read: {
                    //dataType: "jsonp",
                    url: "/CGP/GetJobs",
                }
            }
        },
        autoClose: true,
        change: function (e) {
            var t = $("#ddlJob").data("kendoDropDownList").text();
            $("#txtuJob").val(t);
        }
        ///, optionLabel: "Chọn nghề nghiệp ..."
    });

    $("#btnUJob").click(function () {
        var jName = $("#txtuJob").val();
        var jID = $("#ddlJob").data("kendoDropDownList").value();
        $.ajax({
            async: false,
            type: "post",
            dataType: 'json',
            url: '/CGP/UpdateJob',
            data: { jID: jID, jName: jName },
            success: function (result) {
                alert("Thành công");
                LoadData($('#TreeID').val());
                LoadDataTree();
                ReloadWindow();
            },
            error: function () {
                alert("Thành thụ");
            }
        });
    });

    $("#ddlBP").kendoDropDownList({
        dataTextField: 'BirthPlaceName',
        dataValueField: 'BirthPlaceID',
        dataSource: {
            transport: {
                read: {
                    //dataType: "jsonp",
                    url: "/CGP/GetBP",
                }
            }
        },
        autoClose: true,
        change: function (e) {
            var t = $("#ddlBP").data("kendoDropDownList").text();
            $("#txtuBP").val(t);
        }
        ///, optionLabel: "Chọn nghề nghiệp ..."
    });

    $("#btnUBP").click(function () {
        var jName = $("#txtuBP").val();
        var jID = $("#ddlBP").data("kendoDropDownList").value();
        $.ajax({
            async: false,
            type: "post",
            dataType: 'json',
            url: '/CGP/UpdateBP',
            data: { jID: jID, jName: jName },
            success: function (result) {
                alert("Thành công");
                LoadData($('#TreeID').val());
                LoadDataTree();
                ReloadWindow();
            },
            error: function () {
                alert("Thành thụ");
            }
        });
    });

    $("#dialogCod").kendoDialog({
        width: 500,
        height: 255,
        title: "Thêm nguyên nhân mất",
        content: divContentCod,
        visible: false
    }).data("kendoDialog");

    var divContentCod = $('#dialogCod').html();

    $("#btnShowAddCoD").click(function () {

        var dialog = $("#dialogCod").data("kendoDialog");
        dialog.open();
    });

    var divContentUCod = $('#dialogUCod').html();
    $("#dialogUCod").kendoDialog({
        width: 600,
        height: 255,
        title: "Cập nhật nguyên nhân mất",
        content: divContentUCod,
        visible: false
    }).data("kendoDialog");

    $("#btnShowUpdateCoD").click(function () {

        var dialog = $("#dialogUCod").data("kendoDialog");
        dialog.open();
    });

    $("#btnAddCod").click(function () {

        $.ajax({
            async: false,
            type: "post",
            dataType: 'json',
            url: '/CGP/AddCod',
            data: { jName: $('#txtCod').val() },
            success: function (result) {
                alert("Thành công");
                LoadData($('#TreeID').val());
                LoadDataTree();
                $("#txtCod").val("");
                ReloadWindow();
            },
            error: function () {
                alert("Thành thụ");
            }
        });
    });

    $("#btnUCod").click(function () {
        var jName = $("#txtuCod").val();
        var jID = $("#ddlCod").data("kendoDropDownList").value();
        $.ajax({
            async: false,
            type: "post",
            dataType: 'json',
            url: '/CGP/UpdateCod',
            data: { jID: jID, jName: jName },
            success: function (result) {
                alert("Thành công");
                LoadData($('#TreeID').val());
                LoadDataTree();
                ReloadWindow();
            },
            error: function () {
                alert("Thành thụ");
            }
        });
    });

    $("#ddlCod").kendoDropDownList({
        dataTextField: 'CauseOfDeathText',
        dataValueField: 'CauseOfDeathID',
        dataSource: {
            transport: {
                read: {
                    //dataType: "jsonp",
                    url: "/CGP/GetCoD",
                }
            }
        },
        autoClose: true,
        change: function (e) {
            var t = $("#ddlCod").data("kendoDropDownList").text();
            $("#txtuCod").val(t);
        }
        ///, optionLabel: "Chọn nghề nghiệp ..."
    });


    $("#dialogBrP").kendoDialog({
        width: 500,
        height: 255,
        title: "Thêm địa điểm mai táng",
        content: divContentBrP,
        visible: false
    }).data("kendoDialog");

    var divContentBrP = $('#dialogBrP').html();

    $("#btnShowAddBrP").click(function () {

        var dialog = $("#dialogBrP").data("kendoDialog");
        dialog.open();
    });

    var divContentUBrP = $('#dialogUBrP').html();
    $("#dialogUBrP").kendoDialog({
        width: 600,
        height: 255,
        title: "Cập nhật nguyên nhân mất",
        content: divContentUBrP,
        visible: false
    }).data("kendoDialog");

    $("#btnShowUpdateBrP").click(function () {

        var dialog = $("#dialogUBrP").data("kendoDialog");
        dialog.open();
    });

    $("#btnAddBrP").click(function () {

        $.ajax({
            async: false,
            type: "post",
            dataType: 'json',
            url: '/CGP/AddBrP',
            data: { jName: $('#txtBrP').val() },
            success: function (result) {
                alert("Thành công");
                LoadData($('#TreeID').val());
                LoadDataTree();
                $("#txtBrP").val("");
                ReloadWindow();
            },
            error: function () {
                alert("Thành thụ");
            }
        });
    });

    $("#btnUBrP").click(function () {
        var jName = $("#txtuBrP").val();
        var jID = $("#ddlBrP").data("kendoDropDownList").value();
        $.ajax({
            async: false,
            type: "post",
            dataType: 'json',
            url: '/CGP/UpdateBrP',
            data: { jID: jID, jName: jName },
            success: function (result) {
                alert("Thành công");
                LoadData($('#TreeID').val());
                LoadDataTree();
                ReloadWindow();
            },
            error: function () {
                alert("Thành thụ");
            }
        });
    });

    $("#ddlBrP").kendoDropDownList({
        dataTextField: 'BurialPlaceName',
        dataValueField: 'BurialPlaceID',
        dataSource: {
            transport: {
                read: {
                    //dataType: "jsonp",
                    url: "/CGP/GetBrP",
                }
            }
        },
        autoClose: true,
        change: function (e) {
            var t = $("#ddlBrP").data("kendoDropDownList").text();
            $("#txtuBrP").val(t);
        }
        ///, optionLabel: "Chọn nghề nghiệp ..."
    });
    var divContentUA = $('#dialogUA').html();
    $("#dialogUA").kendoDialog({
        width: 600,
        height: 255,
        title: "Ghi nhận thành tích",
        content: divContentUA,
        visible: false
    }).data("kendoDialog");

    $("#btnShowUA").click(function () {
        var dialog = $("#dialogUA").data("kendoDialog");
        dialog.open();
    });

    $("#ddlM").kendoDropDownList({
        dataTextField: 'FullName',
        dataValueField: 'Id',
        dataSource: {
            transport: {
                read: {
                    //dataType: "jsonp",
                    url: "/CGP/GetMember",
                }
            }
        },
        autoClose: true
    });

    $("#ddlA").kendoDropDownList({
        dataTextField: 'AchievementName',
        dataValueField: 'IDAchievement',
        dataSource: {
            transport: {
                read: {
                    //dataType: "jsonp",
                    url: "/CGP/GetAchievement",
                }
            }
        },
        autoClose: true
    });

    $("#dateA").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        dateInput: true
    });

    $("#btnUA").click(function () {
        var fid = $('#ddlM').val();
        var fach = $('#ddlA').val();
        var fdate = $('#dateA').val();

        $.ajax({
            async: false,
            type: "post",
            dataType: 'json',
            url: '/CGP/UpdateMemberAchievement',
            data: { fid: fid, fach: fach, fdate: fdate },
            success: function (result) {
                alert("Thành công");
                LoadData($('#TreeID').val());
                LoadDataTree();
                ReloadWindow();
            },
            error: function () {
                alert(result);
            }
        });
    });

    var divContentUD = $('#dialogUD').html();
    $("#dialogUD").kendoDialog({
        width: 600,
        height: 255,
        title: "Ghi nhận kết thúc",
        content: divContentUD,
        visible: false
    }).data("kendoDialog");

    $("#btnShowUD").click(function () {
        var dialog = $("#dialogUD").data("kendoDialog");
        //ReloadWindow();
        dialog.open();
    });

    $("#ddlM1").kendoDropDownList({
        dataTextField: 'FullName',
        dataValueField: 'Id',
        dataSource: {
            transport: {
                read: {
                    //dataType: "jsonp",
                    url: "/CGP/GetMember",
                }
            }
        },
        filter: "contains",
        change: LoadInfo,
        autoClose: true
        , optionLabel: "Chọn thành viên ..."
    });

    $("#ddlCD").kendoDropDownList({
        dataTextField: 'CauseOfDeathText',
        dataValueField: 'CauseOfDeathID',
        dataSource: {
            transport: {
                read: {
                    //dataType: "jsonp",
                    url: "/CGP/GetCod",
                    cache: false,
                }
            }
        },
        autoClose: true

        , optionLabel: "Chọn nguyên nhân ..."
    });

    $("#ddlBrP1").kendoDropDownList({
        dataTextField: 'BurialPlaceName',
        dataValueField: 'BurialPlaceID',
        dataSource: {
            transport: {
                read: {
                    //dataType: "jsonp",
                    url: "/CGP/GetBurialPlace",
                }
            }
        },
        autoClose: true
        , optionLabel: "Chọn địa điểm mai táng ..."
    });

    $("#dateD").kendoDateTimePicker({
        format: "dd/MM/yyyy HH:mm:tt",
        //parseFormats: ["MMMM yyyy", "HH:mm:tt"],
        value: new Date(),
        dateInput: true
    });

    $("#btnUD").click(function () {
        var fid = $('#ddlM1').val();
        var fbp = $('#ddlBrP1').val();
        var fdod = $('#dateD').val();
        var fcod = $('#ddlCD').val();
        if (fid == "" || fbp == "" || fdod == "" || fcod == "") {
            alert("Chưa chọn đầy đủ thông tin!!!");
            return
        }

        $.ajax({
            async: false,
            type: "post",
            dataType: 'json',
            url: '/CGP/UpdateMemberEnd',
            data: { fid: fid, fdod: fdod, fbp: fbp, fcod: fcod },
            //data: { fid: fid, fbp: fbp, fcod: fcod },
            success: function (result) {
                alert("Thành công");
                LoadData($('#TreeID').val());
                LoadDataTree();
                //ReloadWindow();
            },
            error: function () {
                alert("Thông tin chưa hợp lệ");
            }
        });

    });

    function LoadInfo() {
        var fid = $('#ddlM1').val();
        $.ajax({
            async: false,
            dataType: 'json',
            url: '/CGP/InfomationMember',
            data: { ID: fid },
            success: function (result) {
                Res = result;
                console.log(Res);

                if (Res[0].CauseOfDeath != null || Res[0].DateOfDeath != null || Res[0].BurialPlaceId != null) {

                    $('#ddlCD').data('kendoDropDownList').value(Res[0].CauseOfDeath);
                    $('#dateD').data('kendoDateTimePicker').value(Res[0].DateOfDeath);
                    $('#ddlBrP1').data('kendoDropDownList').value(Res[0].BurialPlaceId);
                }
                else {

                    $('#ddlCD').data('kendoDropDownList').value(0);
                    $('#dateD').data('kendoDateTimePicker').value(0);
                    $('#ddlBrP1').data('kendoDropDownList').value(0);
                }
            },
            error: function () {
            }
        });
    }

});
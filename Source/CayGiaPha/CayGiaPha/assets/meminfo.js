var Items = [];
var Res = [];
var resultOldID = {};
var couple = {};
$(document).ready(function () {
    CreateControl();
    LoadData($('#TreeID').val());
    LoadInfomationMember($('#MemID').val())
    formatdatetime();
    $('#chkisDeath').change(function (event) {
        // this will contain a reference to the checkbox   
        if (this.checked) {
            event.preventDefault();
            document.getElementById("test").disabled = false;
             /*$("#DateOfDeath").prop('disabled', false);
             $("#BurialPlace").prop('disabled', false);
             $("#CauseOfDeath").prop('disabled', false);*/
            alert("111111111111111");
        } else {
            // the checkbox is now no longer checked
            alert("22222222222222");
        }
    });

});

function CreateControl() {
   
    $("#Relasionship").kendoDropDownList({
        serverFiltering: false,
        dataTextField: 'Name',
        dataValueField: 'ID',
        dataSource: [{ ID: 0, Name: 'Con' }, { ID: 1, Name: 'Vợ/Chồng' }],
        showSelectAll: true,
        autoClose: false,
        change: function (e) {
        }
    });
    //noi sinh
    $("#BirthPlace").kendoDropDownList({
        //serverFiltering: false,
        dataTextField: 'BirthPlaceName',
        dataValueField: 'BirthPlaceID',
        dataSource: [],
        //showSelectAll: true,
        autoClose: true,
        change: function (e) {
        }
        , optionLabel: "Chọn quê quán ..."
    });
    //giới tính
    $("#Sex").kendoDropDownList({
        //serverFiltering: false,
        dataTextField: 'Name',
        dataValueField: 'ID',
        dataSource: [
                { ID: 'F', Name: 'Nữ' },
                { ID: 'M', Name: 'Nam' },
        ],
        showSelectAll: true,
        autoClose: true
    });
    //nghề nghiệp
    $("#Job").kendoDropDownList({
        //serverFiltering: false,
        dataTextField: 'JobName',
        dataValueField: 'JobID',
        dataSource: [],
        //showSelectAll: true,
        autoClose: true
        , optionLabel: "Chọn nghề nghiệp ..."
    });
    //
    $('#OldID').kendoDropDownList({
        //serverFiltering: false,
        dataTextField: 'Name',
        dataValueField: 'ID',
        dataSource: [],
        //showSelectAll: true,
        autoClose: true
        , optionLabel: "Chọn Thành Viên Cũ ..."
    });
    $("#CreateDate").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        dateInput: true
    });
    $("#BirthDate").kendoDateTimePicker({
        format: "dd/MM/yyyy HH:mm:tt",
        parseFormats: ["MMMM yyyy", "HH:mm:tt"],
        value: new Date(),
        dateInput: true
    });
    $("#DateOfDeath").kendoDateTimePicker({
        //start: "year",
        //depth: "year",
        //format: "dd/MM/yyyy",
        //value: new Date(),
        //dateInput: true,
        //footer: "Hôm nay - #: kendo.toString(data, 'dd/MM/yyyy') #"
        value: new Date(),
        dateInput: true
    });
    //
    $("#CauseOfDeath").kendoDropDownList({
        //serverFiltering: false,
        dataTextField: 'CauseOfDeathText',
        dataValueField: 'CauseOfDeathID',
        dataSource: [],
        //showSelectAll: true,
        autoClose: true
    });
    $("#BurialPlace").kendoDropDownList({
        //serverFiltering: false,
        dataTextField: 'BurialPlaceName',
        dataValueField: 'BurialPlaceID',
        dataSource: [],
        //showSelectAll: true,
        autoClose: true
    });

}
function LoadData(ID) {
    $.ajax({
        async: false,
        dataType: 'json',
        url: '/CGP/GetControl',
        data: { ID: ID },
        success: function (result) {
            resultOldID = result.OldID;
            //console.log(result);
            //$('#Relasionship').data('kendoDropDownList').setDataSource([{ ID: 0, Name: 'Con' },{ ID: 1, Name: 'Vợ/Chồng' }]);
            $('#BirthPlace').data("kendoDropDownList").setDataSource(result.Bl);
            $('#Job').data("kendoDropDownList").setDataSource(result.Jo);
           // $('#CauseOfDeath').data("kendoDropDownList").setDataSource(result.Cod);
            //$('#BurialPlace').data("kendoDropDownList").setDataSource(result.Bp);
            //$('#OldID').data("kendoDropDownList").setDataSource(result.OldID);
            couple = result.couple;
            /*if (result.OldID.length == 0) {
                $('#trdOldID').hide();
                $('#trdRelationship').hide();
            }
            else {
                $('#trdOldID').show();
                $('#trdRelationship').show();
            }*/
        },
        error: function () {
            alert("Gặp Lỗi trong quá trình lấy dữ liệu");
        }
    });
}
function LoadInfomationMember(ID) {
    $.ajax({
        async: false,
        dataType: 'json',
        url: '/CGP/InfomationMember',
        data: { TreeID: $('#TreeID').val(), ID: ID },
        success: function (result) {
            Res = result;
            console.log(Res);
            /*if (Res[0].Memberold == "" || Res[0].Memberold == null) {
                $('#trdRelationship').hide();
                $('#trdOldID').hide();
            }
            else {
                $('#trdRelationship').show();
                $('#trdOldID').show();
            }*/
            //$('#OldID').data('kendoDropDownList').value(Res[0].Memberold);
            $('#FullName').val(Res[0].FullName);
            $('#Address').val(Res[0].AddressID);
            $('#Sex').data('kendoDropDownList').value(Res[0].Sex);
            $('#Job').data('kendoDropDownList').value(Res[0].Job);
            //
            //$('#Relasionship').data('kendoDropDownList').value(Res[0].TypeRelationship);
            $('#BirthDate').data('kendoDateTimePicker').value(Res[0].Birthday);
            $('#BirthPlace').data('kendoDropDownList').value(Res[0].BirthPlaceId);
            //
            formatdatetime();
            //if (Res[0].CauseOfDeath != null || Res[0].DateOfDeath != null || Res[0].BurialPlaceId != null) {
            //    $('#tbCauseOfDeath').show();
            //    $('#tbDateOfDeath').show();
            //    $('#tbBurialPlace').show();
            //    $('#CauseOfDeath').data('kendoDropDownList').value(Res[0].CauseOfDeath);
            //    $('#DateOfDeath').data('kendoDateTimePicker').value(Res[0].DateOfDeath);
            //    $('#BurialPlace').data('kendoDropDownList').value(Res[0].BurialPlaceId);
            //}
            //else {
            //    $('#tbCauseOfDeath').hide();
            //    $('#tbDateOfDeath').hide();
            //    $('#tbBurialPlace').hide();
            //    $('#CauseOfDeath').data('kendoDropDownList').value(Res[0].CauseOfDeath);
            //    $('#DateOfDeath').data('kendoDateTimePicker').value(Res[0].DateOfDeath);
            //    $('#BurialPlace').data('kendoDropDownList').value(Res[0].BurialPlaceId);
            //}
            
        },
        error: function () {
        }
    });
}

function UpdateMemberInfo() {
    var fid = $('#MemID').val();
    var fname = $('#FullName').val();
    var faddress = $('#Address').val();
    var fsex = $('#Sex').val();
    var fjob = $('#Job').val();
    var fbirthday = $('#BirthDate').val();
    var fbirthplace = $('#BirthPlace').val();
   
    $.ajax({
        async: false,
        type: "post",
        dataType: 'json',
        url: '/CGP/UpdateMemberInfo',
        data: { fid: fid, fname: fname, fjob: fjob, faddress: faddress, fsex: fsex, fbirthday: fbirthday, fbirthplace: fbirthplace},
        success: function (result) {
            alert(result);
            LoadData($('#TreeID').val());
            formatdatetime();
        },
        error: function () {
            alert(result);
        }
    });
}

function formatdatetime() {
    str = $('#BirthDate').val();
    $('#BirthDate').val("");
    str = str.replace(":PM", "");
    str = str.replace(":AM", "");
    $('#BirthDate').val(str);
}
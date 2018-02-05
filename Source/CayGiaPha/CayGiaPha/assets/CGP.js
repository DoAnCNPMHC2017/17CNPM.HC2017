$(document).ready(function () {
    CreateControl();
    LoadData();
    ControlCreateTree();
});

function CreateControl() {
    $("#Relasionship").kendoDropDownList({
        serverFiltering: false,
        dataTextField: 'Name',
        dataValueField: 'ID',
        dataSource: [
                { ID: 0, Name: 'Con' },
                { ID: 1, Name: 'Vợ/Chồng' },
        ],
        showSelectAll: true,
        autoClose: false,
        change: function (e) {
            ChangeType();
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
        ,optionLabel: "Chọn quê quán ..."
    });
    //giới tính
    $("#Sex").kendoDropDownList({
        //serverFiltering: false,
        dataTextField: 'Name',
        dataValueField: 'ID',
        dataSource: [
                { ID: 0, Name: 'Nữ' },
                { ID: 1, Name: 'Nam' },
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
    $("#BirthDate").kendoDateTimePicker({
        value: new Date(),
        dateInput: true
    });
    $("#CreateDate").kendoDatePicker({
        //start: "year",
        //depth: "year",
        format: "dd/MM/yyyy",
        value: new Date(),
        dateInput: true,
        footer: "Hôm nay - #: kendo.toString(data, 'dd/MM/yyyy') #"
    });
    
    //$('#GridListDetailHDDT').kendoGrid({
    //    //toolbar: ["excel"],
    //    excel: {
    //        allPages: true,
    //        fileName: "DetailHDDT.xlsx"
    //    },
    //    resizable: true,
    //    selectable: true,
    //    scrollable: true,
    //    height: 500,
    //    pageable: {
    //        pageSizes: true,
    //        refresh: true,
    //        buttonCount: 5,
    //        pageSize: 100,
    //        pageSizes: [100, 250, 500, 1000],
    //        messages: {
    //            itemsPerPage: "dòng / trang",
    //            display: "Hiển thị {0} - {1} / {2}",
    //            empty: "Không tìm thấy dữ liệu"
    //        }
    //    },
    //    filterable: {
    //        extra: false,
    //        messages: { and: "và", or: "hoặc", filter: "Lọc", clear: "Hủy lọc", info: "" },
    //        operators: {
    //            string: { eq: "Bằng", neq: "Khác", startswith: "Bắt đầu từ", contains: "Chứa", doesnotcontain: "Không chứa", endswith: "Kết thúc bằng" }
    //            , number: { eq: "=", neq: "!=", gte: ">=", gt: ">", lte: "<=", lt: "<" }
    //            , date: { neq: "!=", gte: ">=", gt: ">", lte: "<=", lt: "<" }
    //        }
    //    },
    //});
}
function LoadData()
{
    $.ajax({
        dataType: 'json',
        url: '/CGP/GetControl',
        //data: { ID: ID },
        success: function (result) {
            console.log(result);
            $('#BirthPlace').data("kendoDropDownList").setDataSource(result.Bl);
            $('#Job').data("kendoDropDownList").setDataSource(result.Jo);
        },
        error: function () {
        }
    });
}
function ControlCreateTree()
{
    $('#GridTree').kendoGrid({
        //toolbar: ["excel"],
        //excel: {
        //    allPages: true,
        //    fileName: "ListStreet.xlsx"
        //},
        resizable: true,
        selectable: true,
        scrollable: true,
        height: 500,
        pageable: {
            pageSizes: true,
            refresh: true,
            buttonCount: 5,
            pageSize: 100,
            pageSizes: [100, 250, 500, 1000],
            messages: {
                itemsPerPage: "dòng / trang",
                display: "Hiển thị {0} - {1} / {2}",
                empty: "Không tìm thấy dữ liệu"
            }
        },
        filterable: {
            extra: false,
            messages: { and: "và", or: "hoặc", filter: "Lọc", clear: "Hủy lọc", info: "" },
            operators: {
                string: { eq: "Bằng", neq: "Khác", startswith: "Bắt đầu từ", contains: "Chứa", doesnotcontain: "Không chứa", endswith: "Kết thúc bằng" }
                , number: { eq: "=", neq: "!=", gte: ">=", gt: ">", lte: "<=", lt: "<" }
                , date: { neq: "!=", gte: ">=", gt: ">", lte: "<=", lt: "<" }
            }
        },
    });
}
$(document).ready(function () {
    CreateControl();
});

function CreateControl() {
    $("#Relasionship").kendoDropDownList({
        serverFiltering: false,
        dataTextField: 'Name',
        dataValueField: 'ID',
        dataSource: [
                { ID: 0, Name: 'Con' },
                { ID: 1, Name: 'Chồng' },
                { ID: 2, Name: 'Vợ' }
        ],
        showSelectAll: true,
        autoClose: false,
        change: function (e) {
            ChangeType();
        }
        //optionLabel: "Chọn Loại gói..."
    });
    //$("#Relasionship").kendoDropDownList({
    //    filter: "startswith",
    //    dataTextField: "ProductName",
    //    dataValueField: "ProductID",
    //    dataSource: {
    //        type: "odata",
    //        serverFiltering: true,
    //        transport: {
    //            read: {
    //                url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
    //            }
    //        }
    //    }
    //});
    $("#BirthDate").kendoDateTimePicker({
        value: new Date(),
        dateInput: true
    });
    $("#CreateDate").kendoDatePicker({
        start: "year",
        depth: "year",
        format: "dd/MM/yyyy",
        value: new Date(),
        dateInput: true,
        footer: "Hôm nay - #: kendo.toString(data, 'dd/MM/yyyy') #"
    });
    //$('#GridListHDDT').kendoGrid({
    //    //toolbar: ["excel"],
    //    //excel: {
    //    //    allPages: true,
    //    //    fileName: "ListStreet.xlsx"
    //    //},
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
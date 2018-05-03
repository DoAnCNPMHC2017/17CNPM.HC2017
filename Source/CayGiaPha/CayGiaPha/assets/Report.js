$(document).ready(function () {
    CreateGridReport();
    CreateControl();
});
function CreateGridReport() {
    $('#GridReportNumber').kendoGrid({
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
        dataSource: {},
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
    $('#GridReportTT').kendoGrid({
        //toolbar: ["excel"],
        //excel: {
        //    allPages: true,
        //    fileName: "ListStreet.xlsx"
        //},
        resizable: true,
        selectable: true,
        scrollable: true,
        height: 500,
        columns: [
            { field: "", title: "STT" },
            { field: "", title: "Loại Thành tích" },
            { field: "", title: "Số lượng Thành tích" },

        ],
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
        dataSource: {
            schema: {
                model: {
                    id: "Id",
                    fields: {
                        //CateName: { editable: false },
                        //Title: { editable: false },
                        Birthday: { type: "datetime" }, bd: { type: "date" }
                    }
                }
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
function CreateControl() {
    $("#FromDate").kendoDatePicker({
        value: new Date(),
        start: "year",
        format: "yyyy",
        dateInput: true
    });
    $("#ToDate").kendoDatePicker({
        value: new Date(),
        start: "year",
        format: "yyyy",
        dateInput: true
    });
}
function XemBaoCao() {
    var NBD = $("#FromDate").val();
    var NKT = $("#ToDate").val();
    var grid = $('#GridReportNumber').data("kendoGrid");
    var options = grid.options;
    options.columns = setColumns('0');
    $.ajax({
        async: false,
        dataType: 'json',
        url: '/CGP/GetReportMember',
        data: { TreeID: $('#TreeID').val(), Year: NBD, Year1: NKT },
        success: function (result) {
            var dataSource = new kendo.data.DataSource({
                data: result,
                pageSize: 100,
            });
            options.dataSource = dataSource;
        },
        error: function () {
        }
    });
    $('#GridReportNumber').empty().kendoGrid(options);
}
function setColumns(typeID) {
    var columns = null;
    switch (typeID) {
        case '0':
            columns = [
                        { field: "STT", title: "STT", width: 145 },
                        { field: "Nam", title: "Năm", width: 145 },
                        { field: "SlS", title: "Số Lượng Sinh", width: 145 },
                        { field: "SlKH", title: "Số Lượng Kết Hôn", width: 145 },
                        { field: "SlMT", title: "Số Lượng Mất", width: 145 }];
            break;
        case '1':
            columns = [{
                title: "Thành tích các thành viên",
                columns: [
                        { title: "STT", width: 240 },
                        { title: "Loại Thành Tích", width: 240 },
                        { title: "Số Lượng ", width: 240 },
                        { title: "Số Lượng Kết Hôn", width: 240 },
                        { title: "Số Lượng Mất", width: 240 }]
            }
            ];
            break;
    }
    return columns;
}
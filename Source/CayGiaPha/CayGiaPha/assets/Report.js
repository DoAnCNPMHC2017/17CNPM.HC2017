$(document).ready(function () {
    CreateViewReport();
});
function CreateViewReport()
{
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
        columns: [
            { field: "", title: "STT" },
            { field: "", title: "Năm" },
            { field: "", title: "Số Lượng Sinh" },
            { field: "", title: "Số Lượng Kết Hôn" },
            { field: "", title: "Số Lượng Mất" }
        ],
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
        columns:[
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
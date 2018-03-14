var Items = [];
$(document).ready(function () {
    CreateControl();
    LoadData();
    ControlCreateTree();
    createDiagram();
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
        async:false,
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
function visualTemplate(options) {
    var dataviz = kendo.dataviz;
    var g = new dataviz.diagram.Group();
    var dataItem = options.dataItem;

    g.append(new dataviz.diagram.Rectangle({
        width: 380,
        height: 75,
        stroke: {
            width: 0
        },
        fill: {
            gradient: {
                type: "linear",
                stops: [{
                    color: dataItem.colorScheme,
                    offset: 0,
                    opacity: 0.5
                }, {
                    color: dataItem.colorScheme,
                    offset: 1,
                    opacity: 1
                }]
            }
        }
    }));

    g.append(new dataviz.diagram.TextBlock({
        text: dataItem.Name,
        x: 85,
        y: 20,
        fill: "#fff"
    }));

    g.append(new dataviz.diagram.TextBlock({
        text: dataItem.title,
        x: 85,
        y: 40,
        fill: "#fff"
    }));

    g.append(new dataviz.diagram.Image({
        source: "../content/dataviz/diagram/people/" + dataItem.image,
        x: 3,
        y: 3,
        width: 68,
        height: 68
    }));

    return g;
}
function TimVo(Mbold)
{
    for (var i = 0; i < Items.length; i++) {
        if (Items[i].Memberold == Mbold && Items[i].Sex =='F' && Items[i].TypeRelationship == 1) {
            //luu
            var ItemsTemp = Items[i];
            //xóa
            Items.splice(i, 1);
            //tra ve tên
            return '     Vợ: ' + ItemsTemp.FullName;
        }
    }
    return "";
}
function Tree(Mbold)
{
    var Itemnew = [];
    for(var i=0;i<Items.length;i++)
    {
        if(Items[i].Memberold == Mbold && Items[i].Sex =='M')
        {
            //luu
            var ItemsTemp = Items[i];
            //xóa
            Items.splice(i, 1);
            //xu ly
            var Vo=TimVo(ItemsTemp.Memberold);
            var chong = ItemsTemp.FullName;
            if (Vo != "")
            {
                chong = 'Chồng: ' + chong;
            }
            Itemnew.push({
                ID: ItemsTemp.Id,
                Sex: ItemsTemp.Sex,
                Memberold: ItemsTemp.Memberold,
                Name: chong,
                //image: "antonio.jpg",
                title: Vo,
                colorScheme: "#00ff2b",
                items: Tree(ItemsTemp.Id)
            });
            i--;
        }
    }
    return Itemnew;
}
function createDiagram() {
    $.ajax({
        async:false,
        dataType: 'json',
        url: '/CGP/GetMember',
        //data: { ID: ID },
        success: function (result) {
            console.log(result);
            Items = result;
        },
        error: function () {
        }
    });
    var Itemnew = Tree(null);
    console.log(Itemnew);
    $("#diagram").kendoDiagram({
        dataSource: new kendo.data.HierarchicalDataSource({
            data: Itemnew,
            schema: {
                model: {
                    children: "items"
                }
            }
        }),
        layout: {
            type: "layered"
        },
        shapeDefaults: {
            visual: visualTemplate
        },
        connectionDefaults: {
            stroke: {
                color: "#979797",
                width: 2
            }
        }
    });

    var diagram = $("#diagram").getKendoDiagram();
    diagram.bringIntoView(diagram.shapes);
}
//function createDiagram() {
//    $.ajax({
//        async: false,
//        dataType: 'json',
//        url: '/CGP/GetMember',
//        //data: { ID: ID },
//        success: function (result) {
//            console.log(result);
//            Items = result;
//        },
//        error: function () {
//        }
//    });
//    // Tao item
//    //var itemnews = Tree(null);
//    //gan node cha
//    //for (var i = 0 ; i < Items.length ; i++) {
//    //    if(Items[i].Sex == 'M' && Items[i].Memberold== null)
//    //    {
//    //        itemnew.push({
//    //            ID: Items[i].Id,
//    //            Sex: Items[i].Sex,
//    //            Memberold: Items[i].Memberold,
//    //            Name: Items[i].FullName,
//    //            //image: "antonio.jpg",
//    //            title: "",
//    //            colorScheme: "#00ff2b",
//    //            items: []
//    //        });
//    //        Items.splice(i, 1);
//    //        break;
//    //    }
//    //}
//    ////gan node tiep theo
//    //while (Items.length > 0)
//    //{
//    //    //duyet item mới

//    //        for(var i=0;i<Items.length;i++)
//    //        {
//    //            if(itemnew[0].ID == Items[i].Memberold)
//    //            {
//    //                //them vao item
//    //                itemnew[0].items.push(
//    //                    {
//    //                        ID: Items[i].Id,
//    //                        Sex: Items[i].Sex,
//    //                        Memberold: Items[i].Memberold,
//    //                        Name: Items[i].FullName,
//    //                        //image: "antonio.jpg",
//    //                        title: "",
//    //                        colorScheme: "#00ff2b",
//    //                        items: []
//    //                    });
//    //                Items.splice(i, 1);
//    //                i--;
//    //                continue;
//    //            }
//    //            if (itemnew[0].Memberold == Items[i].Memberold)
//    //            {
//    //                itemnew[0].title = Items[i].FullName;
//    //                Items.splice(i, 1);
//    //                i--;
//    //                continue;
//    //            }
//    //        }
//    //}
//    //console.log(Items);
//    //console.log(itemnew);
//    ///
//    //var data = [{
//    //    Name: "Nguyễn Nhất Ngôn",
//    //    //image: "antonio.jpg",
//    //    title: "Đời 1",
//    //    colorScheme: "#00ff2b",
//    //    items: [{
//    //        //image: "elizabeth.jpg",
//    //        Name: "Tô Thị Hồng Nhung",
//    //        title: "Vợ",
//    //        colorScheme: "#00ff2b",
//    //        items: [{
//    //            Name: "Nguyễn An Nhiên",
//    //            //image: "ann.jpg",
//    //            title: "Con Gái",
//    //            colorScheme: "#00ff2b"
//    //        }, {
//    //            Name: "Nguyễn Thiên Vũ",
//    //            //image: "ann.jpg",
//    //            title: "Con Trai",
//    //            colorScheme: "#00ff2b"
//    //        }]
//    //    }]
//    //}];
//    $("#diagram").kendoDiagram({
//        dataSource: new kendo.data.HierarchicalDataSource({
//            data: itemnews,
//            schema: {
//                model: {
//                    children: "items"
//                }
//            }
//        }),
//        layout: {
//            type: "layered"
//        },
//        shapeDefaults: {
//            visual: visualTemplate
//        },
//        connectionDefaults: {
//            stroke: {
//                color: "#979797",
//                width: 2
//            }
//        }
//    });

//    var diagram = $("#diagram").getKendoDiagram();
//    diagram.bringIntoView(diagram.shapes);
//}
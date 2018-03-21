var Items = [];
$(document).ready(function () {
    CreateControl();
    ControlCreateTree();
    LoadData();
    //createDiagram();
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
    $("#BirthDate").kendoDateTimePicker({
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
        dataValueField: 'BurialPlaceId',
        dataSource: [],
        //showSelectAll: true,
        autoClose: true
    });
    
}
function LoadData()
{
    $.ajax({
        async:false,
        dataType: 'json',
        url: '/CGP/GetControl',
        //data: { ID: ID },
        success: function (result) {
            //console.log(result);
            $('#BirthPlace').data("kendoDropDownList").setDataSource(result.Bl);
            $('#Job').data("kendoDropDownList").setDataSource(result.Jo);
            $('#CauseOfDeath').data("kendoDropDownList").setDataSource(result.Cod);
            $('#BurialPlace').data("kendoDropDownList").setDataSource(result.Bp);
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
    var grid = $('#GridTree').data("kendoGrid");
    var options = grid.options;
    options.columns = setColumns('0');
    $.ajax({
        async: false,
        dataType: 'json',
        url: '/CGP/getListMember',
        data: { TreeID: 1 },
        success: function (result) {
            var dataSource = new kendo.data.DataSource({
                data: result
                , schema: {
                    model: {
                        fields: {
                            Birthday: { nullable: false, type: "datetime" }
                        },
                    }
                },
                pageSize: 100,
            });
            options.dataSource = result;
        },
        error: function () {
        }
    });
    $('#GridTree').empty().kendoGrid(options);
}
function LoadInfomationMember(ID)
{
    $.ajax({
        async: false,
        dataType: 'json',
        url: '/CGP/InfomationMember',
        data: { TreeID: 1, ID: ID },
        success: function (result) {
            var Res = result;
            console.log(Res);
            
            $('#FullName').val(Res[0].FullName);
            $('#Address').val(Res[0].AddressID);
            $('#Sex').data('kendoDropDownList').value(Res[0].Sex);
            $('#Job').data('kendoDropDownList').value(Res[0].Job);
            //
            $('#Relasionship').data('kendoDropDownList').value(Res[0].TypeRelationship);
            $('#BirthDate').data('kendoDateTimePicker').value(Res[0].Birthday);
            $('#BirthPlace').data('kendoDropDownList').value(Res[0].BirthPlaceId);
            //
            $('#CauseOfDeath').data('kendoDropDownList').value(Res[0].CauseOfDeath);
            $('#DateOfDeath').data('kendoDateTimePicker').value(Res[0].DateOfDeath);
            $('#BurialPlace').data('kendoDropDownList').value(1);
            //Res[0].BurialPlaceId

            //
            
            
            
        },
        error: function () {
        }
    });
}
function setColumns(typeID) {
    var columns = null;
    switch (typeID) {
        case '0':
            columns = [{
                title: "Họ Tên",
                width: 240,
                template: "<a style='color:blue' onclick='LoadInfomationMember(#=ID#)' href=\"javascript:;\">#=FullName#</a>"
            }, {
                field: "Birthday",
                title: "Ngày Sinh",

            }, {
                //field: "Generation",
                title: "Đời",
                template: "<strong>Đời Thứ #=Generation#</strong>"
            }, {
                field: "Mo",
                title: "Cha/Mẹ",
                width:250,
                template: "#if(data.Fa !=''){#<p>Cha: <strong>#=Fa #</strong></p>#}#" +
                          "#if(data.Mo !=''){#<p>Mẹ: <strong>#=Mo #</strong></p>#}#"
            }];
            break;
    }
    return columns;
}
function FormatName(str)
{
    if (str == "")
        return str;
    var ArrStr = str.split(",");
    var Cha = "<p>Cha: <strong>" + ArrStr[0] + "</strong></p>";
    var Me = "<p>Mẹ: <strong>" + ArrStr[1] + "</strong></p>";
    if (ArrStr[0] == "")
        return Me;
    else if (ArrStr[1] == "")
        return Cha;
    else
        return Cha +Me;
}
/////////////////////START Tao cay\\\\\\\\\\\\\\\\\\\\\\
//function visualTemplate(options) {
//    var dataviz = kendo.dataviz;
//    var g = new dataviz.diagram.Group();
//    var dataItem = options.dataItem;

//    g.append(new dataviz.diagram.Rectangle({
//        width: 380,
//        height: 75,
//        stroke: {
//            width: 0
//        },
//        fill: {
//            gradient: {
//                type: "linear",
//                stops: [{
//                    color: dataItem.colorScheme,
//                    offset: 0,
//                    opacity: 0.5
//                }, {
//                    color: dataItem.colorScheme,
//                    offset: 1,
//                    opacity: 1
//                }]
//            }
//        }
//    }));

//    g.append(new dataviz.diagram.TextBlock({
//        text: dataItem.Name,
//        x: 85,
//        y: 20,
//        fill: "#fff"
//    }));

//    g.append(new dataviz.diagram.TextBlock({
//        text: dataItem.title,
//        x: 85,
//        y: 40,
//        fill: "#fff"
//    }));

//    g.append(new dataviz.diagram.Image({
//        source: "../content/dataviz/diagram/people/" + dataItem.image,
//        x: 3,
//        y: 3,
//        width: 68,
//        height: 68
//    }));

//    return g;
//}
//function TimVoChong(Mbold)
//{
//    for (var i = 0; i < Items.length; i++) {
//        if (Items[i].Memberold == Mbold  && Items[i].TypeRelationship == 1) {
//            //luu
//            var ItemsTemp = Items[i];
//            //xóa
//            Items.splice(i, 1);
//            //tra ve tên     
//            return ItemsTemp.FullName;
//        }
//    }
//    return "";
//}
//function Tree(Mbold)
//{
//    var Itemnew = [];
//    for(var i=0;i<Items.length;i++)
//    {
//        if(Items[i].Memberold == Mbold)
//        {
//            //luu
//            var ItemsTemp = Items[i];
//            //xóa
//            Items.splice(i, 1);
//            //xu ly
//            var BanDoi2='     Vợ: ';
//            var BanDoi1 ='Chồng: '; 
//            if (ItemsTemp.Sex == 'M')//chồng
//            {
//                BanDoi1 +=ItemsTemp.FullName;
//                BanDoi2 +=TimVoChong(ItemsTemp.Id);
//            }
//            else //vợ
//            {
//                BanDoi2 +=ItemsTemp.FullName;
//                BanDoi1 +=TimVoChong(ItemsTemp.Id);
//            }
//            Itemnew.push({
//                ID: ItemsTemp.Id,
//                Sex: ItemsTemp.Sex,
//                Memberold: ItemsTemp.Memberold,
//                Name: BanDoi1,
//                //image: "antonio.jpg",
//                title: BanDoi2,
//                colorScheme: "#00ff2b",
//                items: Tree(ItemsTemp.Id)
//            });
//            i--;
//        }
//    }
//    return Itemnew;
//}
//function createDiagram() {
//    $.ajax({
//        async:false,
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
//    var Itemnew = Tree(null);
//    console.log(Itemnew);
//    $("#diagram").kendoDiagram({
//        dataSource: new kendo.data.HierarchicalDataSource({
//            data: Itemnew,
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
/////////////////////END Tao cay\\\\\\\\\\\\\\\\\\\\\\

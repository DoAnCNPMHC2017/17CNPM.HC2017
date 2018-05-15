var Items = [];
var Res = [];
var resultOldID = {};
var couple = {};
var Tcuu = 0;
$(document).ready(function () {
    CreateControl();
    ControlCreateTree();
    LoadData($('#TreeID').val());
    ChangeAddMember();
    $("#btnShowSearch").click(function () {

        var dialog = $("#dialogSearch").data("kendoDialog");
        dialog.open();
    });
    $("#btnSearch").click(function () {
        var dialog = $("#dialogSearch").data("kendoDialog");
        Tcuu = 1;
        dialog.close();
        LoadDataTree();      
    });
    //
    $('#trdOldID').show();
    $('#trdRelationship').show();
    //
    createDiagram();
});
function ViewReport()
{
    window.location.href = '/CGP/Report?Id=' + $('#TreeID').val();
}
function CreateControl() {
    $("#tabstrip").kendoTabStrip({
        animation: {
            open: {
                effects: "fadeIn"
            }
        }
    });
    $("#menu").kendoMenu();
    $("#Relasionship").kendoDropDownList({
        serverFiltering: false,
        dataTextField: 'Name',
        dataValueField: 'ID',
        dataSource: [{ ID: 0, Name: 'Con' },{ ID: 1, Name: 'Vợ/Chồng' }],
        showSelectAll: true,
        autoClose: false,
        change: function (e) {
        }
    });
    var divContentSearch = $('#dialogSearch').html();
    $("#dialogSearch").kendoDialog({
        width: 600,
        height: 280,
        title: "Tra cứu thành viên",
        content: divContentSearch,
        visible: false
    }).data("kendoDialog");

    $("#FromDates").kendoDatePicker({
        value: new Date(),
        start: "year",
        format: "yyyy",
        dateInput: true
    });
    $("#ToDates").kendoDatePicker({
        value: new Date(),
        start: "year",
        format: "yyyy",
        dateInput: true
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
        , filter: "contains"
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
        , filter: "contains"
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
        ,filter: "contains"

    });
    //$("#CreateDate").kendoDatePicker({
    //    value: new Date(),
    //    format: "dd/MM/yyyy",
    //    dateInput: true
    //});
    $("#CreateDate").kendoDateTimePicker({
        format: "dd/MM/yyyy HH:mm:tt",
        parseFormats: ["MMMM yyyy", "HH:mm:tt"],
        value: new Date(),
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
        format: "dd/MM/yyyy HH:mm:tt",
        parseFormats: ["MMMM yyyy", "HH:mm:tt"],
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
        , filter: "contains"
    });
    $("#BurialPlace").kendoDropDownList({
        //serverFiltering: false,
        dataTextField: 'BurialPlaceName',
        dataValueField: 'BurialPlaceID',
        dataSource: [],
        //showSelectAll: true,
        autoClose: true
        , filter: "contains"
    });
    
}
function LoadData(ID)
{
    var t = ID;
    $.ajax({
        async:false,
        dataType: 'json',
        url: '/CGP/GetControl',
        data: { ID: ID },
        success: function (result) {
            resultOldID = result.OldID;
            //console.log(result);
            //$('#Relasionship').data('kendoDropDownList').setDataSource([{ ID: 0, Name: 'Con' },{ ID: 1, Name: 'Vợ/Chồng' }]);
            $('#BirthPlace').data("kendoDropDownList").setDataSource(result.Bl);
            $('#Job').data("kendoDropDownList").setDataSource(result.Jo);
            $('#CauseOfDeath').data("kendoDropDownList").setDataSource(result.Cod);
            $('#BurialPlace').data("kendoDropDownList").setDataSource(result.Bp);
            $('#OldID').data("kendoDropDownList").setDataSource(result.OldID);
            couple = result.couple;
            if (result.OldID.length == 0) {
                var dropdownlist = $("#OldID").data("kendoDropDownList");
                dropdownlist.enable(false);
                var dropdownlist = $("#Relasionship").data("kendoDropDownList");
                dropdownlist.enable(false);
                $('#Relasionship').data('kendoDropDownList').value("");
            }
            else {
                var dropdownlist = $("#OldID").data("kendoDropDownList");
                dropdownlist.enable(true);
                var dropdownlist = $("#Relasionship").data("kendoDropDownList");
                dropdownlist.enable(true);
            }
        },
        error: function () {
            alert("Gặp Lỗi trong quá trình lấy dữ liệu 147");
        }
    });
}
function RuleCouple(ID, Type) {
    if (Type == 0) {
        for (var i = 0; i < couple.length; i++) {
            if (couple[i].ID1 == ID) {
                if (couple[i].ID2 != 0) {
                    return "0";
                }
                else {
                    return couple[i].Sex1;
                }
            }
        }
        return "1";
    }
    else if (Type == 1) {
        for (var i = 0; i < couple.length; i++) {
            if (couple[i].ID1 == ID) {
                if (Res[0].Id != couple[i].ID2 && couple[i].ID2 != 0) {
                    return "0";
                }
                else if ($('#Sex').val() == couple[i].Sex1) {
                    return "-1";
                }
            }
        }
        return "1";
    }
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
    LoadDataTree();
}
function tab2() {
    var tabStrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
    tabStrip.select(1);
}
function tab1() {
    var tabStrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
    tabStrip.select(0);
}
function tab3() {
    var tabStrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
    tabStrip.select(2);
}
function LoadDataTree()
{
    var grid = $('#GridTree').data("kendoGrid");
    var options = grid.options;
    options.columns = setColumns('0');
    $.ajax({
        async: false,
        dataType: 'json',
        url: '/CGP/getListMember',
        data: { TreeID: $('#TreeID').val(), Tcuu: Tcuu, Ten: $('#HTSearch').val(), FDate: $('#FromDates').val(), TDate: $('#ToDates').val() },
        success: function (result) {
            //add Stt
            for (var i = 0; i < result.length;i++)
            {
                result[i].STT = i + 1;
            }
            var dataSource = new kendo.data.DataSource({
                data: result
                , schema: {
                    model: {
                        fields: {
                            Birthday: { type: "datetime" },
                        },
                    }
                },
                pageSize: 100,
            });
            options.dataSource = dataSource;
        },
        error: function () {
            alert("Lỗi 243")
        }
    });
    $('#GridTree').empty().kendoGrid(options);

}
function LoadInfomationMember(ID)
{
    var tabStrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
    tabStrip.select(1);
    $.ajax({
        async: false,
        dataType: 'json',
        url: '/CGP/InfomationMember',
        data: {  ID: ID },
        success: function (result) {
            Res = result;
            //console.log(Res);
            if (Res[0].Memberold == "" || Res[0].Memberold == null) {
                var dropdownlist = $("#OldID").data("kendoDropDownList");
                dropdownlist.enable(false);
                var dropdownlist = $("#Relasionship").data("kendoDropDownList");
                dropdownlist.enable(false);
                //$('#trdRelationship').hide();
                //$('#trdOldID').hide();
            }
            else {
                var dropdownlist = $("#OldID").data("kendoDropDownList");
                dropdownlist.enable(true);
                var dropdownlist = $("#Relasionship").data("kendoDropDownList");
                dropdownlist.enable(true);
                //$('#trdRelationship').show();
                //$('#trdOldID').show();
            }
            $('#OldID').data('kendoDropDownList').value(Res[0].Memberold);
            var dropdownlist = $("#OldID").data("kendoDropDownList");
            dropdownlist.enable(false);
            $('#FullName').val(Res[0].FullName);
            $('#Address').val(Res[0].AddressID);
            $('#Sex').data('kendoDropDownList').value(Res[0].Sex);
            $('#Job').data('kendoDropDownList').value(Res[0].Job);
            //
            $('#Relasionship').data('kendoDropDownList').value(Res[0].TypeRelationship);
            $('#BirthDate').data('kendoDateTimePicker').value(Res[0].Birthday);
            $('#BirthPlace').data('kendoDropDownList').value(Res[0].BirthPlaceId);
            //
            //formatdatetime();
            if (Res[0].CauseOfDeath != null || Res[0].DateOfDeath != null || Res[0].BurialPlaceId != null)
            {
                $('#tbCauseOfDeath').show();
                $('#tbDateOfDeath').show();
                $('#tbBurialPlace').show();
                $('#CauseOfDeath').data('kendoDropDownList').value(Res[0].CauseOfDeath);
                $('#DateOfDeath').data('kendoDateTimePicker').value(Res[0].DateOfDeath);
                $('#BurialPlace').data('kendoDropDownList').value(Res[0].BurialPlaceId);
            }
            else {
                $('#tbCauseOfDeath').hide();
                $('#tbDateOfDeath').hide();
                $('#tbBurialPlace').hide();
                $('#CauseOfDeath').data('kendoDropDownList').value(Res[0].CauseOfDeath);
                $('#DateOfDeath').data('kendoDateTimePicker').value(Res[0].DateOfDeath);
                $('#BurialPlace').data('kendoDropDownList').value(Res[0].BurialPlaceId);
            }
            
            $('#UpdateMember').show();
            //$('#ChangeStatus').show();
            $('#AddMember').hide();
        },
        error: function () {
        }
    });
}
function ChangeAddMember()
{
    var dropdownlist = $("#OldID").data("kendoDropDownList");
    dropdownlist.enable(true);
    $('#UpdateMember').hide();
    //$('#ChangeStatus').hide();
    $('#AddMember').show();
    $('#FullName').val("");
    $('#Address').val("");
    $('#OldID').data('kendoDropDownList').value("");
    $('#Job').data('kendoDropDownList').value("");
    $('#Sex').data('kendoDropDownList').value('F');
    $('#Relasionship').data('kendoDropDownList').value('0');
    //
    //$('#Relasionship').data('kendoDropDownList').setDataSource({});
    $('#BirthDate').data('kendoDateTimePicker').value(new Date());
    $('#BirthPlace').data('kendoDropDownList').setDataSource({});
    $('#tbCauseOfDeath').hide();
    $('#tbDateOfDeath').hide();
    $('#tbBurialPlace').hide();
    LoadData($('#TreeID').val());
    //formatdatetime();
}
function BaoCaoNam(TreeID, type) {
    if (type == 1)
        window.location.href = '/CGP/Report?id=' + TreeID;
}
function AddMemberNew()
{
    var FName=$('#FullName').val();
    var DChi = $('#Address').val();
    var GTinh = $('#Sex').val();
    var VLam = $('#Job').val();
    var MBOld = $('#OldID').val();
    var QHe = $('#Relasionship').val();
    if (resultOldID.length > 0 && MBOld == "") {
        alert("Bạn chưa chọn thành viên củ");
        return;
    }
    if (FName == "") {
        alert("Bạn chưa nhập tên");
        return;
    }
    //if (DChi == "") {
    //    alert("Bạn chưa nhập địa chỉ");
    //    return;
    //}



    var NSinh = $('#BirthDate').val();
    var NoiSinh = $('#BirthPlace').val();
    var CDate = $("#CreateDate").val();
    //xu ly biến
    QHe = MBOld == "" ? -1 : QHe;
    if (QHe == 1)
    {
        var checkCouple = RuleCouple(MBOld,0);
        if(checkCouple == "0")
        {
            alert("Thành viên củ đã có (vợ/chồng) không thể thêm !!!");
            return; 
        }
        else if (checkCouple != "1")
        {
            if(GTinh == checkCouple)
            {
                alert("Giới tính bạn chọn không hợp lý với quan hệ vợ chồng hiện tại với thành viên củ");
                return;
            }
        }
    }
    $.ajax({
        async: false,
        type: "post",
        dataType: 'json',     
        url: '/CGP/AddMemberNew',
        data: { TreeID: $('#TreeID').val(), FName: FName, DChi: DChi, GTinh: GTinh, VLam: VLam, MBOld: MBOld, QHe: QHe, NSinh: NSinh, NoiSinh: NoiSinh, CDate: CDate },
        success: function (result) {
            alert(result);
            LoadData($('#TreeID').val());
            LoadDataTree();
            ChangeAddMember($('#TreeID').val());
            createDiagram();
        },
        error: function () {
            alert("Thông tin chưa hợp lệ");
        }
    });
}
function UpdateMemberNew() {
    var FName = $('#FullName').val();
    if (FName == "") {
        alert("Vui lòng nhập họ tên");
        return;
    }
    var DChi = $('#Address').val();
    var GTinh = $('#Sex').val();
    var VLam = $('#Job').val();
    var MBOld = $('#OldID').val();
    var QHe = $('#Relasionship').val();
    if (QHe != "" && MBOld == "") {
        alert("Bạn chưa chọn thành viên củ");
        return;
    }

    var NSinh = $('#BirthDate').val();
    var NoiSinh = $('#BirthPlace').val();
    var CDate = $("#CreateDate").val();
    var NgayMat = $("#DateOfDeath").val();
    var NoiMat = $("#BurialPlace").val();
    var NNMat = $("#CauseOfDeath").val();
    //xu ly biến
    QHe = MBOld == "" ? -1 : QHe;
    if (QHe == 1) {
        var checkCouple = RuleCouple(MBOld, 1);
        if (checkCouple == "0") {
            alert("Thành viên củ đã có (vợ/chồng) không thể thêm !!!");
            return;
        }
        else if (checkCouple == "-1") {
            alert("Giới tính bạn chọn không hợp lý với quan hệ vợ chồng hiện tại với thành viên củ");
            return;
        }
    }
    $.ajax({
        async: false,
        type: "post",
        dataType: 'json',
        url: '/CGP/UpdateMemberNew',
        data: { ID: Res[0].Id, TreeID: $('#TreeID').val(), FName: FName, DChi: DChi, GTinh: GTinh, VLam: VLam, MBOld: MBOld, QHe: QHe, NSinh: NSinh, NoiSinh: NoiSinh, CDate: CDate, NgayMat: NgayMat, NoiMat: NoiMat, NNMat: NNMat },
        success: function (result) {
            alert(result);
            LoadData($('#TreeID').val());
            LoadDataTree();
            createDiagram();
            //ChangeAddMember($('#TreeID').val());
        },
        error: function () {
        }
    });
}
function setColumns(typeID) {
    var columns = null;
    switch (typeID) {
        case '0':
            columns = [
                {
                    field: "STT",
                    title: "STT",
                    width: 50
                },
                {
                    title: "Họ Tên",
                    width: 150,
                    template: "<a style='color:blue' onclick='LoadInfomationMember(#=ID#)' href=\"javascript:;\">#if(data.FullName == ''){#...#}else{##=FullName##}#</a>"
                }, { field: "bd", title: "Ngày sinh", width: 120 }
                , {
                    //field: "Generation",
                    title: "Đời",
                    width: 90,
                    template: "<strong>Đời Thứ #=Generation#</strong>"
                }, {
                    field: "Mo",
                    title: "Cha/Mẹ",
                    width: 220,
                    template: "#if(data.Fa !=''){#<p>Cha: <strong>#=Fa #</strong></p>#}#" +
                              "#if(data.Mo !=''){#<p>Mẹ: <strong>#=Mo #</strong></p>#}#"
                }
            //{
            //    //field: "Mo",
            //    title: "Chi tiết",
            //    width: 250,
            //    //template: "  <a href='@Url.Action('Member', 'CGP', new { ID = #=ID#})'>"
            //    template: "<a href='/CGP/MemberInfo/?id=#=ID#' >Cập nhật</a>"
            //}

            ];
            break;
    }
    return columns;
}

/////////////////////START Tao cay\\\\\\\\\\\\\\\\\\\\\\
function visualTemplate(options) {
    var dataviz = kendo.dataviz;
    var g = new dataviz.diagram.Group();
    var dataItem = options.dataItem;

    g.append(new dataviz.diagram.Rectangle({
        width: 300,
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
        x: 10,
        y: 20,
        fill: "#fff"
    }));

    g.append(new dataviz.diagram.TextBlock({
        text: dataItem.title,
        x: 10,
        y: 40,
        fill: "#fff"
    }));

    //g.append(new dataviz.diagram.Image({
    //    source: "../content/dataviz/diagram/people/" + dataItem.image,
    //    x: 3,
    //    y: 3,
    //    width: 18,
    //    height: 18
    //}));

    return g;
}
function TimVoChong(Mbold)
{
    for (var i = 0; i < Items.length; i++) {
        if (Items[i].Memberold == Mbold  && Items[i].TypeRelationship == 1) {
            //luu
            var ItemsTemp = Items[i];
            //xóa
            Items.splice(i, 1);
            //tra ve tên     
            return ItemsTemp.FullName;
        }
    }
    return "";
}
function Tree(Mbold)
{
    var Itemnew = [];
    for(var i=0;i<Items.length;i++)
    {
        if(Items[i].Memberold == Mbold)
        {
            //luu
            var ItemsTemp = Items[i];
            //xóa
            Items.splice(i, 1);
            //xu ly
            var BanDoi2='';
            var BanDoi1 =''; 
            if (ItemsTemp.Sex == 'M')//chồng
            {
                BanDoi2 = TimVoChong(ItemsTemp.Id);
                if(BanDoi2 != '')
                {
                    BanDoi1 = 'Chồng: ' + ItemsTemp.FullName;
                    BanDoi2 = '   Vợ: ' + BanDoi2;
                }
                else
                    BanDoi1 = ItemsTemp.FullName;
            }
            else if (ItemsTemp.Sex == 'F') //vợ
            {                
                BanDoi1 = TimVoChong(ItemsTemp.Id);
                if (BanDoi1 != '') {
                    BanDoi1 = 'Chồng: ' + BanDoi1;
                    BanDoi2 = '   Vợ: ' + ItemsTemp.FullName;
                }
                else
                    BanDoi2 = ItemsTemp.FullName;
            }
            Itemnew.push({
                ID: ItemsTemp.Id,
                Sex: ItemsTemp.Sex,
                Memberold: ItemsTemp.Memberold,
                Name: BanDoi1,
                //image: "antonio.jpg",
                title: BanDoi2,
                colorScheme: "#1696d3",
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
    //console.log(Itemnew);
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
/////////////////////END Tao cay\\\\\\\\\\\\\\\\\\\\\\

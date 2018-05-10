$(document).ready(function () {
    $("#btnLogin").click(function () {
        //alert("123");
        var jName = $("#LUserName").val();
        var jPass = $("#LPassword").val();

        $.ajax({
            async: false,
            //type: "post",
            dataType: 'json',
            data: { u: jName, p: jPass },
            url: '/Home/Login2',
        success: function (data) {

        },
        error: function (data) {
            if (data.responseText == "success")
                alert("ok vao");
            if (data.responseText == "error")
                alert("loi nha");
        }
    });
});

});
$(document).ready(function () {
    $("#btnLogin").click(function () {
        //alert("123");
        var jName = $("#LUserName").val();
        var jPass = $("#LPassword").val();

        if (jName == "" || jPass == "") {
            $("#LogEr").hide();
            $("#LogSu").hide
            $("#LogEr1").show();

            return;
        }

        $.ajax({
            async: false,
            //type: "post",
            dataType: 'json',
            data: { u: jName, p: jPass },
            url: '/Home/Login2',
            success: function (response) {
                if (response.success) {
                    $("#LogEr1").hide();
                    $("#LogEr").hide();
                    $("#LogSu").show();

                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                } else {
                    $("#LogEr1").hide();
                    $("#LogEr").show();
                }
            },
            error: function (response) {
                alert("error!");  // 
            }
        });
    });

    $("#btnReg").click(function () {
        //alert("123");
        var jName = $("#RUserName").val();
        var jPass = $("#RPassword").val();
        var jPassR = $("#RRPassword").val();
        if (jName == "" || jPass == "" || jPassR == "") {
            $("#RegSuc").hide();
            $("#RegErr").hide();
            $("#RegErr2").hide();
            $("#RegErr1").show();
            return;
        }

        if (jPass != jPassR) {
            $("#RegSuc").hide();
            $("#RegErr").hide();
            $("#RegErr1").hide();
            $("#RegErr2").show();
            return;
        }

        $.ajax({
            async: false,
            //type: "post",
            dataType: 'json',
            data: { un: jName, pw: jPass },
            url: '/Home/Register2',
            success: function (response) {
                if (response.success) {
                    $("#RegErr").hide();
                    $("#RegErr2").hide();
                    $("#RegErr1").hide();
                    $("#RegSuc").show();

                    $("#RUserName").val("");
                    $("#RPassword").val("");
                    $("#RRPassword").val("");
                } else {
                    $("#RegErr2").hide();
                    $("#RegErr1").hide();
                    $("#RegSuc").hide();
                    $("#RegErr").show();
                }
            },
            error: function (response) {
                alert("error!");  // 
            }
        });
    });
});
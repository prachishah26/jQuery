$(document).ready(function () {
    //Adding to the expression
    var status;
    $(".btn").click(function () {
        if (status == true) {
            $("#expression").val(0);
            status = false;
        }
        if (!$(this).hasClass("not")) {
            if ($("#expression").val() == 0)
                $("#expression").val($(this).text());
            else {
                console.log($(this).val());
                $("#expression").val($("#expression").val() + $(this).val());
            }
        }
    });
    //Backspace
    $('.back').click(function () {
        var value = $("#expression").val();
        if (!(parseInt(parseFloat(value)) == 0 && value.length == 1))
            $("#expression").val(value.slice(0, value.length - 1));
        if (value.length == 1)
            $("#expression").val("0");
    });

    // clear button-----------------------------------
    $(".clear").click(function () {
        $("#expression").val("0");
        status = true;
    });

    // equal button ----------------------------------
    $(".equal").click(function () {
        status = true;
        var result;
        //Check for syntax error----------------------
        try {
            var expression = $("#expression").val();
            var expression = expression.replace(/²/g, "**2");
            var expression = expression.replace(/√/g, "**0.5 ");
            result = (eval(expression));
            if (result == Infinity) {
                result = "Malform expression";
            }
            else if (result == undefined) {
                result = "Malform expression";
            }
            $(".history").append(`<div class="d-flex"><p>${$("#expression").val()}</p><p>${'='}</p><p>${result}</p></div>`)
            $(".result").val(result);
            result = 0;

        } catch (e) {
            if (e instanceof SyntaxError) {
                $("#expression").val("Malform expression");
            }
            if (e instanceof TypeError) {
                $("#expression").val("Malform expression");
            }
            console.log(status)
        }
    });

    $(document).keypress(function (e) {
        if (status == true) {
            $("#expression").val("");
            status = false;
        }
        $(".result").val($(".result").val() + (String.fromCharCode(e.which)));
        var key = e.which;
        if (key == 13) { // the enter key code
            $('.equal').click();
        }
    });
    $(document).keyup(function (e) {
        var key = e.which;
        if (key == 8) {
            $('.back').click();
        }
    });
});

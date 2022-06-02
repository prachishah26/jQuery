$(document).ready(function () {
    var isNewValue;

    //Adding to the expression
    $(".btn").click(function () {
        if (isNewValue == true) {
            $("#expression").val(0);
            isNewValue = false;
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
        isNewValue = true;
    });

    // equal button ----------------------------------
    $(".equal").click(function () {
        isNewValue = true;
        var result;
        //Check for syntax error----------------------
        try {
            var expression = $("#expression").val();
            var expression = expression.replace(/²/g, "**2");
            var expression = expression.replace(/√/g, "**0.5 ");
            result = (math.eval(expression));
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
            console.log(isNewValue)
        }
    });

    $(document).keypress(function (e) {
        if (isNewValue == true) {
            $("#expression").val("");
            isNewValue = false;
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

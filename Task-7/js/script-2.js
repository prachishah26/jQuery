$(document).ready(function() {
    //Adding to the expression
    var equation=0,status=false;
    $(".btn").click(function() {
        if(status == true){
            $("#expression").val(0);
            equation = 0;
            status = false;
        }
        if (!$(this).hasClass("not")) {
            if ($("#expression").val() == 0 && equation ==0){
                $("#expression").val($(this).text());
                equation +=  $(this).text();
            }
            else{
                // console.log($(this).text());
                
                if ($(this).html() === '<i class="fa-solid fa-square-root-variable"></i>'){
                    var sqrt = $("#expression").val();
                   
                    // equation += (sqrt + "**(0.5)" );
                    equation =  sqrt + "**(0.5)";
                    $("#expression").val($("#expression").val() + "sqrt");
                    // console.log(equation)
                    
                }
                if ($(this).text() === "x2"){
                    var square = $("#expression").val();
                    // equation += (square + "**2" );
                    equation = sqrt + "**2";
                    $("#expression").val($("#expression").val() + "^2");
                }
                else{
                    equation = $("#expression").val($("#expression").val() + $(this).text());
                    // $("#expression").val($("#expression").val() + $(this).text());
                }
            }
        }
    });
    //Backspace
    $('.back').click(function() {
        var value = $("#expression").val();
        var value2 = equation
        if (!(parseInt(parseFloat(value)) == 0 && value.length == 1))
            $("#expression").val(value.slice(0, value.length - 1));
        if (value.length == 1)
            $("#expression").val("0");

        if (!(parseInt(parseFloat(value2)) == 0 && value2.length == 1))
            $("#expression").val(value2.slice(0, value2.length - 1));
        if (value2.length == 1)
            $("#expression").val("0");
    });

    // clear button-----------------------------------
    $(".clear").click(function() {
        $("#expression").val("0");
        equation = 0
    });

    // equal button ----------------------------------
    $(".equal").click(function() {
        status = true;
        var result;
        //Check for syntax error----------------------
        try {
            result = (eval(equation));
        } catch (e) {
            if (e instanceof SyntaxError) {
                alert("Error! Resetting values.");
                $("#expression").val("0");
                equation = 0
                $(".result").val("0");
            }
            if (e instanceof TypeError) {
                alert("Error! Resetting values.");
                $("#expression").val("0");
                equation = 0
                $(".result").val("0");
            }
        }
        var contain = $("#expression").val()
        if ($("contain:contains('x2')")){
            $(".history").append(`<div class="d-flex"><p>${$("#expression").val().replace("**2", "^2")}</p><p>${'='}</p><p>${result}</p></div>`)
        $(".result").val(result);
        }
        else{
        $(".history").append(`<div class="d-flex"><p>${$("#expression").val()}</p><p>${'='}</p><p>${result}</p></div>`)
        $(".result").val(result);
        }
        result = 0;
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



$(document).ready(function() {
    //Adding to the expression
    var equation;
    var status = 0;
    $(".btn").click(function() {
        if(status == 1){
            $("#expression").val(0);
            status = 0;
        }
        if (!$(this).hasClass("not")) {
            if ($("#expression").val() == 0)
                $("#expression").val($(this).text());
            else{
                
                console.log($(this).text());
                
                if ($(this).html() === '<i class="fa-solid fa-square-root-variable"></i>'){
                    // var sqrt = $("#expression").val();
                    $("#expression").val($("#expression").val() + "**(0.5)");
                    
                }
                if ($(this).text() === "x2"){
                    // var square = $("#expression").val();
                    $("#expression").val($("#expression").val() + "**2");
                }
                else{
                    $("#expression").val($("#expression").val() + $(this).text());
                }
            }
        }
    });
    //Backspace
    $('.back').click(function() {
        var value = $("#expression").val();
        if (!(parseInt(parseFloat(value)) == 0 && value.length == 1))
            $("#expression").val(value.slice(0, value.length - 1));
        if (value.length == 1)
            $("#expression").val("0");
    });

    // clear button-----------------------------------
    $(".clear").click(function() {
        $("#expression").val("0");
    });

    // equal button ----------------------------------
    $(".equal").click(function() {
        status = 1;
        var result;
        //Check for syntax error----------------------
        try {
            result = (eval(($("#expression").val())));
        } catch (e) {
            if (e instanceof SyntaxError) {
                alert("Error! Resetting values.");
                $("#expression").val("0");
                $(".result").val("0");
            }
            if (e instanceof TypeError) {
                alert("Error! Resetting values.");
                $("#expression").val("0");
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

    $("#expression").keypress(function(e) {
        var key = e.which;
        if (key == 13) // the enter key code
        {
          $('.equal').click();
        }
      });
});



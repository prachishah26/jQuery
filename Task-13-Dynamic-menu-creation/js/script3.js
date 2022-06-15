$(document).ready(function () {

    // Global variables
    let inputText,count = 1, value,first = true;
    $(".add").click(function () {
        inputText = $("input").val();
        if (inputText != "") {
            if(first){
                $(".unOrderedList").append(`<li data-count="${count}">${inputText}</li>`);
                $("#select").append(`<option data-number='${count}'>${inputText}</option>`);
                $(".dispayMenu").append(`<ul class='unOrderedList'></ul>`);
                ++count;
                $("input").val("");
                first = false;
            }
            else{
                if ($("select option:selected").val() != "none") {
                    value = $('select option:selected').data('number');
                    console.log("value",value)
                    $(".unOrderedList").find(`li[data-count = '${value}']`).append(`<ul><li data-count="${count}">${inputText}</li></ul>`);
                    $(".inputField").append(`<br><select class="p-2 mt-1"><option value="none">none</option></select>`);
                    ++count;
                    console.log("count",count);
                    $("input").val("");
                }
                else {
                    console.log($(".dispayMenu > ul").length);
                    $(".unOrderedList").last().append(`<li data-count="${count}">${inputText}</li>`);
                    $("#select").append(`<option data-number='${count}'>${inputText}</option>`);
                    $(".dispayMenu").append(`<ul class='unOrderedList'></ul>`)
                    ++count;
                    $("input").val("");
                }

            }
        }
        else {
            alert("Please enter value first !!!");
        }
    })
})
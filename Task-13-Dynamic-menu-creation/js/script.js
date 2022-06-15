$(document).ready(function(){

    // Global variables
    let inputText,matchedValue;
    count=1;
    $(".add").click(function(){
        inputText = $("input").val();
        if (inputText!= ""){
            if($("select").val()=="none"){
                if($(".unOrderedList").length==1){
                    $(".unOrderedList").append(`<li data-count="${count}">${inputText}</li>`);
                    $("#select").append(`<option data-number='${count}'>${inputText}</option>`);
                    $(".displayMenu").append(`<ul class='unOrderedList'></ul>`)
                    ++count;
                }
            }
            else{
                matchedValue = $('#select option:selected').data('number');
                $(".dispayMenu").find(`li[data-count='${matchedValue}']`).append(`<ul><li data-count='${count}'>${inputText}</li></ul>`)
                ++count;
                $(".inputField").append(`<br><select><option value="none">None</option></select>`)
            }
        }
        else{
            alert("Please enter value first !!!");
        }
    })
})
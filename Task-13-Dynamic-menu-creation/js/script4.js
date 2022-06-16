$(document).ready(function () {

    // Global variables
    let inputText, count = 1, selectValueData,lengthOfParentUl,element;

    $(".add").click(function () {
        inputText = $("input").val();
        if (inputText != "") {
            // if text is not empty 

            if ($(".selectOptions select").length == 1) {
                // if only one select element 
                if ($(".selectOptions select").val() == "none") {
                    // if no child element is selected 
                    $(".unOrderedList").append(`<li data-count='${count}'>${inputText}</li>`);
                    $("#select1").append(`<option data-number='${count}'>${inputText}</option>`);
                    ++count;
                    clearInput();
                }
                else {
                    console.log("this else is executed");
                    // child is selected in option 
                    selectValueData = $(".selectOptions option:selected").data("number");
                    $("ul").find(`li[data-count='${selectValueData}']`).append(`<ul><li data-count='${count}'>${inputText}</li></ul>`);
                    $(".selectOptions").append(`<br><select class='p-2'><option value='none'>none</option></select>`);
                    lengthOfParentUl = $("ul").find(`li[data-count='${selectValueData}']`).parents("ul").length
                    $("select").eq(lengthOfParentUl).append(`<option data-number='${count}'>${inputText}</option>`)
                    ++count;
                    clearInput();
                }
            }
            else {
                // more than one select element 
                if ($(".selectOptions select").last().val() == "none") {
                    // last value is none in select 
                    console.log("hii");
                    selectValueData = $(".selectOptions select").eq($("select").length-2).find("option:selected").data("number");
                    console.log(selectValueData);
                    if($("ul").find(`li[data-count='${selectValueData}']`).has("ul")){
                        
                        $("ul").find(`li[data-count='${selectValueData}']`).find("ul").eq(0).append(`<li data-count='${count}'>${inputText}</li>`)
                    }
                    else{
                        
                        $("ul").find(`li[data-count='${selectValueData}']`).append(`<ul><li data-count='${count}'>${inputText}</li></ul>`);
                    }
                    lengthOfParentUl = $("ul").find(`li[data-count='${selectValueData}']`).parents("ul").length
                    $("select").eq(lengthOfParentUl).append(`<option data-number='${count}'>${inputText}</option>`);
                    ++count;
                    clearInput();
                }
                else{
                    // last value is not none in select 
                    console.log("this second else is executed")
                    // child is selected in option 
                    selectValueData = $(".selectOptions option:selected").data("number");
                    if($("ul").find(`li[data-count='${selectValueData}']`).children().length>1){
                        console.log($(`li[data-count='${selectValueData}']`).children().length)
                        console.log("if ul")
                        $(".dispayMenu").find(`li[data-count='${selectValueData}']`).children("ul").append(`<li data-count='${count}'>${inputText}</li>`)
                    }
                    else{
                        console.log("else ul")
                        console.log("count",count)
                        
                        selectValueData = $(".selectOptions select").last().find("option:selected").data("number")
                        console.log("selectValueData",selectValueData)
                        element = $("ul").find(`li[data-count='${selectValueData}']`)
                        element.append(`<ul><li data-count='${count}'>${inputText}</li></ul>`);
                    }
                    // $("ul").find(`li[data-count='${selectValueData}']`).append(`<ul><li data-count='${count}'>${inputText}</li></ul>`);
                    $(".selectOptions").append(`<br><select class='p-2'><option value='none'>none</option></select>`);
                    lengthOfParentUl = $("ul").find(`li[data-count='${selectValueData}']`).parents("ul").length
                    $("select").eq(lengthOfParentUl).append(`<option data-number='${count}'>${inputText}</option>`);
                    ++count;
                    clearInput();
                }
            }
        }
        else {
            // input text is empty 
            alert("Please enter value first !!!");
        }
    })
    function clearInput() {
        $("input").val(""); 
    }
    $(document).on("change","select",function(){
        if($(this).find("option:selected").val()=="none" ){
            $(this).nextAll().remove();
        }
    })
})


// && $("option:selected").parent("select").index() != -1
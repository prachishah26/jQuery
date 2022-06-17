$(document).ready(function () {

    // Global variables
    let inputText, count = 1, selectValueData, lengthOfParentUl, element, childLiData,selectDataNumber;

    //add button click event 
    $(".add").click(function () {
        inputText = $("input").val();
        if (inputText != "") {
            // if input text is not empty 

            if ($(".selectOptions select").length == 1) {
                // if only one select element 
                if ($(".selectOptions select").val() == "none") {
                    // if no child element is selected 
                    $(".unOrderedList").append(`<li data-count='${count}' data-text='${inputText}'>${inputText}</li>`);
                    $("#firstSelect").append(`<option data-number='${count}'>${inputText}</option>`);
                    ++count;
                    clearInput();
                }
                else {
                    // child is selected in option 
                    selectValueData = $(".selectOptions option:selected").data("number");
                    $("ul").find(`li[data-count='${selectValueData}']`).append(`<ul><li data-count='${count}' data-text='${inputText}'>${inputText}</li></ul>`);
                    $(".selectOptions").append(`<br><select class='p-2'><option value='none'>none</option></select>`);
                    lengthOfParentUl = $("ul").find(`li[data-count='${selectValueData}']`).parents("ul").length;
                    $("select").eq(lengthOfParentUl).append(`<option data-number='${count}'>${inputText}</option>`);
                    ++count;
                    clearInput();
                }
            }
            else {
                // more than one select element 
                if ($(".selectOptions select").last().val() == "none") {
                    // last value is none in select 

                    selectValueData = $(".selectOptions select").eq($("select").length - 2).find("option:selected").data("number");

                    if ($("ul").find(`li[data-count='${selectValueData}']`).has("ul")) {
                        // if li has child as ul 
                        $("ul").find(`li[data-count='${selectValueData}']`).find("ul").eq(0).append(`<li data-count='${count}' data-text='${inputText}'>${inputText}</li>`);
                    }
                    else {
                        // li has not child as ul 
                        $("ul").find(`li[data-count='${selectValueData}']`).append(`<ul><li data-count='${count}' data-text='${inputText}'>${inputText}</li></ul>`);
                    }

                    // this will append options in select 
                    lengthOfParentUl = $("ul").find(`li[data-count='${selectValueData}']`).parents("ul").length;
                    $("select").eq(lengthOfParentUl).append(`<option data-number='${count}' data-text='${inputText}'>${inputText}</option>`);
                    ++count;
                    clearInput();
                }
                else {
                    // last value is not none in select 

                    // child is selected in option 
                    selectValueData = $(".selectOptions option:selected").data("number");
                    if ($("ul").find(`li[data-count='${selectValueData}']`).children().length > 1) {
                        // if li has already ul 
                        $(".dispayMenu").find(`li[data-count='${selectValueData}']`).children("ul").append(`<li data-count='${count}' data-text='${inputText}'>${inputText}</li>`);
                    }
                    else {
                        // if li hasn't child as ul                          
                        selectValueData = $(".selectOptions select").last().find("option:selected").data("number");
                        element = $("ul").find(`li[data-count='${selectValueData}']`);
                        element.append(`<ul><li data-count='${count}' data-text='${inputText}'>${inputText}</li></ul>`);
                    }

                    // creates select and inside it adds option
                    $(".selectOptions").append(`<br><select class='p-2'><option value='none'>none</option></select>`);
                    lengthOfParentUl = $("ul").find(`li[data-count='${selectValueData}']`).parents("ul").length;
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
        // it will clear input text 
        $("input").val("");
    }
    $(document).on("change", "select", function () {
        // when changes happen in select element then below code will executes 
        selectedValue = $(this).find("option:selected");
        selectDataNumber = $(this).find("option:selected").data("number");
        
        if (selectedValue.val() == "none") {
            // if selected value is none then it will remove all below select elements 
            $(this).nextAll().remove();
        }
        else {
            if ($(".dispayMenu ul").find(`li[data-count='${selectDataNumber}']`).children('ul').length){
                // here if the menu list is selected and if it has child then it will create select option below and add the data of child.
                
                $(".selectOptions").append(`<br><select class='p-2'><option value='none'>none</option></select>`);
        
                let lengthOfChildUl = $(".dispayMenu ul").find(`li[data-count='${selectDataNumber}']`).children('ul').length;
                
                for (let i = 0; i < lengthOfChildUl; i++) {
                    childLiData = $(".dispayMenu ul").find(`li[data-count='${selectDataNumber}']`).children('ul').eq(i).find('li:first').data("count");
                    childLiText = $(".dispayMenu ul").find(`li[data-count='${selectDataNumber}']`).children('ul').eq(i).find('li:first').data("text");
                    console.log("childLiData",childLiData)
                    $(".selectOptions select").last().append(`<option data-number=${childLiData}> ${childLiText}</option>`);
                }
            }
        }
    })
})
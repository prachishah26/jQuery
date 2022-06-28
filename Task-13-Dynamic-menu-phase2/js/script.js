$(document).ready(function () {

    // Global variables
    let inputText, count = 1, selectValueData, lengthOfParentUl, element, childLiData, selectDataNumber, dataCount, dataText;

    //add button click event 
    $(".add").click(function () {
        inputText = $("input").val();
        if (inputText != "") {
            // if input text is not empty 

            if ($(".selectOptions select").length == 1) {
                // if only one select element 
                if ($(".selectOptions select").val() == "none") {
                    // if no child element is selected 
                    $(".unOrderedList").append(`<li data-count='${count}' data-text='${inputText}'><h6>${inputText}</h6><button class="btn btn-primary edit">Edit</button><button class="btn btn-primary delete">Delete</button></li>`);
                    $("#firstSelect").append(`<option data-number='${count}'>${inputText}</option>`);
                    ++count;
                    clearInput();
                }
                else {
                    // child is selected in option 
                    console.log("hi")
                    selectValueData = $(".selectOptions option:selected").data("number");

                    $("ul").find(`li[data-count='${selectValueData}']`).append(`<ul><li data-count='${count}' data-text='${inputText}'><h6>${inputText}</h6><button class="btn btn-primary edit">Edit</button><button class="btn btn-primary delete">Delete</button></li></ul>`);

                    $(".selectOptions").append(`<select class='p-2 col-12'><option value='none'>none</option></select>`);

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
                        $("ul").find(`li[data-count='${selectValueData}']`).find("ul").eq(0).append(`<li data-count='${count}' data-text='${inputText}'><h6>${inputText}</h6><button class="btn btn-primary edit">Edit</button><button class="btn btn-primary delete">Delete</button></li>`);
                    }
                    else {
                        // li has not child as ul 
                        $("ul").find(`li[data-count='${selectValueData}']`).append(`<ul><li data-count='${count}' data-text='${inputText}'><h6>${inputText}</h6><button class="btn btn-primary edit">Edit</button><button class="btn btn-primary delete">Delete</button></li></ul>`);
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
                    if ($("ul").find(`li[data-count='${selectValueData}']`).children().length > 4) {
                        // if li has already ul 
                        $(".displayMenu").find(`li[data-count='${selectValueData}']`).children("ul").append(`<li data-count='${count}' data-text='${inputText}'><h6>${inputText}</h6><button class="btn btn-primary edit">Edit</button><button class="btn btn-primary delete">Delete</button></li>`);
                    }
                    else {
                        // if li hasn't child as ul                          
                        selectValueData = $(".selectOptions select").last().find("option:selected").data("number");
                        element = $("ul").find(`li[data-count='${selectValueData}']`);
                        element.append(`<ul><li data-count='${count}' data-text='${inputText}'><h6>${inputText}</h6><button class="btn btn-primary edit">Edit</button><button class="btn btn-primary delete">Delete</button></li></ul>`);
                    }

                    // creates select and inside it adds option
                    $(".selectOptions").append(`<select class='p-2 col-12'><option value='none'>none</option></select>`);
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

    $(document).on("change", "select", function () {
        // when changes happen in select element then below code will executes 
        selectedValue = $(this).find("option:selected");
        selectDataNumber = $(this).find("option:selected").data("number");

        if (selectedValue.val() == "none") {
            // if selected value is none then it will remove all below select elements 
            $(this).nextAll().remove();
        }
        else {
            if ($(".displayMenu ul").find(`li[data-count='${selectDataNumber}']`).children('ul').length) {
                // here if the menu list is selected and if it has child then it will create select option below and add the data of child.

                $(".selectOptions").append(`<select class='p-2 col-12'><option value='none'>none</option></select>`);

                let lengthOfChildUl = $(".displayMenu ul").find(`li[data-count='${selectDataNumber}']`).children('ul').children('li').length;
                console.log(lengthOfChildUl)

                for (let i = 0; i < lengthOfChildUl; i++) {
                    childLiData = $(".displayMenu ul").find(`li[data-count='${selectDataNumber}']`).children('ul:first').children('li').eq(i).data("count");
                    childLiText = $(".displayMenu ul").find(`li[data-count='${selectDataNumber}']`).children('ul:first').children('li').eq(i).data("text");

                    $(".selectOptions select").last().append(`<option data-number=${childLiData}> ${childLiText}</option>`);
                }
            }
        }
    })

    // click event when edit button pressed : It will take text from list and copy in input element 
    $(document).on('click', '.edit', function () {
        $('.add').hide();
        $('.update').show();
        dataText = $(this).parent("li").attr('data-text')
        dataCount = $(this).parent("li").attr('data-count')
       
        $("input").val(dataText);
        $('.edit, .delete').prop("disabled", true);
    });

    // click event when update button pressed : It will update the new value of list edited by user
    $(document).on('click', '.update', function () {
        $('.update').hide();
        $('.add').show();
        $('.edit, .delete').prop("disabled", false);
        let inputText = $("input").val();
        $(`option[data-number="${dataCount}"]`).text(inputText);
        $('.displayMenu ul').find(`li[data-count='${dataCount}']`).find(">h6").text(inputText);
        $('.displayMenu ul').find(`li[data-count='${dataCount}']`).attr('data-text', `${inputText}`);

        clearInput();
    });

    // click event when delete button pressed : This will delete the selected list items and its child list items 
    $(document).on('click', '.delete', function () {

        dataCount = $(this).parent("li").attr('data-count');
        $(this).parent().remove();
        $(`select option[data-number="${dataCount}"]`).remove();
        $('select').trigger('change');

        if ($(".selectOptions select").last().find("option").length == 1 && $(".selectOptions select").length != 1) {
            $(".selectOptions select").last().remove()
        }
    });

    // This function will clear input text
    function clearInput() { 
        $("input").val("");
    }

});
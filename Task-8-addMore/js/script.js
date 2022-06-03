$(document).ready(function () {
    var count = 0, number = 0, nameOfbox, num = 1, isDataExists = false;

    // This button will add another box of details -------------- 
    $(".addMore").click(function () {

        $(".allBoxes").append(`<div class="box" name=${num}><input type="text" class="p-2" placeholder="title"><button class="btn btn-secondary p-2 addChild">Add Child</button><button class="btn btn-success fill">Submit</button></div>`)
        ++num;
    })

    // This button will add child -------------------------------- 
    $("body").on("click", ".addChild", function () {

        $(this).parent().append(`<div class="details"><input type="text" placeholder="Subtitle" class="p-2 me-2"><input type="text" placeholder="Value" class="p-2 me-2">
            <button class="btn btn-danger delete">Delete</button></div>`)
    })

    // This button will delete the child --------------------------
    $("body").on("click", ".delete", function () {
        $(this).parent().remove();
    })

    // submit button -----------------------------------------------
    $("body").on("click", ".fill", function () {
        nameOfbox = $(this).parent().attr("name");
        inp = $(this).parent().find("input");

        if ($(".record>div").length > 0) {

            // this will match input's name attribute and specification's div's data attribute. if match then it will replace the content while submit 
            $(".record").find("div").each(function (index, e) {
                if ($(e).data("sort") === parseInt(nameOfbox)) {
                    isDataExists = true;
                    // console.log("if");
                    $(".record div").filter(function () {
                        return $(this).data("sort") == nameOfbox
                    }).empty();

                    inp.each(function (index, element) {
                        if (index == 0) {
                            $(".record").find("div").filter(function () {
                                return $(this).data("sort") == nameOfbox
                            }).append(`<h5>${element.value}</h5>`);
                        }
                        else {
                            $(".record").find("div").filter(function () {
                                return $(this).data("sort") == nameOfbox
                            }).append(`<p>${element.value}</p>`);
                        }
                    });
                };
                  
            });

            // if not match then create new 
            if (isDataExists == false) {
                console.log("false")
                $(".record").append(`<div data-sort=${nameOfbox}></div>`)
                inp.each(function (index, element) {
                    if (index == 0) {
                        $(".record").find("div").filter(function () {
                            return $(this).data("sort") == nameOfbox
                        }).append(`<h5>${element.value}</h5>`);
                    }
                    else {
                        $(".record").find("div").filter(function () {
                            return $(this).data("sort") == nameOfbox
                        }).append(`<p>${element.value}</p>`);
                    }
                })
            }
        }
        else {
            console.log("last else")
            $(".record").append(`<div data-sort=${nameOfbox}></div>`)
            $(this).parent().find("input").each(function (index, element) {
                if (index == 0) {
                    $(".record").find("div").eq(count).append(`<h5>${element.value}</h5>`);
                }
                else {
                    $(".record").find("div").eq(count).append(`<p>${element.value}</p>`);
                }
            })
        }

        // This will sort the div in specification as per index of input 
        if ($(".record div").length !== 0) {
            $(".record div").sort(function (a, b) {
                var contentA = parseInt($(a).data('sort'));
                var contentB = parseInt($(b).data('sort'));
                return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
            }).appendTo(".record");
        }
        isDataExists= false
    })
})





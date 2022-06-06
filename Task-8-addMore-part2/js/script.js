$(document).ready(function () {
    var count = 0, nameOfbox, counter = 1, isDataExists = false,input;
    $(".btn-delete").attr("disabled", true);

    // This button will add another box of details -------------- 
    $(".addMore").click(function () {
        $(".btn-delete").attr("disabled", false);
        $(".allBoxes").append(`<div class="box" name=${counter}><input type="text" class="p-2 text" placeholder="title"><button class="btn btn-secondary p-2 addChild">Add Child</button><button class="btn btn-danger btn-delete">Delete</button></div>`)
        ++counter;
    })

    // This button will add child -------------------------------- 
    $("body").on("click", ".addChild", function () {
        $(this).parent().append(`<div class="details"><input type="text " placeholder="Subtitle" class="p-2 subtitle me-2"><input type="text " placeholder="Value" class="p-2 value me-2">
            <button class="btn btn-danger delete">Delete</button></div>`)
    })

    // This button will delete the child ---------------------
    $("body").on("click", ".delete", function () {
        var parent = $(this).parent()
        var boxIndex = $(this).parents(".box").index()
        var parentIndex = $(this).parent().index();
        bootbox.confirm({
            message: "Do you want to delete this child element?",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Cancel'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Confirm'
                }
            },
            callback: function (result) {
                if (result) {
                    parent.remove();
                    
                    console.log($(".record>div").eq(boxIndex-1).find("p").eq(parentIndex));
                    $(".record>div").eq(boxIndex-1).find("p").eq(parentIndex-2).remove();
                    $(".record>div").eq(boxIndex-1).find("p").eq(parentIndex-3).remove();
                }
            }
        });
    })

    //This will delete the parent element 
    $(document).on("click", ".btn-delete", function () {

        var parent = $(this).parent()
        var parentIndex = $(this).parent().index();

        if ($(".allBoxes > div").length == 1) {
            $(".btn-delete").attr("disabled", true)
        }
        else {
            bootbox.confirm({
                message: "Do you want to delete this ?",
                buttons: {
                    confirm: {
                        label: 'Yes',
                        className: 'btn-success'
                    },
                    cancel: {
                        label: 'No',
                        className: 'btn-danger'
                    }
                },
                callback: function (result) {
                    if (result) {
                        parent.remove();
                        $(".record>div").eq(parentIndex - 1).remove()
                    }
                }
            })
        };
    });
    $(document).on("keyup", ".text,.subtitle, .value", function () {
        nameOfbox = $(this).parents(".box").attr("name");
        input = $(this).parents(".box").find("input");

        if ($(".record>div").length > 0) {
            // this will match input's name attribute and specification's div's data attribute. if match then it will replace the content while submit 
            $(".record").find("div").each(function (index, e) {
                if ($(e).data("sort") === parseInt(nameOfbox)) {
                    isDataExists = true;
                    // console.log("if");
                    $(".record div").filter(function () {
                        return $(this).data("sort") == nameOfbox
                    }).empty();

                    input.each(function (index, element) {
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
                $(".record").append(`<div data-sort=${nameOfbox}></div>`)
                input.each(function (index, element) {
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
        isDataExists = false
    });
});




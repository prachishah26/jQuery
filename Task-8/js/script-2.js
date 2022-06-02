$(document).ready(function () {
    var count = 0, number = 0, nameOfbox, num = 1, inp;

    $(".addMore").click(function () {

        $(".allBoxes").append(`<div class="box" name=${num}><input type="text" class="p-2" placeholder="title"><button class="btn btn-secondary p-2 addChild">Add Child</button><button class="btn btn-success fill">Submit</button></div>`)
        ++num;
    })

    $("body").on("click", ".addChild", function () {
        $(this).parent().append(`<div class="details"><input type="text" placeholder="Subtitle" class="p-2 me-2"><input type="text" placeholder="Value" class="p-2 me-2">
            <button class="btn btn-danger delete">Delete</button></div>`)

    })
    $("body").on("click", ".delete", function () {
        $(this).parent().remove();
    })
    $("body").on("click", ".fill", function () {
        inp = $(this).parent().find("input");
        nameOfbox = $(this).parent().attr("name");

        // console.log("box name", typeof (nameOfbox), nameOfbox);
        // console.log("parseint", typeof (parseInt(nameOfbox)), nameOfbox)
        // console.log("div data", typeof ($(".record").find("div").eq(1).data("sort")), $(".record").find("div").eq(1).data("sort"))

        console.log("A", $(".record").find("div").data("sort"))
        console.log("B", parseInt(nameOfbox))
        
        if ($(".record div").find(`[data-sort=${parseInt(nameOfbox)}]`)){
            console.log("hi")
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
        }
        else {
            console.log("else is executed")
            $(".record").append(`<div data-sort=${nameOfbox}></div>`)

            $(this).parent().find("input").each(function (index, element) {
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






        // for sorting div --------------------------------------------
        if ($(".record div").length !== 0) {
            $(".record div").sort(function (a, b) {
                var contentA = parseInt($(a).data('sort'));
                var contentB = parseInt($(b).data('sort'));
                return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
            }).appendTo(".record");
        }
    })
})







// if ($(".record").find("div").data("sort") == parseInt(nameOfbox))
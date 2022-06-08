$(document).ready(function () {

    // global variables 
    var index,deleteLength,deleteBtn,childLength,childDeleteBtn,titleValue, sectionIndex, subTitle, value ;

    // this button will add section in main box ------------------------
    $(".addMoreBtn").click(function () {

        $(".box").append(` <div class="section"><input type="text" name="title" class="p-2 title" placeholder="Title" autocomplete="off"><button type=" button" class="btn btn-secondary addChildBtn">Add Child</button><button type="button" class="btn btn-danger deleteBtn">Delete</button></div>`);
        $(".data").append(`<table><thead><tr></tr></thead><tbody></tbody></table>`);
    });

    // This button will add child in particular section -------------------------
    $(document).on('click', '.addChildBtn', function () {

        index = $(".addChildBtn").index(this);
        $(".section").eq(index).append(` <div class="details"><input type="text" name="subTitle" class="p-2 subTitle" placeholder="Subtitle" autocomplete="off"><input type="text" name="value" class="p-2 value" placeholder="Value" autocomplete="off"><button type="button" class="btn btn-danger childDeleteBtn">Delete</button></div>`);
        $(".data").append(`<table><thead><tr></tr></thead><tbody></tbody></table>`);
    });

    // this will delete the section and if there is only one section it will give alert 
    $(document).on('click', '.deleteBtn', function () {
        deleteLength = $(".deleteBtn").length;
        deleteBtn = this;
        if (deleteLength > 1) {
            bootbox.confirm({
                message: "Are you Sure Do You Want to Delete ???",
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
                        var delIndex = $(".deleteBtn").index(deleteBtn);
                        $(".section").eq(delIndex).remove();
                        $("table").eq(delIndex).remove();
                    }
                }
            });
        }
        else {
            bootbox.alert({
                message: "Atleast one field is required..!!!",
                buttons: {
                    ok: {
                        className: 'btn-success'
                    }
                }
            });
        }
    });

    // Delete Child Button
    $(document).on('click', '.childDeleteBtn', function () {
        childDeleteBtn = this;
        console.log(childDeleteBtn)
        bootbox.confirm({
            message: "Are you Sure Do You Want to Delete Child ???",
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
                    var deleteIndex = $(".childDeleteBtn").index(childDeleteBtn);
                    $(".details").eq(deleteIndex).remove();
                    $("tbody tr").eq(deleteIndex).remove();
                }
            }
        });
    });

    // when we write title in input this will write parally in data 
    $(document).on('keyup', '.title', function () {
        index = $(this).parent().index();
        titleValue = $(this).val();
        $("table").eq(index).find("th").remove();
        if (titleValue == "") {
            $("table").eq(index).find("th").remove();
        }
        else {
            $(this).parents().find("table thead tr").eq(index).append(`<th colspan="2">${titleValue}</th>`);
        }
    });

    // when we write subtitle and its value in input this will write parally in data 
    $(document).on('keyup', '.details', function () {
        sectionIndex = $(this).parent().index();
        childLength = $(this).parents(".section").find(".details").length;

        // first the data will be clear
        $("table").eq(sectionIndex).find("tbody").empty();

        // then adding the data 
        for (i = 0; i < childLength; i++) {
            subTitle = $(this).parents(".section").find(".subTitle").eq(i).val();
            value = $(this).parents(".section").find(".value").eq(i).val();
            if (subTitle == "" && value == "") {
                $(this).eq(sectionIndex).find("td").empty();
            }
            else {
                $("table").eq(sectionIndex).find("tbody").append(`<tr><td>${subTitle}</td><td>${value}</td></tr>`);
            }
        }
    });
});
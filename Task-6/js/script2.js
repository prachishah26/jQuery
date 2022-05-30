$(document).ready(function () {
    var index, page,gender, sports,checkbox, current_tr;

    $("table").hide();
    $(".step").removeClass("bg").eq(0).addClass("bg");

    $(".step").click(function () {
        index = $(this).index();
        $(".level").hide().eq(index).show();
        $(".step").removeClass("bg").eq($(".level:visible").index()).addClass("bg");
    });

    $(".next").click(function () {
        page = $(".level:visible").index();
        $(".level").hide().eq(page + 1).show();
        $(".step").removeClass("bg").eq($(".level:visible").index()).addClass("bg");
    });

    $(".prev").click(function () {
        page = $(".level:visible").index();
        $(".level").hide().eq(page - 1).show();
        $(".step").removeClass("bg").eq($(".level:visible").index()).addClass("bg");
    });

    //--------------------- validation----------------------

    $("#dob").datepicker();
    
    $.validator.setDefaults({ ignore: [] });

    $("#wizardForm").validate({
        rules:{
            fname : "required", 
            lname : "required",
            gender: "required",
            email : "required",
            contact : "required",
            dob : "required",
            hours : "required",
            zipcode :  "required",
            ip : "required",
            sports: "required",
            about: "required",
            checkbox : "required"

        },
        messages:{
            fname : "Please enter your first Name",
            lname : "Please enter your last Name",
            gender: "Please choose your gender",
            email : "Please enter your email",
            contact : "Please enter your contact",
            dob : "Please enter your birthdate",
            hours : "Please enter hours",
            zipcode :  "Please enter zipcode ",
            ip : "Please enter ip address",
            sports: "Please choose your favourite sports",
            about: "Please write down something about yourself ",
            checkbox : "Accept our terms and conditions"   
        },
        errorPlacement: function (error, element) {
            if (element.is(":radio")) {
                error.appendTo(element.parents('.form-group'));
            }
            
            else { // This is the default behavior 
                error.insertAfter(element);
            }
        },
        // submitHandler: function (form) {
        //     form.submit();
        // }
    })
    // -----------------------------------------------------

    // submit button 
    $(".submit").click(function () {
        // event.preventDefault();
        
        var details = get_details();
        var count = $('#myTable tr').length;

        $(".data-table tbody").append(`<tr data-fname='${details.firstName}' data-lname='${details.lastName}' data-gender='${gender}' data-email= '${details.email}' data-contact='${details.contact}' data-dob= '${details.dob}' data-hours='${details.hours}' data-zipcode='${details.zipcode}' data-ip='${details.ip}' data-sports='${sports}' data-about='${details.about}' data-checkbox='${checkbox}'><td>${count}</td><td>${details.firstName} </td><td>${details.lastName}</td><td>${gender}</td><td>${details.email}</td><td>${details.contact}</td><td>${details.dob}</td><td>${sports}</td><td>${details.hours}</td><td>${details.zipcode}</td><td>${details.ip}</td><td>${details.about}</td><td>${checkbox}</td><td><button class="btn btn-warning btn-edit">EDIT</button></td><td><button class="btn btn-danger btn_delete">DELETE</button></td></tr>`);

        clear_details();
        $("table, .data-title").show();
        $(".step").removeClass("bg").eq(0).addClass("bg");
        $(".submit-status").show().fadeOut(5000);

        $(this).unbind('submit').submit();
    })

    $("body").on("click", ".btn_delete", function () {
        $(this).parents("tr").remove();

        $("tbody tr").each(function (index) {
            $(this).find("td:eq(0)").text(index + 1);
        })
        if ($("tbody tr").length == 0) {
            $("table , .data-title").hide();
        }
    })

    // edit button 
    $("body").on("click", ".btn-edit", function () {
        // taking data from table
        var editData = $(this).parents("tr").data();
        console.log(editData);

        // setting data into form 
        $.each(editData, function (index, value) {
            $(`#${index}`).val(value);
        });

        $("input[type=radio][value=" + gender + "]").prop('checked', true);

        $(".btn-update , .btn-cancel").show();
        $(".btn_delete").attr("disabled", true);
        $(".submit").hide();
        current_tr = $(this).parents("tr").index();
        console.log(current_tr);

    })
    // cancel button 
    $("body").on("click", ".btn-cancel", function () {
        clear_details();
        $(".btn-update, .btn-cancel").hide();
        $(".submit").show();
        $(".btn_delete").attr("disabled", false);
    })

    // update button 
    $("body").on("click", ".btn-update", function () {
        $(".level").hide().first().show();
        var count = current_tr + 1;
        $(this).hide();
        $(".btn-cancel").hide();
        $(".submit").show();
        var details = get_details();
        clear_details();

        $("tbody tr").eq(current_tr).replaceWith(`<tr data-fname='${details.firstName}' data-lname='${details.lastName}' data-gender='${gender}' data-email= '${details.email}' data-contact='${details.contact}' data-dob= '${details.dob}' data-hours='${details.hours}' data-zipcode='${details.zipcode}' data-ip='${details.ip}' data-sports='${sports}' data-about='${details.about}' data-checkbox='${checkbox}'><td>${count}</td><td>${details.firstName} </td><td>${details.lastName}</td><td>${gender}</td><td>${details.email}</td><td>${details.contact}</td><td>${details.dob}</td><td>${details.hours}</td><td>${details.zipcode}</td><td>${details.ip}</td><td>${sports}</td><td>${details.about}</td><td>${checkbox}</td><td><button class="btn btn-warning btn-edit">EDIT</button></td><td><button class="btn btn-danger btn_delete">DELETE</button></td></tr>`);
        $(".btn_delete").attr("disabled", false);
    })
    function clear_details() {
        $("input[type=text],input[type=phone], textarea").val("");
        $('#gridRadios1').prop('checked', true);
        $("#sports").val(0);
        $('input[type="checkbox"]').prop('checked', false);
        $(".level").hide().first().show();
    }
    function get_details() {
        var details = {
            "firstName": $("#fname").val(),
            "lastName": $("#lname").val(),
            "email": $("#email").val(),
            "contact": $("#contact").val(),
            "dob": $("#dob").val(),
            "sports": $("#sports").val(),
            "about": $("#about").val(),
            "hours": $("#hours").val(),
            "zipcode": $("#zipcode").val(),
            "ip": $("#ip").val()
        }
        if ($("input[type=radio][name=gridRadios]").is(':checked')) {
            gender = $("input[type=radio][name=gridRadios]:checked").val()
        }
        else {
            gender = "";
        }
        if ($("#sports").val() == 0) {
            sports = "";
        }else{
            sports = $("#sports").val();

        }
        if ($(':checkbox').is(':checked')) {
            checkbox = "Yes";
        }
        else {
            checkbox = "No";
        }
        return details;
    }
}) 
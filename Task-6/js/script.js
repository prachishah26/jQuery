$(document).ready(function () {
    var index, page, gender, sports, checkbox, current_tr;
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
    $("#dob").datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-100y:c+nn',
        maxDate: '-1d'
    }).on('change', function () {
        $(this).valid();
    });;

    $.validator.setDefaults({ ignore: [] });

    jQuery.validator.addMethod("lettersonly", function (value, element) {
        return this.optional(element) || /^[a-z]+$/i.test(value);
    }, "Letters only !!");

    jQuery.validator.addMethod("numbersonly", function (value, element) {
        return this.optional(element) || /^[1-9]+$/i.test(value);
    }, "Numbers only !!");

    jQuery.validator.addMethod("valid_email", function (value, element) {
        return this.optional(element) || /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
    }, "Letters only !!");

    $("#wizardForm").validate({
        rules: {
            fname: {
                required: true,
                lettersonly: true,
                minlength: 2,
                maxlength:80
            },
            lname: {
                required: true,
                lettersonly: true,
                minlength: 2,
                maxlength:80
            },
            gender: "required",
            email: {
                required: true,
                valid_email : true

            },
            contact: "required",
            dob: "required",
            hours: {
                required : true,
                numbersonly : true,
                min:5,
                max:24
            },
            zipcode: "required",
            ip: {
                required : true,
                minlength : 8,
                maxlength:15
            },
            sports: "required",
            about: "required",
            checkbox: "required"

        },
        messages: {
            fname: {
                required: "Enter your first name",
                lettersonly: "letters only !",
                minlength: "Enter at least (2) characters",
                maxlength: "First name too long more than (80) characters",
            },
            lname: {
                required: "Enter your first name",
                lettersonly: "letters only !",
                minlength: "Enter at least (2) characters",
                maxlength: "First name too long more than (80) characters",
            },
            gender: "Please choose your gender",
            email: {
                required:"Please enter email id",
                valid_email:"PLease enter a valid email"
            },
            contact: "Please enter your contact",
            dob: "Please enter your birthdate",
            hours: {
                required : "Please enter hours",
                numbersonly : "Numbers only !",
                min : "Min 5 hours are required !",
                max : "Max 24 hours, not more !"
            },
            zipcode: "Please enter zipcode ",
            ip: {
                required : "Please enter your IP address",
                minlength : "Minimum length should be 8 ! ",
                maxlength: "Maximum length should be 12 ! "
            },
            sports: "Please choose your favourite sports",
            about: "Please write down something about yourself ",
            checkbox: "Please accept our T&C !"
        },
        errorPlacement: function (error, element) {
            if (element.is(":radio")) {
                error.appendTo(element.parents('.form-group'));
            }
            if (element.is(":checkbox")) {
                error.appendTo( element.parent("div").next("div"));
            }

            else { // This is the default behavior 
                error.insertAfter(element);
            }            
        }
    })

    // masking -----------------------------------

    $('input[name="zipcode"]').inputmask('999999');
    $('input[name="contact"]').inputmask('+99 9999999999');
    $('input[name="ip"]').inputmask({
        alias: "ip",
        jitMasking: true
    });

    $('input[name="dob"]').keydown(function (e) {
        e.preventDefault();
    });

    // submit button ------------------------------------
    $(".submit").click(function (e) {
        // event.preventDefault();
        if ($("#wizardForm").valid()) {
            var details = get_details();
            var count = $('#myTable tr').length;

            $(".data-table tbody").append(`<tr data-fname='${details.firstName}' data-lname='${details.lastName}' data-gender='${gender}' data-email= '${details.email}' data-contact='${details.contact}' data-dob= '${details.dob}' data-hours='${details.hours}' data-zipcode='${details.zipcode}' data-ip='${details.ip}' data-sports='${sports}' data-about='${details.about}' data-checkbox='${checkbox}'><td>${count}</td><td>${details.firstName} </td><td>${details.lastName}</td><td>${gender}</td><td>${details.email}</td><td>${details.contact}</td><td>${details.dob}</td><td>${details.hours}</td><td>${details.zipcode}</td><td>${details.ip}</td><td>${sports}</td><td>${details.about}</td><td>${checkbox}</td><td><button class="btn btn-warning btn-edit">EDIT</button></td><td><button class="btn btn-danger btn_delete">DELETE</button></td></tr>`);

            clear_details();
            $("table, .data-title").show();
            $(".step").removeClass("bg").eq(0).addClass("bg");
            $(".submit-status").show().fadeOut(5000);
        }
        else {
            var error_page = $("input.error").first().parents(".level").index();
            $(".level").hide().eq(error_page).show()
            $(".step").removeClass("bg").eq(error_page).addClass("bg")
        }
        e.preventDefault();

    })

    // delete button ------------------------------
    $("body").on("click", ".btn_delete", function () {
        $(this).parents("tr").remove();
        $("tbody tr").each(function (index) {
            $(this).find("td:eq(0)").text(index + 1);
        })
        
    })

    // edit button --------------------------------
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
    // cancel button --------------------------------
    $("body").on("click", ".btn-cancel", function (e) {
        $(".btn-update, .btn-cancel").hide();
        $(".submit").show();
        $(".btn_delete").attr("disabled", false);
        
        $("#wizardForm").validate().resetForm(); 
        $('#wizardForm')[0].reset();
        $(".level").hide().first().show();
        $(".step").removeClass("bg").first().addClass("bg");
        

    })

    // update button -------------------------------
    $("body").on("click", ".btn-update", function (e) {

        if ($("#wizardForm").valid()) {
            $(".level").hide().first().show();
            var count = current_tr + 1;
            $(this).hide();
            $(".btn-cancel").hide();
            $(".submit").show();
            var details = get_details();
            clear_details();

            $("tbody tr").eq(current_tr).replaceWith(`<tr data-fname='${details.firstName}' data-lname='${details.lastName}' data-gender='${gender}' data-email= '${details.email}' data-contact='${details.contact}' data-dob= '${details.dob}' data-hours='${details.hours}' data-zipcode='${details.zipcode}' data-ip='${details.ip}' data-sports='${sports}' data-about='${details.about}' data-checkbox='${checkbox}'><td>${count}</td><td>${details.firstName} </td><td>${details.lastName}</td><td>${gender}</td><td>${details.email}</td><td>${details.contact}</td><td>${details.dob}</td><td>${details.hours}</td><td>${details.zipcode}</td><td>${details.ip}</td><td>${sports}</td><td>${details.about}</td><td>${checkbox}</td><td><button class="btn btn-warning btn-edit">EDIT</button></td><td><button class="btn btn-danger btn_delete">DELETE</button></td></tr>`);
        }
        else {
            var error_page = $("input.error").first().parents(".level").index();
            $(".level").hide().eq(error_page).show()
            $(".step").removeClass("bg").eq(error_page).addClass("bg")
        }
        e.preventDefault();
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
        if ($("#sports").val() == null) {
            sports = "";
        } else {
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
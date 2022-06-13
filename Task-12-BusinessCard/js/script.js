$(document).ready(function () {
    // global variables 
    var text, value, className, document1, source, data, colorChange, colorvalue, section, page;

    $(".area").hide().first().show();
    $(".standard").hide();

    // wizard area button click event 
    $(".wizard-btn").click(function () {
        index = $(this).index();
        $(".area").hide().eq(index).show();
    })

    $('input[type="radio"]').click(function () {
        if ($(this).attr("value") == "clean") {
            $(".cleanCard").show();
            $(".standardCard").hide();
        }
        if ($(this).attr("value") == "standard") {
            $(".cleanCard").hide();
            $(".standardCard").show();
        }
    });

    $(document).on("keyup", "#logo", function () {
        text = $(this).val()
        $(".company-logo i").removeClass();
        $(".company-logo i").addClass(`fa-solid ${text}`)
    })

    $("input").keyup(function () {
        id = $(this).attr("id")
        text = $(this).val()
        $(`.${id}`).text(text)
    })

    // QR CODE 
    var width = 200
    var height = 180
    data = 123
    var img = '<img style="margin: 0 auto" src="https://chart.googleapis.com/chart?chs=' + width + 'x' + height + '&cht=qr&chl=' + data + '">';
    $(".backCard").html(`${img} </br> <p class="text-center">Scan me</p>`);


    // jQuery validators
    jQuery.validator.addMethod("lettersonly", function (value, element) {
        return this.optional(element) || /^[a-z ]+$/i.test(value);
    }, "Letters only !!");
    jQuery.validator.addMethod("letterswithdot", function (value, element) {
        return this.optional(element) || /^[a-z. ]+$/i.test(value);
    }, "Letters only !!");
    jQuery.validator.addMethod("letterswithhyphen", function (value, element) {
        return this.optional(element) || /^[a-z-]+$/i.test(value);
    }, "Letters only !!");
    jQuery.validator.addMethod("numberlettersonly", function (value, element) {
        return this.optional(element) || /^[1-9a-zA-Z ]+$/i.test(value);
    }, "Numbers only !!");
    jQuery.validator.addMethod("numbersonly", function (value, element) {
        return this.optional(element) || /^[1-9]+$/i.test(value);
    }, "Numbers only !!");
    jQuery.validator.addMethod("validemail", function (value, element) {
        return this.optional(element) || /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
    }, "Letters only !!");

    // form validation
    $(".form").validate({
        rules: {
            companyName: {
                required: true,
                letterswithdot: true,
                minlength: 2,
                maxlength: 20
            },
            logo: {
                required: true,
                letterswithhyphen: true,
                minlength: 2,
                maxlength: 20
            },
            website: {
                required: true,
                url: true,
                minlength: 2,
                maxlength: 29
            },
            fname: {
                required: true,
                lettersonly: true,
                minlength: 2,
                maxlength: 20
            },
            designation: {
                required: true,
                numberlettersonly: true,
                minlength: 2,
                maxlength: 20
            },
            contact: {
                required: true,
                numbersonly: true,
                minlength: 10,
                maxlength: 10
            },
            email: {
                required: true,
                validemail: true,
            }
        },
        messages: {
            companyName: {
                required: "Enter your company name",
                lettersonly: "letters and (.) only !",
                minlength: "Enter at least 2 characters",
                maxlength: "First name too long more than 20 characters",
            },
            logo: {
                required: "Enter your company name",
                letterswithhyphen: "letters and (-)  only !",
                minlength: "Enter at least 2 characters",
                maxlength: "First name too long more than 20 characters",
            },
            website: {
                required: "Enter your company name",
                url: "Enter a valid URL",
                minlength: "Enter at least 2 characters",
                maxlength: "First name too long more than 20 characters",
            },
            fname: {
                required: "Enter your Full name",
                lettersonly: "letters only !",
                minlength: "Enter at least 2 characters",
                maxlength: "First name too long more than 20 characters",
            },
            designation: {
                required: "Enter your Designation",
                numberlettersonly: "letters or numbers only !",
                minlength: "Enter at least 2 characters",
                maxlength: "Enter max length upto 20 characters ",
            },
            contact: {
                required: "Enter your Contact number",
                numbersonly: "Numbers only !",
                minlength: "Contact number should be 10 digits only !!",
                maxlength: "Contact number should be 10 digits only !!",
            },
            email: {
                required: "Enter your Email address",
                validemail: "Enter a valid email !"
            }


        },
        errorPlacement: function (error, element) {
            if (element.is(":radio")) {
                error.appendTo(element.parents('.form-group'));
            }
            if (element.is(":checkbox")) {
                error.appendTo(element.parent("div").next("div"));
            }

            else { // This is the default behavior 
                error.insertAfter(element);
            }
        }
    })

    $("#website").keyup(function () {
        data = $(this).val();
        console.log(data)
        img = '<img style="margin: 0 auto" src="https://chart.googleapis.com/chart?chs=' + width + 'x' + height + '&cht=qr&chl=' + data + '">';
        $(".backCard").html(`${img} </br> <p class="text-center">Scan me</p>`);
    })

    // $("#lightColor").on("change",function () {
       
    //     colorvalue = $(this).val();
    //     console.log(colorvalue)
    //     $(".standardCard .frontCard").css("background-color", colorvalue)
    // })

    $("#lightColor").change(function(){
        colorvalue = $(this).val();
        console.log(colorvalue);
        $(".standardCard .frontCard").css("background-color", colorvalue);
    })

    $("#mainColor").click(function(){        
        colorvalue = $(this).val();
        console.log(colorvalue)
        $(".standardCard .frontCard,.backCard").css("color", colorvalue);
    })
    
    $("#darkColor").click(function () {
        colorvalue = $(this).val();
        // console.log(colorvalue)
        $(".standardCard .backCard").css("background-color", colorvalue);
    })

    $(".reset").click(function () {
        $("#lightColor").val("#87CEEB");
        $(".standardCard .frontCard").css("background-color", "white")
        $("#mainColor").val("#A020F0");
        $(".standardCard .frontCard,.backCard").css("color", "black");
        $("#darkColor").val("#4B0082");
        $(".standardCard .backCard").css("background-color", "white");
    })

    $.validator.setDefaults({ ignore: [] });

    $(".btn-download").click(function (e) {
        if ($(".form").valid()) {
            var pdf = new jsPDF();
            section = $(".business-card")
            page = function () {
                pdf.save("BusinessCard.pdf")
            }
            pdf.addHTML(section, page)
            pdf.addImage("https://chart.googleapis.com/chart?chs=' + width + 'x' + height + '&cht=qr&chl=' + data", 'JPEG', 15, 40, 180, 160)
        }

        else {
            console.log("download is pressed");
            $(".area").hide().eq(2).show();
        }
        e.preventDefault();
    })
})










// function demoFromHTML() {
//     var pdf = new jsPDF('p', 'pt', 'letter');
//     // source can be HTML-formatted string, or a reference
//     // to an actual DOM element from which the text will be scraped.
//     var source = $('#business-card').html();

//     // we support special element handlers. Register them with jQuery-style 
//     // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
//     // There is no support for any other type of selectors 
//     // (class, of compound) at this time.
//     specialElementHandlers = {
//         // element with id of "bypass" - jQuery style selector
//         '#bypassme': function (element, renderer) {
//             // true = "handled elsewhere, bypass text extraction"
//             return true
//         }
//     };
//     margins = {
//         top: 80,
//         bottom: 60,
//         left: 40,
//         width: 522
//     };
//     // all coords and widths are in jsPDF instance's declared units
//     // 'inches' in this case
//     pdf.fromHTML(
//         source, // HTML string or DOM elem ref.
//         margins.left, // x coord
//         margins.top, { // y coord
//         'width': margins.width, // max width of content on PDF
//         'elementHandlers': specialElementHandlers
//     },

//         function (dispose) {
//             // dispose: object with X, Y of the last line add to the PDF 
//             //          this allow the insertion of new lines after html
//             pdf.save('Test.pdf');
//         }, margins
//     );
// }
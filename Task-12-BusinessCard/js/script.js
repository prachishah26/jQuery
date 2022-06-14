$(document).ready(function () {
    // global variables 
    var text, data, colorvalue;

    // wizard area show at start 
    $(".area").hide().first().show();
    $(".standard").hide();

    // wizard area button click event 
    $(".wizard-btn").click(function () {
        index = $(this).index();
        $(".area").hide().eq(index).show();
    })

    // business card as per selection of radio button 
    $('input[type="radio"]').click(function () {
        if ($(this).attr("value") == "clean") {
            $(".cleanCard").show();
            $(".standardCard").hide();
            colorParameters()

        }
        if ($(this).attr("value") == "standard") {
            $(".cleanCard").hide();
            $(".standardCard").show();
        }
    });

    // on write logo in Input, logo will change 
    $(document).on("keyup", "#logo", function () {
        text = $(this).val()
        $(".company-logo i").removeClass();
        $(".company-logo i").addClass(`fa-solid ${text}`)
    })

    // input keyup event => it will parallely show on card 
    $("input").keyup(function () {
        id = $(this).attr("id")
        text = $(this).val()
        $(`.${id}`).text(text)
    })

    // QR CODE 
    var width = 200
    var height = 180
    data = "Please enter URL"
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
        ignore: [],
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

    // website keyup function 
    $("#website").keyup(function () {
        data = $(this).val();
        console.log(data)
        img = '<img style="margin: 0 auto" src="https://chart.googleapis.com/chart?chs=' + width + 'x' + height + '&cht=qr&chl=' + data + '">';
        $(".backCard").html(`${img} </br> <p class="text-center">Scan me</p>`);
    })

    // frontcard background color
    $("#lightColor").click(function () {
        let colorValue = setInterval(() => {
            let color = $("#lightColor").val();
            $(".standardCard .frontCard").css("background-color", color);
            $(".cleanCard .frontCard").css("background-color", color);
        }, 200);
    })

    // font color 
    $("#mainColor").click(function () {
        colorValue = setInterval(() => {
            let color = $("#mainColor").val();
            $(".standardCard .frontCard,.backCard").css("color", color);
            $(".cleanCard .frontCard,.backCard").css("color", color);
        }, 200);
    })

    // back card background color 
    $("#darkColor").click(function () {
        colorValue = setInterval(() => {
            let color = $("#darkColor").val();
            $(".standardCard .backCard").css("background-color", color);
            $(".cleanCard .backCard").css("background-color", color);
        }, 200);
    })

    // on reset button click even => colors will set by default 
    $(".reset").click(function () {
        colorParameters();

    })

    $.validator.setDefaults({ ignore: [] });

    // on click download button click event 
    $(".btn-download").click(function (e) {
        if ($(".form").valid()) {
            Convert_HTML_To_PDF()
            $('.form').trigger("reset");
            colorParameters();
            defaultName();
        }
        else {
            $(".area").hide();
            $(".personalization").show();
        }
        e.preventDefault();

    })

    // by default color parameters 
    function colorParameters() {
        $("#lightColor").val("#FFFFFF");
        $("#mainColor").val("000000");
        $("#darkColor").val("#FFFFFF");
    }

    // on submit the data will be remove 
    function defaultName() {
        $(".email").text("abc@gmail.com")
        $(".fname").text("Person Name")
        $(".designation").text("Designation")
        $(".contact").text("1111111111")
        $(".website").text("https://www.google.com/")
        $(".companyName").text("Company Name")
        $(".company-logo i").removeClass()
        $(".company-logo i").addClass("fa-solid fa-bolt")
        data = "Please enter URL"
    }

    function Convert_HTML_To_PDF() {
        // pdf download function 
        var elementHTML = document.getElementById('business-card');
        html2canvas(elementHTML, {
            useCORS: true,
            onrendered: function (canvas) {
                var pdf = new jsPDF('p', 'pt', 'letter');

                var pageHeight = 980;
                var pageWidth = 900;
                for (var i = 0; i <= elementHTML.clientHeight / pageHeight; i++) {
                    var srcImg = canvas;
                    var sX = 0;
                    var sY = pageHeight * i; // start 1 pageHeight down for every new page
                    var sWidth = pageWidth;
                    var sHeight = pageHeight;
                    var dX = 0;
                    var dY = 0;
                    var dWidth = pageWidth;
                    var dHeight = pageHeight;

                    window.onePageCanvas = document.createElement("canvas");
                    onePageCanvas.setAttribute('width', pageWidth);
                    onePageCanvas.setAttribute('height', pageHeight);
                    var ctx = onePageCanvas.getContext('2d');
                    ctx.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);

                    var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);
                    var width = onePageCanvas.width;
                    var height = onePageCanvas.clientHeight;

                    if (i > 0) // if we're on anything other than the first page, add another page
                        pdf.addPage(612, 864); // 8.5" x 12" in pts (inches*72)

                    pdf.setPage(i + 1); // now we declare that we're working on that page
                    pdf.addImage(canvasDataURL, 'PNG', 20, 40, (width * .62), (height * .62)); // add content to the page
                }

                // Save the PDF
                pdf.save('Business-card.pdf');
            }
        });
    }
})
$(document).ready(function () {
    console.log("hii")
    var timer;
    var i = 0;
    j=0;
    function animation(text) {
        timer = setInterval(function () {
            if (i < text.length) {
                $(".box h3").append(text.charAt(i));
                i++;
            }
            else {
                clearInterval(start);
            }
        }, 120)
    }

    function animation_number(number) {
        timer = setInterval(function () {
            if (j <= number) {
                $(".box h5").text("Total Projects : "+j);
                j++;
            }
            else {
                clearInterval(start);
            }
        }, 50)
    }
    animation_number(100);

})
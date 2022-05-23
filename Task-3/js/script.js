function icon_color() {
    var i = $("img:visible").index();
    $(".slide-icon").css("color", "white").eq(i).css("color", "red");
    $(".heading h4").hide().eq(i).show()
}

$(document).ready(function () {
    var index = 0;
    var isStart = false;
    var start
    startSlider()

    function startSlider() {
        if(isStart == false){
            start = setInterval(function () {
                $("img").hide().eq(index).show().fadeOut(6500);
                icon_color();
                index += 1;
                if (index > $("img").last().index()) {
                    index = 0;
                }
            }, 4000)
            isStart = true
        }else{
            console.log("Already started");
        }
    }

    function stopSlider() {
        clearInterval(start);
        isStart = false
    }

    $(".on-auto").click(function () {
        startSlider()
    })

    $(".pause").click(function () {
        $("img").hide().eq(index).show();
        icon_color()
        stopSlider();
    })

    $("img").hide().eq(0).show();
    $(".left-arrow").click(function () {
        stopSlider();
        $("img").hide().eq(index - 1).show();
        index -= 1;
        if (index <= $("img").first().index()) {
            index = $("img").last().index() + 1;
        }
        icon_color();
    })

    $(".right-arrow").click(function () {
        stopSlider();
        $("img").hide().eq(index + 1).show();
        index += 1;
        if (index >= $("img").last().index()) {
            index = -1;
        }
        icon_color();
    })

    $(".slide-icon").click(function () {
        stopSlider();
        $(this).css("color", "red")
        $(this).siblings().css("color", "white");
        var icon = $(this).index()
        $("img").hide().eq(icon).show()
        $(".heading h4").hide().eq(icon).show()
    })
})


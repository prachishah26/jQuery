function icon_color(){
    var i = $("img:visible").index();
        $(".slide-icon").css("color", "white").eq(i).css("color", "red");
        $(".heading h4").hide().eq(i).show()
}

$(document).ready(function () {
    var index = 0;
    var start = setInterval(function(){
        $("img").hide().eq(index).show().fadeOut(6500);
        icon_color();
        index += 1;
        if(index > $("img").last().index()){
            index = 0;
        }
    },4000)

    $(".on-auto").click(function(){
        start = setInterval(function(){
            $("img").hide().eq(index).show().fadeOut(6500);
            icon_color();
            index += 1;
            if(index > $("img").last().index()){
                index = 0;
            }
        },4000)
        // start();
    })
    
    $(".pause").click(function(){
        $("img").hide().eq(index).show();
        icon_color()
        clearInterval(start);
    })

    $("img").hide().eq(0).show();
    $(".left-arrow").click(function () {
        clearInterval(start);
        $("img").hide().eq(index - 1).show();
        index -= 1;
        if (index <= $("img").first().index()) {
            index = $("img").last().index() + 1;
        }
        icon_color();
    })

    $(".right-arrow").click(function () {
        clearInterval(start);
        $("img").hide().eq(index + 1).show();
        index += 1;
        if (index >= $("img").last().index()) {
            index = -1;
        }
        icon_color();
    })

    $(".slide-icon").click(function () {
        clearInterval(start);
        $(this).css("color", "red")
        $(this).siblings().css("color", "white");
        var icon = $(this).index()
        $("img").hide().eq(icon).show()
        $(".heading h4").hide().eq(icon).show()
    })
})


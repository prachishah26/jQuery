$(document).ready(function(){
    $(".content").hide().first().show();

    $(".li-review").click(function(){
        $(".content").hide();
        $(".reviews").show();
        $(".suggestions").show()
    })
    $(".li-abstract").click(function(){
        $(".content").hide();
        $(".abstract").show();
        $(".suggestions").show()
    })
    $(".li-essay").click(function(){
        $(".content").hide();
        $(".essay").show();
    })
    $(".li-ted").click(function(){
        $(".content").hide();
        $(".ted").show();
    })
    $(".li-culture").click(function(){
        $(".content").hide();
        $(".culture").show();
    })
    $(".li-essay, .li-ted, .li-culture").click(function(){
        $(".suggestions").hide()
    })

    $(".page-options li").click(function(){
        $(".page-options li").removeClass("underline");
        $(this).addClass("underline");
    })
})
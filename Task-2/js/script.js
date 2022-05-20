$(document).ready(function(){
    $("p").hide().first().show()
    $(".up").hide().first().show()
    $(".down").first().hide()

    $(".btn").click(function(){
        $(this).parent().siblings().find("p").slideUp()

        $(this).next().toggle()
        $(this).find("i").toggle()
    })
})
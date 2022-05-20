$(document).ready(function(){
    $("p").hide().first().show()
    $(".up").hide().first().show()
    $(".down").first().hide()

    $(".btn").click(function(){
        $(this).next().toggle()
        $(this).find("i").toggle()
    })
})
$(document).ready(function(){
    $("p").hide().first().show()
    $(".up").hide().first().show()
    $(".down").first().hide()

    $(".btn").click(function(){
        $("p").hide()
        $(this).next().toggle()
        $(this).find("i").toggle()
    })
})
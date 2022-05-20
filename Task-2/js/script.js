$(document).ready(function(){
    $("p").hide().first().show(); //this will keep first paragraph open at startng
    $(".up").hide().first().show(); //arrow signs at start
    $(".down").first().hide();

    $(".btn").click(function(){                   //on button click...
        $(this).parent().siblings().find("p").slideUp();  
        $(this).parent().siblings().find(".down").show(); 
        $(this).parent().siblings().find(".up").hide();

        $(this).next().toggle();  
        $(this).find("i").toggle(); 
    });
});
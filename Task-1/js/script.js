$(document).ready(function(){
    $(".details").hide().eq(0).show()
    $("button").click(function(){
        var index = $(this).index()
        $(".details").hide().eq(index).show();
    })
})
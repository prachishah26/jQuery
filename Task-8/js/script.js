$(document).ready(function () {
    var count = 0,number = 0,nameOfbox,num=1;

    $(".addMore").click(function () {
        
        $(".allBoxes").append(`<div class="box" name=${num}><input type="text" class="p-2" placeholder="title"><button class="btn btn-secondary p-2 addChild">Add Child</button><button class="btn btn-success fill">Submit</button></div>`)
        ++num;
    })

    $("body").on("click", ".addChild", function (){
        $(this).parent().append(`<div class="details"><input type="text" placeholder="Subtitle" class="p-2 me-2"><input type="text" placeholder="Value" class="p-2 me-2">
            <button class="btn btn-danger delete">Delete</button></div>`)

    })
    $("body").on("click", ".delete", function (){
        $(this).parent().remove();
    })
    $("body").on("click", ".fill", function(){
        nameOfbox = $(this).parent().attr("name");
        console.log(nameOfbox)

        if ($(".record div").data('sort')==nameOfbox){
            $(".record div").empty();

            $(this).parent().find("input").each(function(index,element){
                if (index == 0){
                    $(".record").find("div").eq(count).append(`<h5>${element.value}</h5>`);
                }
                else{
                    $(".record").find("div").eq(count).append(`<p>${element.value}</p>`);
                }
            })
        }
        
        $(".record").append(`<div data-sort=${nameOfbox}></div>`)
        $(this).parent().find("input").each(function(index,element){
            if (index == 0){
                $(".record").find("div").eq(count).append(`<h5>${element.value}</h5>`);
            }
            else{
                $(".record").find("div").eq(count).append(`<p>${element.value}</p>`);
            }
        })
        ++count;
        
        if ($(".record div").length !==0){
            $(".record div").sort(function (a, b) {
                var contentA =parseInt( $(a).data('sort'));
                var contentB =parseInt( $(b).data('sort'));
                return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
             }).appendTo(".record");
        }
    })
})





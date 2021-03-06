$(document).ready(function () {

    var combinationResult = [], combination,count;

    $(".combination-btn").click(function(){
        $(".result").empty();
        count = 1;
        var startsFrom = 1;
        var highestNumber = $(".first-num").val();
        var length = $(".second-num").val();
        if (length <= 0 || length >highestNumber){
            $(".result").text("Length Should be between 1 to Highest number!!!");
        }
        else{
            combination = combinations(startsFrom,highestNumber,length);
        }
    })

    // function for combination 
    function combinations(startsFrom,highestNumber, length) {
        // console.log("inside combination");
        for (let i = startsFrom; i <= highestNumber; i++) {
            combinationResult.push(i);
            // console.log(combinationResult);
            // console.log("i",i)
            // console.log("")
            combinations(i + 1,highestNumber, length - 1);

            // console.log("after executed");
            combinationResult.splice(-1,1);
        }

        if (length == 0) {
            $(".result").append(`${count}) &nbsp;`);
            ++count;
            // console.log("if");
            for (let i = 0; i < combinationResult.length; i++) {
                $(".result").append(combinationResult[i]);
                // console.log("combinationalResult",combinationResult)
            }
            $(".result").append(`<br>`);
            // console.log("new line");
        }
    }
})

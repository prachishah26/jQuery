$(document).ready(function () {
    var HighestNumber, totalDigits ,digit;

    $(".combination-btn").click(function () {
        HighestNumber = $(".first-num").val();
        totalDigits = $(".second-num").val();
        let start = 1;
        digit = "";
        start = 1;
        var count;

        for (let i = 1 ; i<= HighestNumber ; i++ ){
            digit = ""+i
            for (let j=1; j<= totalDigits; j++){
                if(j>parseInt(digit)){
                    digit += j
                }
                console.log(digit)
            }
        }
    })
})


// for (let i = start; i<=HighestNumber; i++){
//     digit += i
//     console.log(digit)
//     if(digit.length == totalDigits){
//         start += 1;
//         digit = ""
        
//     }
// }


// for (let i =1; i<=HighestNumber; i++){
//     for (let j = 1; j <=totalDigits;j++){
//         if (j<i){
//             digit += j
//             console.log(digit)
           
//         }
//     }
//     digit = ""
// }       